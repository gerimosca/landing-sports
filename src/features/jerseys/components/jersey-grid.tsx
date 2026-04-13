'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { FilterBar } from './filter-bar';
import { JerseyCard } from './jersey-card';
import { jerseys, leagues } from '../config/data';
import type { League } from '../types';

export function JerseyGrid() {
  const t = useTranslations('jerseys');
  const [activeLeague, setActiveLeague] = useState<League | null>(leagues[0]?.id ?? null);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const filteredJerseys = useMemo(() => {
    let result = jerseys;
    if (activeLeague) {
      result = result.filter((j) => j.league === activeLeague);
    }
    if (activeTeam) {
      result = result.filter((j) => j.team === activeTeam);
    }
    return [...result].sort((a, b) => {
      if (a.team !== b.team) {
        const firstIndex = result.findIndex((j) => j.team === a.team);
        const secondIndex = result.findIndex((j) => j.team === b.team);
        return firstIndex - secondIndex;
      }
      const numA = parseInt(a.id.split('-').pop() || '0', 10);
      const numB = parseInt(b.id.split('-').pop() || '0', 10);
      return numB - numA;
    });
  }, [activeLeague, activeTeam]);

  return (
    <section id="catalog" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 text-primary text-xl md:text-2xl font-semibold uppercase tracking-widest mb-4">
            {t('catalog.subtitle')}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {t('catalog.title')}
          </h1>
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
            <JerseyCard
              key={jersey.id}
              jersey={jersey}
              isOpen={openCardId === jersey.id}
              onOpen={() => setOpenCardId(jersey.id)}
              onClose={() => setOpenCardId((id) => (id === jersey.id ? null : id))}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredJerseys.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">{t('catalog.empty')}</p>
            {activeTeam && (
              <button
                onClick={() => setActiveTeam(null)}
                className="mt-4 text-primary hover:underline font-medium"
              >
                {t('catalog.clearFilters')}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
