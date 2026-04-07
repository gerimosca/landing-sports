'use client';

import { useTranslations } from 'next-intl';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export function HeroSection() {
  const t = useTranslations('jerseys');

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" />

      {/* Diagonal accent line */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Season badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {t('hero.badge')}
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          {t('hero.title1')}
          <br />
          <span className="text-primary">{t('hero.title2')}</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="px-8 py-6 text-base font-bold bg-primary text-black hover:bg-primary/90 transition-all"
            onClick={scrollToCatalog}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {t('hero.cta')}
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <p className="text-3xl md:text-4xl font-black text-white">500+</p>
            <p className="text-sm text-zinc-500 mt-1">{t('hero.stat1')}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-primary">8</p>
            <p className="text-sm text-zinc-500 mt-1">{t('hero.stat2')}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-white">24h</p>
            <p className="text-sm text-zinc-500 mt-1">{t('hero.stat3')}</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToCatalog}
          className="mt-16 inline-flex flex-col items-center text-zinc-600 hover:text-primary transition-colors"
          aria-label={t('hero.scrollDown')}
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
