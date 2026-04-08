'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/features/cart';
import { SIZES, type Size } from '@/features/cart/types';
import type { Jersey } from '../types';

interface JerseyCardProps {
  jersey: Jersey;
}

export function JerseyCard({ jersey }: JerseyCardProps) {
  const t = useTranslations('jerseys');
  const tc = useTranslations('cart');
  const { addItem } = useCart();

  const [showOptions, setShowOptions] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [dorsalName, setDorsalName] = useState('');
  const [dorsalNumber, setDorsalNumber] = useState('');

  const handleOpenOptions = () => {
    setShowOptions(true);
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(jersey, {
      size: selectedSize,
      dorsalName: dorsalName.trim() || undefined,
      dorsalNumber: dorsalNumber.trim() || undefined,
    });
    toast.success(tc('added'), { description: `${jersey.team} - ${selectedSize}` });
    setShowOptions(false);
    setSelectedSize(null);
    setDorsalName('');
    setDorsalNumber('');
  };

  const handleClose = () => {
    setShowOptions(false);
    setSelectedSize(null);
    setDorsalName('');
    setDorsalNumber('');
  };

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
        <div className="relative w-3/5 h-3/5 flex items-center justify-center">
          <svg
            viewBox="0 0 100 120"
            fill="none"
            className="w-full h-full text-zinc-700 group-hover:text-zinc-600 transition-colors"
          >
            <path
              d="M30 10 L20 20 L5 15 L10 40 L20 35 L20 110 L80 110 L80 35 L90 40 L95 15 L80 20 L70 10 Z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
          <span className="absolute text-zinc-500 text-xs font-bold uppercase tracking-widest">
            {jersey.team}
          </span>
        </div>

      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors">
          {jersey.team}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">
              €{jersey.price.toFixed(2)}
            </span>
            {jersey.originalPrice && (
              <span className="text-sm text-zinc-500 line-through">
                €{jersey.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {!showOptions && (
            <button
              onClick={handleOpenOptions}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black font-bold rounded-full text-xs hover:brightness-110 transition-all"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {t('card.addToCart')}
            </button>
          )}
        </div>
      </div>

      {/* Options panel - expands below info */}
      {showOptions && (
        <div className="border-t border-zinc-800 bg-zinc-950 p-4 space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
          {/* Size selector - full width grid */}
          <div>
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              {tc('size')}
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'py-2 text-xs font-bold rounded border transition-colors text-center',
                    selectedSize === size
                      ? 'border-primary bg-primary text-black'
                      : 'border-zinc-700 text-zinc-300 hover:border-primary'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dorsal fields */}
          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                {tc('dorsalName')}
              </label>
              <input
                type="text"
                value={dorsalName}
                onChange={(e) => setDorsalName(e.target.value.toUpperCase())}
                placeholder={tc('dorsalNamePlaceholder')}
                maxLength={20}
                className="w-full mt-0.5 px-3 py-2 text-xs bg-zinc-800 border border-zinc-700 rounded text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                {tc('dorsalNumber')}
              </label>
              <input
                type="text"
                value={dorsalNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 2) setDorsalNumber(val);
                }}
                placeholder={tc('dorsalNumberPlaceholder')}
                maxLength={2}
                className="w-full mt-0.5 px-3 py-2 text-xs bg-zinc-800 border border-zinc-700 rounded text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 text-xs font-bold rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
            >
              {tc('continueShopping')}
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={cn(
                'flex-1 py-2.5 text-xs font-bold rounded-full transition-all',
                selectedSize
                  ? 'bg-primary text-black hover:brightness-110'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              )}
            >
              <ShoppingCart className="h-3.5 w-3.5 inline mr-1.5" />
              {selectedSize ? t('card.addToCart') : tc('selectSize')}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
