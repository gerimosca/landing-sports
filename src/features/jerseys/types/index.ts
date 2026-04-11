export type League =
  | 'selecciones'
  | 'la-liga'
  | 'premier-league'
  | 'serie-a'
  | 'bundesliga'
  | 'ligue-1'
  | 'brasileirao'
  | 'resto-de-ligas'
  | 'retro';

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
  images?: string[];
  badge: string;
  season: string;
  isNew?: boolean;
  isBestseller?: boolean;
}
