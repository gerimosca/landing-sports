'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle2, Package, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../cart-context';
import { trackPurchase } from '@/features/attribution';

interface OrderItem {
  name: string;
  quantity: number;
  amount: number;
}

interface OrderData {
  status: string;
  order_number: string | null;
  customer_email: string;
  line_items: OrderItem[];
  amount_total: number;
  amount_subtotal: number;
  currency?: string;
  event_id?: string | null;
  discount: number;
  shipping_cost: number;
  shipping: {
    name: string;
    address: string;
    address2: string;
    city: string;
    postalCode: string;
    phone: string;
  } | null;
}

export function CheckoutSuccess() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setError(true);
      setLoading(false);
      return;
    }

    let cleared = false;

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then((data: OrderData) => {
        setOrder(data);
        if (data.status === 'paid' && !cleared) {
          cleared = true;
          clearCart();
          // Fire client-side Purchase Pixel event with the same eventId stored
          // in Stripe metadata so it dedupes with the server-side CAPI event.
          void trackPurchase(
            data.amount_total,
            data.currency || 'EUR',
            data.customer_email,
            undefined,
            data.event_id || undefined
          );
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </section>
    );
  }

  if (error || !order || order.status !== 'paid') {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-black">
        <div className="text-center px-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <Package className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('errorTitle')}</h1>
          <p className="text-zinc-400 mb-8">{t('errorDescription')}</p>
          <Link
            href={`/${locale}/cart`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-full hover:brightness-110 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToCart')}
          </Link>
        </div>
      </section>
    );
  }

  // Filter out shipping line item for display
  const productItems = order.line_items.filter(
    (item) => item.name !== 'Shipping / Envío'
  );

  return (
    <section className="py-12 md:py-20 bg-black min-h-[70vh]">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            {t('successTitle')}
          </h1>
          {order.order_number && (
            <p className="text-primary font-mono font-bold text-lg mb-1">
              {t('orderNumber', { number: order.order_number })}
            </p>
          )}
          <p className="text-zinc-400 text-lg">{t('successDescription')}</p>
        </div>

        {/* Order details card */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/50 overflow-hidden mb-8">
          {/* Items */}
          <div className="p-6">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
              {t('orderSummary')}
            </h2>
            <div className="space-y-3">
              {productItems.map((item, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-zinc-500 text-xs">
                      {t('qty')} {item.quantity}
                    </p>
                  </div>
                  <span className="text-white font-bold text-sm ml-4">
                    {'\u20AC'}{item.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-zinc-800 p-6 space-y-2">
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-emerald-400">{t('discount')}</span>
                <span className="text-emerald-400 font-medium">
                  -{'\u20AC'}{order.discount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">{t('shipping')}</span>
              <span className={order.shipping_cost === 0 ? 'text-emerald-400 font-medium' : 'text-white font-medium'}>
                {order.shipping_cost === 0 ? t('shippingFree') : `\u20AC${order.shipping_cost.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t border-zinc-800 pt-2 flex justify-between">
              <span className="text-white font-bold">{t('total')}</span>
              <span className="text-white font-black text-xl">
                {'\u20AC'}{order.amount_total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Shipping info */}
          {order.shipping && (
            <div className="border-t border-zinc-800 p-6">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
                {t('shippingTo')}
              </h3>
              <p className="text-white text-sm">{order.shipping.name}</p>
              <p className="text-zinc-400 text-sm">{order.shipping.address}</p>
              {order.shipping.address2 && (
                <p className="text-zinc-400 text-sm">{order.shipping.address2}</p>
              )}
              <p className="text-zinc-400 text-sm">
                {order.shipping.postalCode} {order.shipping.city}
              </p>
              {order.shipping.phone && (
                <p className="text-zinc-400 text-sm">{order.shipping.phone}</p>
              )}
            </div>
          )}
        </div>

        {/* Email notice */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20 mb-8">
          <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-medium">{t('emailNotice')}</p>
            <p className="text-zinc-400 text-xs mt-1">
              {t('emailNoticeDetail', { email: order.customer_email })}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-full hover:brightness-110 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    </section>
  );
}
