import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/shared/payments';
import {
  upsertCustomer,
  upsertSubscription,
  updateSubscriptionStatus,
  getCustomerByStripeId,
} from '@/features/billing';
import type { CancellationDetails } from '@/features/billing';
import { trackServerPurchase } from '@/features/attribution';
import type { AttributionData } from '@/features/attribution';
import { createOrder, createOrderItems } from '@/features/orders';
import { sendEmail, OrderConfirmationEmail } from '@/shared/email';
import { createElement } from 'react';
import type Stripe from 'stripe';

// Helper to safely convert Stripe timestamp to Date
function stripeTimestampToDate(timestamp: number | null | undefined): Date | null {
  if (!timestamp) return null;
  return new Date(timestamp * 1000);
}

// Helper to extract cancellation details from Stripe subscription
function extractCancellationDetails(
  subscription: Stripe.Subscription
): CancellationDetails | null {
  const details = subscription.cancellation_details;
  if (!details) return null;

  return {
    reason: details.reason || null,
    comment: details.comment || null,
    feedback: details.feedback || null,
  };
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.client_reference_id;

        // Handle subscription checkout (SaaS billing)
        if (userId) {
          // Parse attribution data from metadata
          let attributionData: AttributionData = {};
          if (session.metadata?.attribution_data) {
            try {
              attributionData = JSON.parse(session.metadata.attribution_data);
            } catch {
              console.warn('Failed to parse attribution data from metadata');
            }
          }

          // Create/update customer mapping
          await upsertCustomer({
            user_id: userId,
            stripe_customer_id: session.customer as string,
          });

          // If this is a subscription checkout, sync the subscription
          if (session.subscription) {
            const stripeSubscription = await stripe.subscriptions.retrieve(
              session.subscription as string
            );

            const subscriptionItem = stripeSubscription.items.data[0];
            const priceAmount = subscriptionItem.price.unit_amount || session.amount_total || null;
            const priceCurrency = subscriptionItem.price.currency || session.currency || 'usd';

            await upsertSubscription({
              id: stripeSubscription.id,
              user_id: userId,
              stripe_customer_id: stripeSubscription.customer as string,
              stripe_price_id: subscriptionItem.price.id,
              status: stripeSubscription.status,
              current_period_start: stripeTimestampToDate(subscriptionItem.current_period_start),
              current_period_end: stripeTimestampToDate(subscriptionItem.current_period_end),
              cancel_at_period_end: stripeSubscription.cancel_at_period_end,
              trial_start_at: stripeTimestampToDate(stripeSubscription.trial_start),
              trial_end_at: stripeTimestampToDate(stripeSubscription.trial_end),
              canceled_at: stripeTimestampToDate(stripeSubscription.canceled_at),
              ended_at: stripeTimestampToDate(stripeSubscription.ended_at),
              cancel_at: stripeTimestampToDate(stripeSubscription.cancel_at),
              cancellation_details: extractCancellationDetails(stripeSubscription),
              metadata: stripeSubscription.metadata || {},
              attribution_data: attributionData,
              price_amount: priceAmount,
              price_currency: priceCurrency,
            });

            // Send server-side conversion tracking
            const eventId = session.metadata?.event_id || crypto.randomUUID();
            const value = session.amount_total ? session.amount_total / 100 : 0;
            const currency = session.currency?.toUpperCase() || 'USD';
            const hasMarketingConsent = session.metadata?.marketing_consent === 'true';

            await trackServerPurchase(
              eventId,
              attributionData,
              value,
              currency,
              session.customer_email || undefined,
              userId,
              hasMarketingConsent
            ).catch((err) => {
              console.error('Failed to track server purchase:', err);
            });
          }
        }

        // Send order confirmation email for one-time payments (store orders)
        const orderNumber = session.metadata?.['01_order_number'];
        const customerEmail =
          session.customer_details?.email || session.customer_email;

        if (orderNumber && customerEmail && session.mode === 'payment') {
          // Server-side Purchase event for Meta CAPI (store orders).
          // Uses eventId from client metadata for browser/server deduplication.
          const eventId = session.metadata?.event_id || crypto.randomUUID();
          const value = session.amount_total ? session.amount_total / 100 : 0;
          const currency = session.currency?.toUpperCase() || 'EUR';
          const hasMarketingConsent = session.metadata?.marketing_consent === 'true';

          let storeAttribution: AttributionData = {};
          if (session.metadata?.attribution_data) {
            try {
              storeAttribution = JSON.parse(session.metadata.attribution_data);
            } catch {
              console.warn('Failed to parse attribution data from store order metadata');
            }
          }

          await trackServerPurchase(
            eventId,
            storeAttribution,
            value,
            currency,
            customerEmail,
            undefined,
            hasMarketingConsent
          ).catch((err) => {
            console.error('Failed to track store purchase:', err);
          });

          try {
            // Retrieve line items from Stripe (expand price.product to read images
            // we sent in product_data.images during checkout creation)
            const fullSession = await stripe.checkout.sessions.retrieve(
              session.id,
              { expand: ['line_items.data.price.product'] }
            );

            const lineItems = fullSession.line_items?.data || [];
            const productItems = lineItems
              .filter((item) => item.description !== 'Shipping / Envío')
              .map((item) => {
                const product = item.price?.product;
                const image =
                  product && typeof product !== 'string' && !product.deleted
                    ? product.images?.[0]
                    : undefined;
                return {
                  name: item.description || '',
                  quantity: item.quantity || 1,
                  amount: (item.amount_subtotal || 0) / 100,
                  image,
                };
              });

            const shippingLineItem = lineItems.find(
              (item) => item.description === 'Shipping / Envío'
            );

            const subtotal = (fullSession.amount_subtotal || 0) / 100;
            const discount =
              (fullSession.total_details?.amount_discount || 0) / 100;
            const shippingCost = shippingLineItem
              ? (shippingLineItem.amount_total || 0) / 100
              : 0;
            const total = (fullSession.amount_total || 0) / 100;

            const shippingName = session.metadata?.['02_shipping_name'];
            const shipping = shippingName
              ? {
                  name: shippingName,
                  phone: session.metadata?.['03_shipping_phone'] || '',
                  address: session.metadata?.['04_shipping_address'] || '',
                  address2: session.metadata?.['05_shipping_address2'] || '',
                  city: session.metadata?.['06_shipping_city'] || '',
                  postalCode:
                    session.metadata?.['07_shipping_postal_code'] || '',
                }
              : null;

            // Save order to Supabase
            try {
              const orderResult = await createOrder({
                order_number: orderNumber,
                stripe_session_id: session.id,
                customer_email: customerEmail,
                shipping_name: shipping?.name || null,
                shipping_phone: shipping?.phone || null,
                shipping_address: shipping?.address || null,
                shipping_address2: shipping?.address2 || null,
                shipping_city: shipping?.city || null,
                shipping_postal_code: shipping?.postalCode || null,
                subtotal: Math.round(subtotal * 100),
                discount: Math.round(discount * 100),
                shipping_cost: Math.round(shippingCost * 100),
                total: Math.round(total * 100),
              });

              if (orderResult.orderId) {
                await createOrderItems(
                  productItems.map((item) => ({
                    order_id: orderResult.orderId!,
                    name: item.name,
                    quantity: item.quantity,
                    unit_price: Math.round((item.amount / item.quantity) * 100),
                    total_price: Math.round(item.amount * 100),
                    is_customization: item.name.toLowerCase().includes('dorsal') ||
                      item.name.toLowerCase().includes('custom'),
                  }))
                );
                console.log(`Order ${orderNumber} saved to Supabase`);
              }
            } catch (orderError) {
              console.error('Failed to save order to Supabase:', orderError);
            }

            // Detect locale from success_url
            const locale =
              fullSession.success_url?.match(/\/(\w{2})\/order/)?.[1] || 'es';

            await sendEmail({
              to: customerEmail,
              subject:
                locale === 'es'
                  ? `Pedido #${orderNumber} confirmado`
                  : `Order #${orderNumber} confirmed`,
              react: createElement(OrderConfirmationEmail, {
                orderNumber,
                items: productItems,
                subtotal,
                discount,
                shippingCost,
                total,
                shipping,
                locale,
              }),
            });

            console.log(
              `Order confirmation email sent to ${customerEmail} for order ${orderNumber}`
            );
          } catch (emailError) {
            console.error('Failed to send order confirmation email:', emailError);
          }
        }

        console.log('Checkout session completed:', session.id);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const stripeSubscription = event.data.object as Stripe.Subscription;

        // Find user by stripe customer id
        const customer = await getCustomerByStripeId(
          stripeSubscription.customer as string
        );

        if (!customer) {
          console.error(
            'Customer not found for stripe_customer_id:',
            stripeSubscription.customer
          );
          break;
        }

        const subscriptionItem = stripeSubscription.items.data[0];
        const priceAmount = subscriptionItem.price.unit_amount || null;
        const priceCurrency = subscriptionItem.price.currency || 'usd';

        await upsertSubscription({
          id: stripeSubscription.id,
          user_id: customer.user_id,
          stripe_customer_id: stripeSubscription.customer as string,
          stripe_price_id: subscriptionItem.price.id,
          status: stripeSubscription.status,
          current_period_start: stripeTimestampToDate(subscriptionItem.current_period_start),
          current_period_end: stripeTimestampToDate(subscriptionItem.current_period_end),
          cancel_at_period_end: stripeSubscription.cancel_at_period_end,
          trial_start_at: stripeTimestampToDate(stripeSubscription.trial_start),
          trial_end_at: stripeTimestampToDate(stripeSubscription.trial_end),
          canceled_at: stripeTimestampToDate(stripeSubscription.canceled_at),
          ended_at: stripeTimestampToDate(stripeSubscription.ended_at),
          cancel_at: stripeTimestampToDate(stripeSubscription.cancel_at),
          cancellation_details: extractCancellationDetails(stripeSubscription),
          metadata: stripeSubscription.metadata || {},
          price_amount: priceAmount,
          price_currency: priceCurrency,
        });

        console.log('Subscription updated:', stripeSubscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const stripeSubscription = event.data.object as Stripe.Subscription;

        // Find user by stripe customer id
        const customer = await getCustomerByStripeId(
          stripeSubscription.customer as string
        );

        if (!customer) {
          console.error(
            'Customer not found for stripe_customer_id:',
            stripeSubscription.customer
          );
          // Still update status even if customer not found
          await updateSubscriptionStatus(stripeSubscription.id, 'canceled');
          break;
        }

        // Get cancellation details from Stripe
        const cancellationDetails = extractCancellationDetails(stripeSubscription);

        const subscriptionItem = stripeSubscription.items.data[0];
        const priceAmount = subscriptionItem.price.unit_amount || null;
        const priceCurrency = subscriptionItem.price.currency || 'usd';

        await upsertSubscription({
          id: stripeSubscription.id,
          user_id: customer.user_id,
          stripe_customer_id: stripeSubscription.customer as string,
          stripe_price_id: subscriptionItem.price.id,
          status: 'canceled',
          current_period_start: stripeTimestampToDate(subscriptionItem.current_period_start),
          current_period_end: stripeTimestampToDate(subscriptionItem.current_period_end),
          cancel_at_period_end: stripeSubscription.cancel_at_period_end,
          trial_start_at: stripeTimestampToDate(stripeSubscription.trial_start),
          trial_end_at: stripeTimestampToDate(stripeSubscription.trial_end),
          canceled_at: stripeTimestampToDate(stripeSubscription.canceled_at) || new Date(),
          ended_at: stripeTimestampToDate(stripeSubscription.ended_at) || new Date(),
          cancel_at: stripeTimestampToDate(stripeSubscription.cancel_at),
          cancellation_reason: cancellationDetails?.reason || cancellationDetails?.comment || null,
          cancellation_details: cancellationDetails,
          metadata: stripeSubscription.metadata || {},
          price_amount: priceAmount,
          price_currency: priceCurrency,
        });

        console.log('Subscription deleted:', stripeSubscription.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;

        // Mark subscription as past_due
        // In Stripe v20, subscription can be string | Subscription | null
        const invoiceSubscription = (invoice as { subscription?: string | Stripe.Subscription | null }).subscription;
        if (invoiceSubscription) {
          const subscriptionId = typeof invoiceSubscription === 'string'
            ? invoiceSubscription
            : invoiceSubscription.id;
          await updateSubscriptionStatus(subscriptionId, 'past_due');
        }

        console.log('Invoice payment failed:', invoice.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
