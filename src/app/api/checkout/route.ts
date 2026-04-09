import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/shared/payments/stripe/server';

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  postalCode: string;
  phone: string;
}

export async function POST(request: NextRequest) {
  try {
    const { items, locale, email, shipping } = (await request.json()) as {
      items: CheckoutItem[];
      locale: string;
      email?: string;
      shipping?: ShippingInfo;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || '';

    // Expand items into individual units for 3x2 calculation
    const units: { name: string; price: number }[] = [];
    for (const item of items) {
      for (let i = 0; i < item.quantity; i++) {
        units.push({ name: item.name, price: item.price });
      }
    }

    const totalCount = units.length;

    // 3x2: for every 3 jerseys, the cheapest is free
    let discount = 0;
    if (totalCount >= 3) {
      const sorted = [...units].sort((a, b) => a.price - b.price);
      const freeCount = Math.floor(totalCount / 3);
      discount = sorted.slice(0, freeCount).reduce((sum, u) => sum + u.price, 0);
    }

    // Shipping: free if 3+, otherwise €7
    const shippingCost = totalCount >= 3 ? 0 : 7;

    // Build line items: each unit as a separate line (so Stripe shows correct breakdown)
    const lineItems: Array<{
      price_data: { currency: string; product_data: { name: string }; unit_amount: number };
      quantity: number;
    }> = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping cost if applicable
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: 'Shipping / Envío' },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Create coupon for 3x2 discount if applicable
    let discounts: Array<{ coupon: string }> | undefined;
    if (discount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(discount * 100),
        currency: 'eur',
        name: '3x2 Promo',
        duration: 'once',
      });
      discounts = [{ coupon: coupon.id }];
    }

    const shippingMetadata = shipping
      ? {
          shipping_name: `${shipping.firstName} ${shipping.lastName}`,
          shipping_address: shipping.address,
          shipping_address2: shipping.address2 || '',
          shipping_city: shipping.city,
          shipping_postal_code: shipping.postalCode,
          shipping_phone: shipping.phone,
        }
      : undefined;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email || undefined,
      metadata: shippingMetadata,
      payment_intent_data: shippingMetadata
        ? { metadata: shippingMetadata }
        : undefined,
      line_items: lineItems,
      discounts,
      success_url: `${origin}/${locale}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/order/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
