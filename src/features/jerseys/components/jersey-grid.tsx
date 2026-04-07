'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal } from 'lucide-react';
import { FilterBar } from './filter-bar';
import { JerseyCard } from './jersey-card';
import { jerseys } from '../config/data';
import type { League } from '../types';

export function JerseyGrid() {
  const t = useTranslations('jerseys');
  const [activeLeague, setActiveLeague] = useState<League | null>(null);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  const filteredJerseys = useMemo(() => {
    let result = jerseys;
    if (activeLeague) {
      result = result.filter((j) => j.league === activeLeague);
    }
    if (activeTeam) {
      result = result.filter((j) => j.team === activeTeam);
    }
    return result;
  }, [activeLeague, activeTeam]);

  return (
    <section id="catalog" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            <SlidersHorizontal className="h-4 w-4" />
            {t('catalog.subtitle')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t('catalog.title')}
          </h2>
        </div>

        {/* Filters */}
        <FilterBar
          activeLeague={activeLeague}
          activeTeam={activeTeam}
          onLeagueChange={setActiveLeague}
          onTeamChange={setActiveTeam}
        />

        {/* Results count */}
        <p className="text-sm text-zinc-500 mt-6 mb-8 text-center md:text-left">
          {t('catalog.showing', { count: filteredJerseys.length })}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredJerseys.map((jersey) => (
            <JerseyCard key={jersey.id} jersey={jersey} />
          ))}
        </div>

        {/* Empty state */}
        {filteredJerseys.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">{t('catalog.empty')}</p>
            <button
              onClick={() => {
                setActiveLeague(null);
                setActiveTeam(null);
              }}
              className="mt-4 text-primary hover:underline font-medium"
            >
              {t('catalog.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
