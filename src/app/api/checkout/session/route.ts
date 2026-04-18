import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/shared/payments/stripe/server';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({
      status: session.payment_status,
      order_number: session.metadata?.['01_order_number'] || null,
      customer_email: session.customer_details?.email || session.customer_email,
      line_items: session.line_items?.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        amount: item.amount_subtotal / 100,
      })) || [],
      amount_total: (session.amount_total || 0) / 100,
      amount_subtotal: (session.amount_subtotal || 0) / 100,
      currency: session.currency?.toUpperCase() || 'EUR',
      event_id: session.metadata?.event_id || null,
      discount: (session.total_details?.amount_discount || 0) / 100,
      shipping_cost: (session.line_items?.data.find(
        (item) => item.description === 'Shipping / Envío'
      )?.amount_total || 0) / 100,
      shipping: session.metadata?.['02_shipping_name']
        ? {
            name: session.metadata['02_shipping_name'],
            address: session.metadata['04_shipping_address'],
            address2: session.metadata['05_shipping_address2'] || '',
            city: session.metadata['06_shipping_city'],
            postalCode: session.metadata['07_shipping_postal_code'],
            phone: session.metadata['03_shipping_phone'] || '',
          }
        : null,
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
