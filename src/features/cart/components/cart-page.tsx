'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../cart-context';
import { cartItemKey } from '../types';
import { cn } from '@/shared/lib/utils';

export function CartPage() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const getKey = (item: (typeof items)[0]) =>
    cartItemKey(item.jersey.id, {
      size: item.size,
      dorsalName: item.dorsalName,
      dorsalNumber: item.dorsalNumber,
    });

  const handleCheckout = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ jersey, quantity, size, dorsalName, dorsalNumber }) => {
            const parts = [`${jersey.team} - ${jersey.variant}`, `(${size})`];
            if (dorsalName || dorsalNumber) {
              parts.push(`#${dorsalNumber || ''} ${dorsalName || ''}`.trim());
            }
            return { name: parts.join(' '), price: jersey.price, quantity };
          }),
          locale,
          email: trimmedEmail,
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      // Stripe redirect handles errors
    }
  };

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-black">
        <div className="text-center px-4">
          <ShoppingBag className="h-16 w-16 text-zinc-700 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">{t('empty')}</h1>
          <p className="text-zinc-500 mb-8">{t('emptyDescription')}</p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-full hover:brightness-110 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('browseCatalog')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-zinc-500 mb-10">
          {t('itemCount', { count: totalItems })}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const { jersey, quantity, size, dorsalName, dorsalNumber } = item;
              const key = getKey(item);

              return (
                <div
                  key={key}
                  className="flex gap-4 p-4 rounded-lg bg-zinc-900/80 border border-zinc-800/50"
                >
                  {/* Jersey thumbnail */}
                  <div className="w-20 h-24 md:w-24 md:h-28 flex-shrink-0 bg-zinc-800 rounded-md flex items-center justify-center relative">
                    <svg
                      viewBox="0 0 100 120"
                      fill="none"
                      className="w-12 h-12 text-zinc-600"
                    >
                      <path
                        d="M30 10 L20 20 L5 15 L10 40 L20 35 L20 110 L80 110 L80 35 L90 40 L95 15 L80 20 L70 10 Z"
                        fill="currentColor"
                      />
                    </svg>
                    {/* Size badge on thumbnail */}
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[9px] font-bold bg-primary text-black rounded">
                      {size}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-sm md:text-base truncate">
                      {jersey.team}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5 capitalize">
                      {jersey.variant}
                    </p>

                    {/* Size & dorsal details */}
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-zinc-800 text-zinc-300 rounded">
                        {t('size')}: {size}
                      </span>
                      {(dorsalName || dorsalNumber) && (
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-zinc-800 text-zinc-300 rounded">
                          {t('dorsal')}: {dorsalNumber && `#${dorsalNumber}`}{' '}
                          {dorsalName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(key, quantity - 1)}
                          className={cn(
                            'p-1.5 rounded-md border transition-colors',
                            quantity <= 1
                              ? 'border-zinc-800 text-zinc-600'
                              : 'border-zinc-700 text-zinc-300 hover:border-primary hover:text-primary'
                          )}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(key, quantity + 1)}
                          className="p-1.5 rounded-md border border-zinc-700 text-zinc-300 hover:border-primary hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-white font-bold text-sm md:text-base">
                        ${(jersey.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(key)}
                    className="self-start p-2 text-zinc-600 hover:text-red-500 transition-colors"
                    aria-label={t('remove')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-lg bg-zinc-900/80 border border-zinc-800/50">
              <h2 className="text-lg font-bold text-white mb-6">{t('subtotal')}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">{t('subtotal')}</span>
                  <span className="text-white font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">{t('shipping')}</span>
                  <span className="text-emerald-400 font-medium">
                    {totalPrice >= 100 ? t('shippingFree') : t('shippingCost')}
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between">
                  <span className="text-white font-bold">{t('total')}</span>
                  <span className="text-white font-black text-xl">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Email field */}
              <div className="mb-6">
                <label htmlFor="checkout-email" className="block text-sm font-semibold text-white mb-1.5">
                  <Mail className="inline h-4 w-4 mr-1.5 text-primary" />
                  {t('emailLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(false);
                  }}
                  placeholder={t('emailPlaceholder')}
                  aria-required="true"
                  aria-invalid={emailError}
                  aria-describedby="email-help email-error"
                  className={cn(
                    'w-full px-4 py-2.5 text-sm bg-zinc-800 border rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary transition-colors',
                    emailError ? 'border-red-500' : 'border-zinc-700'
                  )}
                />
                {emailError && (
                  <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">
                    {t('emailRequired')}
                  </p>
                )}
                <p id="email-help" className="text-xs text-primary/80 mt-1.5 font-medium">
                  {t('emailHelp')}
                </p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-primary text-black font-bold rounded-full hover:brightness-110 transition-all text-sm"
              >
                {t('checkout')}
              </button>

              <Link
                href={`/${locale}`}
                className="block text-center mt-4 text-sm text-zinc-500 hover:text-primary transition-colors"
              >
                {t('continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
