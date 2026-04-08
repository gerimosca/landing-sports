'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Placeholder slides: front, back, detail views
  const slideCount = jersey.images?.length || 3;

  const scrollToSlide = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const slideWidth = container.offsetWidth;
    container.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const slideWidth = container.offsetWidth;
    const newIndex = Math.round(container.scrollLeft / slideWidth);
    setActiveSlide(newIndex);
  }, []);

  const discount = jersey.originalPrice
    ? Math.round(((jersey.originalPrice - jersey.price) / jersey.originalPrice) * 100)
    : null;

  const placeholderLabels = ['FRONT', 'BACK', 'DETAIL'];
  const placeholderGradients = [
    'from-zinc-800 to-zinc-900',
    'from-zinc-850 to-zinc-800',
    'from-zinc-900 to-zinc-800',
  ];

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

      {/* Image carousel */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {jersey.images ? (
            jersey.images.map((src, i) => (
              <div
                key={i}
                className="w-full h-full flex-shrink-0 snap-center bg-gradient-to-b from-zinc-800 to-zinc-900"
              >
                <img
                  src={src}
                  alt={`${jersey.team} - ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            placeholderLabels.map((label, i) => (
              <div
                key={i}
                className={cn(
                  'w-full h-full flex-shrink-0 snap-center flex items-center justify-center bg-gradient-to-b',
                  placeholderGradients[i]
                )}
              >
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
                  <div className="absolute flex flex-col items-center gap-1">
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      {jersey.team}
                    </span>
                    <span className="text-zinc-600 text-[9px] uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Navigation arrows - visible on hover */}
        {slideCount > 1 && (
          <>
            <button
              onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
              className={cn(
                'absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity',
                activeSlide === 0 && 'hidden'
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSlide(Math.min(slideCount - 1, activeSlide + 1))}
              className={cn(
                'absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity',
                activeSlide === slideCount - 1 && 'hidden'
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {slideCount > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all',
                  activeSlide === i
                    ? 'bg-primary w-3'
                    : 'bg-white/40 hover:bg-white/60'
                )}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 text-center">
        <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-primary transition-colors truncate">
          {jersey.team}
        </h3>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <span className="text-xs sm:text-sm font-black text-white">
            €{jersey.price.toFixed(2)}
          </span>
          {jersey.originalPrice && (
            <span className="text-[10px] sm:text-sm text-zinc-500 line-through">
              €{jersey.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {!showOptions && (
          <button
            onClick={handleOpenOptions}
            className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 bg-primary text-black font-bold rounded-full text-[11px] sm:text-xs hover:brightness-110 transition-all"
          >
            <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {t('card.addToCart')}
          </button>
        )}
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
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={cn(
                'w-full py-2.5 text-xs font-bold rounded-full transition-all text-center',
                selectedSize
                  ? 'bg-primary text-black hover:brightness-110'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              )}
            >
              <ShoppingCart className="h-3.5 w-3.5 inline mr-1.5" />
              {selectedSize ? t('card.addToCart') : tc('selectSize')}
            </button>
            <button
              onClick={handleClose}
              className="w-full py-2 text-xs font-bold rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-center"
            >
              {tc('continueShopping')}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
