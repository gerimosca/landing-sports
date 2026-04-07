export type League =
  | 'la-liga'
  | 'premier-league'
  | 'serie-a'
  | 'bundesliga'
  | 'ligue-1'
  | 'brasileirao'
  | 'lpf-argentina'
  | 'selecciones';

export interface LeagueInfo {
  id: League;
  name: Record<string, string>;
  country: string;
}

export interface Jersey {
  id: string;
  team: string;
  league: League;
  price: number;
  originalPrice?: number;
  image: string;
  badge: string;
  variant: 'home' | 'away' | 'third';
  season: string;
  isNew?: boolean;
  isBestseller?: boolean;
}
