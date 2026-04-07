'use client';

import { useTranslations } from 'next-intl';
import { ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { Jersey } from '../types';

interface JerseyCardProps {
  jersey: Jersey;
}

export function JerseyCard({ jersey }: JerseyCardProps) {
  const t = useTranslations('jerseys');

  const discount = jersey.originalPrice
    ? Math.round(((jersey.originalPrice - jersey.price) / jersey.originalPrice) * 100)
    : null;

  return (
    <article className="group relative rounded-lg overflow-hidden bg-zinc-900/80 border border-zinc-800/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {jersey.isNew && (
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white rounded">
            {t('card.new')}
          </span>
        )}
        {jersey.isBestseller && (
          <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-black rounded">
            <Star className="h-3 w-3" />
            {t('card.bestseller')}
          </span>
        )}
        {discount && (
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Image placeholder */}
      <div className="relative aspect-[3/4] bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
        {/* Jersey silhouette placeholder */}
        <div className="relative w-3/5 h-3/5 flex items-center justify-center">
          <svg
            viewBox="0 0 100 120"
            fill="none"
            className="w-full h-full text-zinc-700 group-hover:text-zinc-600 transition-colors"
          >
            {/* T-shirt silhouette */}
            <path
              d="M30 10 L20 20 L5 15 L10 40 L20 35 L20 110 L80 110 L80 35 L90 40 L95 15 L80 20 L70 10 Z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
          {/* Team name overlay */}
          <span className="absolute text-zinc-500 text-xs font-bold uppercase tracking-widest">
            {jersey.team}
          </span>
        </div>

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-full text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ShoppingCart className="h-4 w-4" />
            {t('card.addToCart')}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
          {jersey.season} &middot; {t(`variant.${jersey.variant}`)}
        </p>
        <h3 className="mt-1 font-bold text-white text-sm group-hover:text-primary transition-colors">
          {jersey.team}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-black text-white">
            ${jersey.price.toFixed(2)}
          </span>
          {jersey.originalPrice && (
            <span className="text-sm text-zinc-500 line-through">
              ${jersey.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
