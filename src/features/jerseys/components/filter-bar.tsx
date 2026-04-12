'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { leagues, getTeamsByLeague } from '../config/data';
import type { League } from '../types';

interface FilterBarProps {
  activeLeague: League | null;
  activeTeam: string | null;
  onLeagueChange: (league: League | null) => void;
  onTeamChange: (team: string | null) => void;
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

export function FilterBar({ activeLeague, activeTeam, onLeagueChange, onTeamChange }: FilterBarProps) {
  const t = useTranslations('jerseys');
  const locale = useLocale();

  const teamsInLeague = useMemo(() => {
    if (!activeLeague) return [];
    return getTeamsByLeague(activeLeague);
  }, [activeLeague]);

  return (
    <div className="space-y-3">
      {/* League filters */}
      <div className="w-full py-2">
        <div className="flex flex-wrap items-center justify-center gap-2 px-4 md:px-0">
          {leagues.map((league) => (
            <button
              key={league.id}
              onClick={() => {
                onLeagueChange(league.id);
                onTeamChange(null);
              }}
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

      {/* Team sub-filters (shown when a league is selected) */}
      {activeLeague && teamsInLeague.length > 0 && (
        <div className="w-full py-2">
          <div className="flex flex-wrap items-center justify-center gap-2 px-4 md:px-0">
            <ChevronRight className="h-4 w-4 text-zinc-600 hidden md:block" />
            <button
              onClick={() => onTeamChange(null)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap',
                activeTeam === null
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 border border-zinc-800/50'
              )}
            >
              {t('filters.allTeams')}
            </button>

            {teamsInLeague.map((team) => (
              <button
                key={team}
                onClick={() => onTeamChange(team)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap',
                  activeTeam === team
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 border border-zinc-800/50'
                )}
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
