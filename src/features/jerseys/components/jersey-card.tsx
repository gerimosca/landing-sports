'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getTeamDisplayName } from '../config/data';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, Pencil, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/features/cart';
import { SIZES, type Size } from '@/features/cart/types';
import { SizeGuide } from './size-guide';
import type { Jersey } from '../types';

interface JerseyCardProps {
  jersey: Jersey;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function JerseyCard({ jersey, isOpen, onOpen, onClose }: JerseyCardProps) {
  const t = useTranslations('jerseys');
  const tc = useTranslations('cart');
  const locale = useLocale();
  const teamName = getTeamDisplayName(jersey.team, locale);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [dorsalName, setDorsalName] = useState('');
  const [dorsalNumber, setDorsalNumber] = useState('');

  const resetForm = () => {
    setSelectedSize(null);
    setDorsalName('');
    setDorsalNumber('');
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  const handleOpenOptions = () => {
    onOpen();
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(jersey, {
      size: selectedSize,
      dorsalName: dorsalName.trim() || undefined,
      dorsalNumber: dorsalNumber.trim() || undefined,
    });
    toast.success(tc('added'), { description: `${teamName} - ${selectedSize}`, duration: 3000 });
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlide, setLightboxSlide] = useState(0);
  const lightboxScrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Placeholder slides: front, back, detail views
  const slideCount = jersey.images?.length || 3;

  const openLightbox = () => {
    if (!jersey.images) return;
    setLightboxSlide(activeSlide);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const scrollLightboxTo = useCallback((index: number) => {
    const container = lightboxScrollRef.current;
    if (!container) return;
    container.scrollTo({ left: container.offsetWidth * index, behavior: 'smooth' });
  }, []);

  const lightboxNext = useCallback(() => {
    scrollLightboxTo((lightboxSlide + 1) % slideCount);
  }, [lightboxSlide, slideCount, scrollLightboxTo]);

  const lightboxPrev = useCallback(() => {
    scrollLightboxTo((lightboxSlide - 1 + slideCount) % slideCount);
  }, [lightboxSlide, slideCount, scrollLightboxTo]);

  const handleLightboxScroll = useCallback(() => {
    const container = lightboxScrollRef.current;
    if (!container) return;
    const slideWidth = container.offsetWidth;
    const newIndex = Math.round(container.scrollLeft / slideWidth);
    setLightboxSlide(newIndex);
  }, []);

  // Initialize scroll position and lock body scroll only when opening
  useEffect(() => {
    if (!lightboxOpen) return;
    const container = lightboxScrollRef.current;
    if (container) {
      container.scrollLeft = container.offsetWidth * activeSlide;
      setLightboxSlide(activeSlide);
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
    // activeSlide intentionally omitted: only re-init on open/close
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') lightboxNext();
      else if (e.key === 'ArrowLeft') lightboxPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, closeLightbox, lightboxNext, lightboxPrev]);

  // Lock body scroll & handle Escape while customize modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // handleClose is stable enough for this scope
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
              <button
                key={i}
                type="button"
                onClick={openLightbox}
                aria-label={t('card.viewImage', { index: i + 1 })}
                className="relative w-full h-full flex-shrink-0 snap-center bg-gradient-to-b from-zinc-800 to-zinc-900 cursor-zoom-in"
              >
                <Image
                  src={src}
                  alt={`${teamName} - ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-opacity duration-500 ease-in-out pointer-events-none"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    img.style.opacity = '1';
                  }}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              </button>
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
                      {teamName}
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

        {/* Navigation arrows */}
        {slideCount > 1 && (
          <>
            <button
              onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center transition-colors hover:bg-black/80',
                activeSlide === 0 && 'hidden'
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollToSlide(Math.min(slideCount - 1, activeSlide + 1))}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center transition-colors hover:bg-black/80',
                activeSlide === slideCount - 1 && 'hidden'
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {slideCount > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 flex">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className="group/dot p-2"
                aria-label={`Image ${i + 1}`}
              >
                <span
                  className={cn(
                    'block h-1.5 rounded-full transition-all',
                    activeSlide === i
                      ? 'bg-primary w-3'
                      : 'bg-white/40 w-1.5 group-hover/dot:bg-white/60'
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 text-center">
        <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-primary transition-colors truncate">
          {teamName}
        </h3>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <span className="text-xs sm:text-sm font-black text-white">
            €{jersey.price.toFixed(2)}
          </span>
        </div>
        {!isOpen && (
          <button
            onClick={handleOpenOptions}
            className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 bg-primary text-black font-bold rounded-full text-[11px] sm:text-xs hover:brightness-110 transition-all"
          >
            <Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {t('card.customize')}
          </button>
        )}
      </div>


      {mounted && lightboxOpen && jersey.images && createPortal(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          role="dialog"
          aria-modal="true"
          aria-label={teamName}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm font-medium tabular-nums">
              {lightboxSlide + 1} / {slideCount}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label={tc('close')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Swipeable image track */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="relative flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={lightboxScrollRef}
              onScroll={handleLightboxScroll}
              className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {jersey.images.map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-full flex-shrink-0 snap-center flex items-center justify-center"
                >
                  <Image
                    src={src}
                    alt={`${teamName} - ${i + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority={i === lightboxSlide}
                  />
                </div>
              ))}
            </div>

            {slideCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    lightboxPrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    lightboxNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Dot indicators */}
          {slideCount > 1 && (
            <div className="flex items-center justify-center gap-2 p-4">
              {jersey.images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    lightboxSlide === i ? 'bg-white w-6' : 'bg-white/40 w-1.5'
                  )}
                />
              ))}
            </div>
          )}
        </div>,
        document.body
      )}

      {mounted && isOpen && createPortal(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          role="dialog"
          aria-modal="true"
          aria-label={teamName}
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-md bg-zinc-950 border-t md:border border-zinc-800 rounded-t-2xl md:rounded-2xl p-5 pt-6 space-y-4 animate-in slide-in-from-bottom duration-300 md:slide-in-from-bottom-4 md:fade-in max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative min-h-20 flex items-center">
              {jersey.images?.[0] && (
                <div className="absolute left-0 top-0 w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                  <Image
                    src={jersey.images[0]}
                    alt={teamName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 text-center px-24 min-w-0">
                <h2 className="text-white font-bold text-base truncate">{teamName}</h2>
                <p className="text-primary font-black text-lg">€{jersey.price.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label={tc('close')}
                className="absolute right-0 top-0 w-9 h-9 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {tc('size')}
                </p>
                <SizeGuide />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'py-3 text-sm font-bold rounded border transition-colors text-center',
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
            <div className="space-y-3">
              <div>
                <label htmlFor={`dorsal-name-${jersey.id}`} className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {tc('dorsalName')}
                </label>
                <input
                  id={`dorsal-name-${jersey.id}`}
                  type="text"
                  value={dorsalName}
                  onChange={(e) => setDorsalName(e.target.value.toUpperCase())}
                  placeholder={tc('dorsalNamePlaceholder')}
                  maxLength={20}
                  className="w-full mt-1 px-3 py-3 text-base bg-zinc-900 border border-zinc-700 rounded text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={`dorsal-number-${jersey.id}`} className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {tc('dorsalNumber')}
                </label>
                <input
                  id={`dorsal-number-${jersey.id}`}
                  type="text"
                  inputMode="numeric"
                  value={dorsalNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 2) setDorsalNumber(val);
                  }}
                  placeholder={tc('dorsalNumberPlaceholder')}
                  maxLength={2}
                  className="w-full mt-1 px-3 py-3 text-base bg-zinc-900 border border-zinc-700 rounded text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={cn(
                'w-full py-3.5 text-sm font-bold rounded-full transition-all text-center',
                selectedSize
                  ? 'bg-primary text-black hover:brightness-110'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              )}
            >
              <ShoppingCart className="h-4 w-4 inline mr-2" />
              {selectedSize ? t('card.addToCart') : tc('selectSize')}
            </button>
          </div>
        </div>,
        document.body
      )}
    </article>
  );
}
