'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Flame, Sparkles } from 'lucide-react';
import { JerseyCard } from './jersey-card';
import { getBestsellers, getNewArrivals } from '../config/data';

export function FeaturedSection() {
  const t = useTranslations('jerseys');
  const bestsellers = getBestsellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const cardHandlers = (id: string) => ({
    isOpen: openCardId === id,
    onOpen: () => setOpenCardId(id),
    onClose: () => setOpenCardId((cur) => (cur === id ? null : cur)),
  });

  return (
    <section className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="container mx-auto px-4">
        {/* Bestsellers */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Flame className="h-5 w-5" />
              <h2 className="text-lg font-bold uppercase tracking-wider">
                {t('featured.bestsellers')}
              </h2>
            </div>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map((jersey) => (
              <JerseyCard key={jersey.id} jersey={jersey} {...cardHandlers(jersey.id)} />
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-lg font-bold uppercase tracking-wider">
                {t('featured.newArrivals')}
              </h2>
            </div>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((jersey) => (
              <JerseyCard key={jersey.id} jersey={jersey} {...cardHandlers(jersey.id)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
