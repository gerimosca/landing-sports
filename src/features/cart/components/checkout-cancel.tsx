'use client';

import { useTranslations, useLocale } from 'next-intl';
import { XCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CheckoutCancel() {
  const t = useTranslations('cart');
  const locale = useLocale();

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-black">
      <div className="text-center px-4 max-w-md">
        <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-10 w-10 text-zinc-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {t('cancelTitle')}
        </h1>
        <p className="text-zinc-400 mb-8">{t('cancelDescription')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}/cart`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-full hover:brightness-110 transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            {t('backToCart')}
          </Link>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-700 text-white font-bold rounded-full hover:border-primary hover:text-primary transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    </section>
  );
}
