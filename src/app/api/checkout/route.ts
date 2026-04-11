import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/shared/payments/stripe/server';

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
  isCustomization?: boolean;
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

function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LS-${date}-${random}`;
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
    const orderNumber = generateOrderNumber();

    // Expand only jersey items (not customizations) for 3x2 calculation
    const jerseyUnits: number[] = [];
    for (const item of items) {
      if (item.isCustomization) continue;
      for (let i = 0; i < item.quantity; i++) {
        jerseyUnits.push(item.price);
      }
    }

    const totalCount = jerseyUnits.length;

    // 3x2: for every 3 jerseys, the cheapest is free (customizations excluded)
    let discount = 0;
    if (totalCount >= 3) {
      const sorted = [...jerseyUnits].sort((a, b) => a - b);
      const freeCount = Math.floor(totalCount / 3);
      discount = sorted.slice(0, freeCount).reduce((sum, p) => sum + p, 0);
    }

    // Shipping: free if 3+ jerseys, otherwise €7
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

    const metadata: Record<string, string> = {
      '01_order_number': orderNumber,
    };

    if (shipping) {
      metadata['02_shipping_name'] = `${shipping.firstName} ${shipping.lastName}`;
      metadata['03_shipping_phone'] = shipping.phone;
      metadata['04_shipping_address'] = shipping.address;
      metadata['05_shipping_address2'] = shipping.address2 || '';
      metadata['06_shipping_city'] = shipping.city;
      metadata['07_shipping_postal_code'] = shipping.postalCode;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email || undefined,
      metadata,
      payment_intent_data: { metadata },
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
