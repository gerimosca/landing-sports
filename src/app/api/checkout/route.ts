import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/shared/payments/stripe/server';

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const { items, locale, email } = (await request.json()) as {
      items: CheckoutItem[];
      locale: string;
      email?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || '';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email || undefined,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/${locale}/cart?success=true`,
      cancel_url: `${origin}/${locale}/cart`,
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
