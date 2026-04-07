'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';
import { leagues } from '../config/data';
import type { League } from '../types';

interface FilterBarProps {
  activeLeague: League | null;
  onFilterChange: (league: League | null) => void;
}

const leagueFlags: Record<string, string> = {
  ES: '🇪🇸',
  GB: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  IT: '🇮🇹',
  DE: '🇩🇪',
  FR: '🇫🇷',
  BR: '🇧🇷',
  AR: '🇦🇷',
  INTL: '🌍',
};

export function FilterBar({ activeLeague, onFilterChange }: FilterBarProps) {
  const t = useTranslations('jerseys');
  const locale = useLocale();

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex items-center gap-2 min-w-max px-4 md:px-0 md:justify-center md:flex-wrap">
        {/* All button */}
        <button
          onClick={() => onFilterChange(null)}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap',
            activeLeague === null
              ? 'bg-primary text-black shadow-lg shadow-primary/25'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
          )}
        >
          {t('filters.all')}
        </button>

        {/* League buttons */}
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => onFilterChange(league.id)}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap',
              activeLeague === league.id
                ? 'bg-primary text-black shadow-lg shadow-primary/25'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
            )}
          >
            <span className="text-base">{leagueFlags[league.country]}</span>
            {league.name[locale] || league.name.en}
          </button>
        ))}
      </div>
    </div>
  );
}
