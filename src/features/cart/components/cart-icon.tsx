'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useCart } from '../cart-context';

export function CartIcon() {
  const { totalItems } = useCart();
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/cart`}
      className="relative p-2 text-zinc-400 hover:text-white transition-colors"
      aria-label={`Cart (${totalItems} items)`}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 w-5 text-[10px] font-bold bg-primary text-black rounded-full">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
}
