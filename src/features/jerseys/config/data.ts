import type { League, LeagueInfo, Jersey } from '../types';

export const leagues: LeagueInfo[] = [
  { id: 'la-liga', name: { en: 'La Liga', es: 'La Liga' }, country: 'ES' },
  { id: 'premier-league', name: { en: 'Premier League', es: 'Premier League' }, country: 'GB' },
  { id: 'serie-a', name: { en: 'Serie A', es: 'Serie A' }, country: 'IT' },
  { id: 'bundesliga', name: { en: 'Bundesliga', es: 'Bundesliga' }, country: 'DE' },
  { id: 'ligue-1', name: { en: 'Ligue 1', es: 'Ligue 1' }, country: 'FR' },
  { id: 'brasileirao', name: { en: 'Brasileirão', es: 'Brasileirão' }, country: 'BR' },
  { id: 'lpf-argentina', name: { en: 'LPF Argentina', es: 'LPF Argentina' }, country: 'AR' },
  { id: 'selecciones', name: { en: 'National Teams', es: 'Selecciones' }, country: 'INTL' },
];

export const jerseys: Jersey[] = [
  // La Liga - Real Madrid
  {
    id: 'real-madrid-home',
    team: 'Real Madrid',
    league: 'la-liga',
    price: 89.99,
    originalPrice: 109.99,
    image: '/jerseys/real-madrid-home.webp',
    badge: '/badges/real-madrid.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'real-madrid-away',
    team: 'Real Madrid',
    league: 'la-liga',
    price: 89.99,
    image: '/jerseys/real-madrid-away.webp',
    badge: '/badges/real-madrid.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'real-madrid-third',
    team: 'Real Madrid',
    league: 'la-liga',
    price: 89.99,
    image: '/jerseys/real-madrid-third.webp',
    badge: '/badges/real-madrid.webp',
    variant: 'third',
    season: '2024/25',
    isNew: true,
  },

  // La Liga - FC Barcelona
  {
    id: 'barcelona-home',
    team: 'FC Barcelona',
    league: 'la-liga',
    price: 89.99,
    originalPrice: 109.99,
    image: '/jerseys/barcelona-home.webp',
    badge: '/badges/barcelona.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'barcelona-away',
    team: 'FC Barcelona',
    league: 'la-liga',
    price: 89.99,
    image: '/jerseys/barcelona-away.webp',
    badge: '/badges/barcelona.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'barcelona-third',
    team: 'FC Barcelona',
    league: 'la-liga',
    price: 89.99,
    image: '/jerseys/barcelona-third.webp',
    badge: '/badges/barcelona.webp',
    variant: 'third',
    season: '2024/25',
    isNew: true,
  },

  // La Liga - Atlético de Madrid
  {
    id: 'atletico-madrid-home',
    team: 'Atlético de Madrid',
    league: 'la-liga',
    price: 84.99,
    image: '/jerseys/atletico-home.webp',
    badge: '/badges/atletico.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'atletico-madrid-away',
    team: 'Atlético de Madrid',
    league: 'la-liga',
    price: 84.99,
    image: '/jerseys/atletico-away.webp',
    badge: '/badges/atletico.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'atletico-madrid-third',
    team: 'Atlético de Madrid',
    league: 'la-liga',
    price: 84.99,
    image: '/jerseys/atletico-third.webp',
    badge: '/badges/atletico.webp',
    variant: 'third',
    season: '2024/25',
  },

  // La Liga - Real Sociedad
  {
    id: 'real-sociedad-home',
    team: 'Real Sociedad',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/real-sociedad-home.webp',
    badge: '/badges/real-sociedad.webp',
    variant: 'home',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'real-sociedad-away',
    team: 'Real Sociedad',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/real-sociedad-away.webp',
    badge: '/badges/real-sociedad.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Premier League - Manchester City
  {
    id: 'manchester-city-home',
    team: 'Manchester City',
    league: 'premier-league',
    price: 94.99,
    image: '/jerseys/man-city-home.webp',
    badge: '/badges/man-city.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'manchester-city-away',
    team: 'Manchester City',
    league: 'premier-league',
    price: 94.99,
    image: '/jerseys/man-city-away.webp',
    badge: '/badges/man-city.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'manchester-city-third',
    team: 'Manchester City',
    league: 'premier-league',
    price: 94.99,
    image: '/jerseys/man-city-third.webp',
    badge: '/badges/man-city.webp',
    variant: 'third',
    season: '2024/25',
  },

  // Premier League - Liverpool FC
  {
    id: 'liverpool-home',
    team: 'Liverpool FC',
    league: 'premier-league',
    price: 94.99,
    originalPrice: 109.99,
    image: '/jerseys/liverpool-home.webp',
    badge: '/badges/liverpool.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'liverpool-away',
    team: 'Liverpool FC',
    league: 'premier-league',
    price: 94.99,
    image: '/jerseys/liverpool-away.webp',
    badge: '/badges/liverpool.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'liverpool-third',
    team: 'Liverpool FC',
    league: 'premier-league',
    price: 94.99,
    image: '/jerseys/liverpool-third.webp',
    badge: '/badges/liverpool.webp',
    variant: 'third',
    season: '2024/25',
    isNew: true,
  },

  // Premier League - Arsenal FC
  {
    id: 'arsenal-home',
    team: 'Arsenal FC',
    league: 'premier-league',
    price: 89.99,
    image: '/jerseys/arsenal-home.webp',
    badge: '/badges/arsenal.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'arsenal-away',
    team: 'Arsenal FC',
    league: 'premier-league',
    price: 89.99,
    image: '/jerseys/arsenal-away.webp',
    badge: '/badges/arsenal.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Premier League - Chelsea FC
  {
    id: 'chelsea-home',
    team: 'Chelsea FC',
    league: 'premier-league',
    price: 89.99,
    image: '/jerseys/chelsea-home.webp',
    badge: '/badges/chelsea.webp',
    variant: 'home',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'chelsea-away',
    team: 'Chelsea FC',
    league: 'premier-league',
    price: 89.99,
    image: '/jerseys/chelsea-away.webp',
    badge: '/badges/chelsea.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Serie A - Inter Milan
  {
    id: 'inter-milan-home',
    team: 'Inter Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/jerseys/inter-home.webp',
    badge: '/badges/inter.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'inter-milan-away',
    team: 'Inter Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/jerseys/inter-away.webp',
    badge: '/badges/inter.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'inter-milan-third',
    team: 'Inter Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/jerseys/inter-third.webp',
    badge: '/badges/inter.webp',
    variant: 'third',
    season: '2024/25',
  },

  // Serie A - AC Milan
  {
    id: 'ac-milan-home',
    team: 'AC Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/jerseys/ac-milan-home.webp',
    badge: '/badges/ac-milan.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'ac-milan-away',
    team: 'AC Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/jerseys/ac-milan-away.webp',
    badge: '/badges/ac-milan.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Serie A - Juventus FC
  {
    id: 'juventus-home',
    team: 'Juventus FC',
    league: 'serie-a',
    price: 84.99,
    originalPrice: 99.99,
    image: '/jerseys/juventus-home.webp',
    badge: '/badges/juventus.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'juventus-away',
    team: 'Juventus FC',
    league: 'serie-a',
    price: 84.99,
    image: '/jerseys/juventus-away.webp',
    badge: '/badges/juventus.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Serie A - SSC Napoli
  {
    id: 'napoli-home',
    team: 'SSC Napoli',
    league: 'serie-a',
    price: 79.99,
    image: '/jerseys/napoli-home.webp',
    badge: '/badges/napoli.webp',
    variant: 'home',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'napoli-away',
    team: 'SSC Napoli',
    league: 'serie-a',
    price: 79.99,
    image: '/jerseys/napoli-away.webp',
    badge: '/badges/napoli.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Bundesliga - Bayern München
  {
    id: 'bayern-munich-home',
    team: 'Bayern München',
    league: 'bundesliga',
    price: 89.99,
    image: '/jerseys/bayern-home.webp',
    badge: '/badges/bayern.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'bayern-munich-away',
    team: 'Bayern München',
    league: 'bundesliga',
    price: 89.99,
    image: '/jerseys/bayern-away.webp',
    badge: '/badges/bayern.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'bayern-munich-third',
    team: 'Bayern München',
    league: 'bundesliga',
    price: 89.99,
    image: '/jerseys/bayern-third.webp',
    badge: '/badges/bayern.webp',
    variant: 'third',
    season: '2024/25',
  },

  // Bundesliga - Borussia Dortmund
  {
    id: 'dortmund-home',
    team: 'Borussia Dortmund',
    league: 'bundesliga',
    price: 84.99,
    image: '/jerseys/dortmund-home.webp',
    badge: '/badges/dortmund.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'dortmund-away',
    team: 'Borussia Dortmund',
    league: 'bundesliga',
    price: 84.99,
    image: '/jerseys/dortmund-away.webp',
    badge: '/badges/dortmund.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Bundesliga - Bayer Leverkusen
  {
    id: 'leverkusen-home',
    team: 'Bayer Leverkusen',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/leverkusen-home.webp',
    badge: '/badges/leverkusen.webp',
    variant: 'home',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'leverkusen-away',
    team: 'Bayer Leverkusen',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/leverkusen-away.webp',
    badge: '/badges/leverkusen.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Ligue 1 - Paris Saint-Germain
  {
    id: 'psg-home',
    team: 'Paris Saint-Germain',
    league: 'ligue-1',
    price: 94.99,
    image: '/jerseys/psg-home.webp',
    badge: '/badges/psg.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'psg-away',
    team: 'Paris Saint-Germain',
    league: 'ligue-1',
    price: 94.99,
    image: '/jerseys/psg-away.webp',
    badge: '/badges/psg.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'psg-third',
    team: 'Paris Saint-Germain',
    league: 'ligue-1',
    price: 94.99,
    image: '/jerseys/psg-third.webp',
    badge: '/badges/psg.webp',
    variant: 'third',
    season: '2024/25',
    isNew: true,
  },

  // Ligue 1 - Olympique de Marseille
  {
    id: 'marseille-home',
    team: 'Olympique de Marseille',
    league: 'ligue-1',
    price: 79.99,
    image: '/jerseys/marseille-home.webp',
    badge: '/badges/marseille.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'marseille-away',
    team: 'Olympique de Marseille',
    league: 'ligue-1',
    price: 79.99,
    image: '/jerseys/marseille-away.webp',
    badge: '/badges/marseille.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Brasileirão - Flamengo
  {
    id: 'flamengo-home',
    team: 'Flamengo',
    league: 'brasileirao',
    price: 74.99,
    image: '/jerseys/flamengo-home.webp',
    badge: '/badges/flamengo.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'flamengo-away',
    team: 'Flamengo',
    league: 'brasileirao',
    price: 74.99,
    image: '/jerseys/flamengo-away.webp',
    badge: '/badges/flamengo.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Brasileirão - Palmeiras
  {
    id: 'palmeiras-home',
    team: 'Palmeiras',
    league: 'brasileirao',
    price: 74.99,
    image: '/jerseys/palmeiras-home.webp',
    badge: '/badges/palmeiras.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'palmeiras-away',
    team: 'Palmeiras',
    league: 'brasileirao',
    price: 74.99,
    image: '/jerseys/palmeiras-away.webp',
    badge: '/badges/palmeiras.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Brasileirão - Santos FC
  {
    id: 'santos-home',
    team: 'Santos FC',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/santos-home.webp',
    badge: '/badges/santos.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'santos-away',
    team: 'Santos FC',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/santos-away.webp',
    badge: '/badges/santos.webp',
    variant: 'away',
    season: '2024/25',
  },

  // LPF Argentina - Boca Juniors
  {
    id: 'boca-juniors-home',
    team: 'Boca Juniors',
    league: 'lpf-argentina',
    price: 74.99,
    image: '/jerseys/boca-home.webp',
    badge: '/badges/boca.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'boca-juniors-away',
    team: 'Boca Juniors',
    league: 'lpf-argentina',
    price: 74.99,
    image: '/jerseys/boca-away.webp',
    badge: '/badges/boca.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'boca-juniors-third',
    team: 'Boca Juniors',
    league: 'lpf-argentina',
    price: 74.99,
    image: '/jerseys/boca-third.webp',
    badge: '/badges/boca.webp',
    variant: 'third',
    season: '2024/25',
  },

  // LPF Argentina - River Plate
  {
    id: 'river-plate-home',
    team: 'River Plate',
    league: 'lpf-argentina',
    price: 74.99,
    image: '/jerseys/river-home.webp',
    badge: '/badges/river.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'river-plate-away',
    team: 'River Plate',
    league: 'lpf-argentina',
    price: 74.99,
    image: '/jerseys/river-away.webp',
    badge: '/badges/river.webp',
    variant: 'away',
    season: '2024/25',
  },
  {
    id: 'river-plate-third',
    team: 'River Plate',
    league: 'lpf-argentina',
    price: 74.99,
    image: '/jerseys/river-third.webp',
    badge: '/badges/river.webp',
    variant: 'third',
    season: '2024/25',
    isNew: true,
  },

  // LPF Argentina - Racing Club
  {
    id: 'racing-club-home',
    team: 'Racing Club',
    league: 'lpf-argentina',
    price: 69.99,
    image: '/jerseys/racing-home.webp',
    badge: '/badges/racing.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'racing-club-away',
    team: 'Racing Club',
    league: 'lpf-argentina',
    price: 69.99,
    image: '/jerseys/racing-away.webp',
    badge: '/badges/racing.webp',
    variant: 'away',
    season: '2024/25',
  },

  // LPF Argentina - Independiente
  {
    id: 'independiente-home',
    team: 'Independiente',
    league: 'lpf-argentina',
    price: 69.99,
    image: '/jerseys/independiente-home.webp',
    badge: '/badges/independiente.webp',
    variant: 'home',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'independiente-away',
    team: 'Independiente',
    league: 'lpf-argentina',
    price: 69.99,
    image: '/jerseys/independiente-away.webp',
    badge: '/badges/independiente.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Selecciones - Argentina
  {
    id: 'argentina-home',
    team: 'Argentina',
    league: 'selecciones',
    price: 99.99,
    image: '/jerseys/argentina-home.webp',
    badge: '/badges/argentina.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'argentina-away',
    team: 'Argentina',
    league: 'selecciones',
    price: 99.99,
    image: '/jerseys/argentina-away.webp',
    badge: '/badges/argentina.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Selecciones - Brasil
  {
    id: 'brasil-home',
    team: 'Brasil',
    league: 'selecciones',
    price: 99.99,
    image: '/jerseys/brasil-home.webp',
    badge: '/badges/brasil.webp',
    variant: 'home',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'brasil-away',
    team: 'Brasil',
    league: 'selecciones',
    price: 99.99,
    image: '/jerseys/brasil-away.webp',
    badge: '/badges/brasil.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Selecciones - España
  {
    id: 'espana-home',
    team: 'España',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/espana-home.webp',
    badge: '/badges/espana.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'espana-away',
    team: 'España',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/espana-away.webp',
    badge: '/badges/espana.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Selecciones - Francia
  {
    id: 'francia-home',
    team: 'Francia',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/francia-home.webp',
    badge: '/badges/francia.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'francia-away',
    team: 'Francia',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/francia-away.webp',
    badge: '/badges/francia.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Selecciones - Alemania
  {
    id: 'alemania-home',
    team: 'Alemania',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/alemania-home.webp',
    badge: '/badges/alemania.webp',
    variant: 'home',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'alemania-away',
    team: 'Alemania',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/alemania-away.webp',
    badge: '/badges/alemania.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Selecciones - Italia
  {
    id: 'italia-home',
    team: 'Italia',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/italia-home.webp',
    badge: '/badges/italia.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'italia-away',
    team: 'Italia',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/italia-away.webp',
    badge: '/badges/italia.webp',
    variant: 'away',
    season: '2024/25',
  },

  // Selecciones - Inglaterra
  {
    id: 'inglaterra-home',
    team: 'Inglaterra',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/inglaterra-home.webp',
    badge: '/badges/inglaterra.webp',
    variant: 'home',
    season: '2024/25',
  },
  {
    id: 'inglaterra-away',
    team: 'Inglaterra',
    league: 'selecciones',
    price: 94.99,
    image: '/jerseys/inglaterra-away.webp',
    badge: '/badges/inglaterra.webp',
    variant: 'away',
    season: '2024/25',
  },

  // La Liga - Valencia
  {
    id: 'valencia-home',
    team: 'Valencia',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/valencia-home.webp',
    badge: '/badges/valencia.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Oviedo
  {
    id: 'oviedo-home',
    team: 'Oviedo',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/oviedo-home.webp',
    badge: '/badges/oviedo.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Real Betis
  {
    id: 'real-betis-home',
    team: 'Real Betis',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/real-betis-home.webp',
    badge: '/badges/real-betis.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Tenerife
  {
    id: 'tenerife-home',
    team: 'Tenerife',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/tenerife-home.webp',
    badge: '/badges/tenerife.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Sevilla
  {
    id: 'sevilla-home',
    team: 'Sevilla',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/sevilla-home.webp',
    badge: '/badges/sevilla.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - RCD Mallorca
  {
    id: 'rcd-mallorca-home',
    team: 'RCD Mallorca',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/rcd-mallorca-home.webp',
    badge: '/badges/rcd-mallorca.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Málaga
  {
    id: 'malaga-home',
    team: 'Málaga',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/malaga-home.webp',
    badge: '/badges/malaga.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Girona
  {
    id: 'girona-home',
    team: 'Girona',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/girona-home.webp',
    badge: '/badges/girona.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Deportivo la Coruña
  {
    id: 'deportivo-la-coruna-home',
    team: 'Deportivo la Coruña',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/deportivo-la-coruna-home.webp',
    badge: '/badges/deportivo-la-coruna.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Córdoba
  {
    id: 'cordoba-home',
    team: 'Córdoba',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/cordoba-home.webp',
    badge: '/badges/cordoba.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Celta
  {
    id: 'celta-home',
    team: 'Celta',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/celta-home.webp',
    badge: '/badges/celta.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Cádiz
  {
    id: 'cadiz-home',
    team: 'Cádiz',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/cadiz-home.webp',
    badge: '/badges/cadiz.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Athletic Bilbao
  {
    id: 'athletic-bilbao-home',
    team: 'Athletic Bilbao',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/athletic-bilbao-home.webp',
    badge: '/badges/athletic-bilbao.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Zaragoza
  {
    id: 'zaragoza-home',
    team: 'Zaragoza',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/zaragoza-home.webp',
    badge: '/badges/zaragoza.webp',
    variant: 'home',
    season: '2024/25',
  },

  // La Liga - Racing de Santander
  {
    id: 'racing-de-santander-home',
    team: 'Racing de Santander',
    league: 'la-liga',
    price: 79.99,
    image: '/jerseys/racing-de-santander-home.webp',
    badge: '/badges/racing-de-santander.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Premier League - Manchester United
  {
    id: 'manchester-united-home',
    team: 'Manchester United',
    league: 'premier-league',
    price: 84.99,
    image: '/jerseys/manchester-united-home.webp',
    badge: '/badges/manchester-united.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Premier League - Tottenham
  {
    id: 'tottenham-home',
    team: 'Tottenham',
    league: 'premier-league',
    price: 84.99,
    image: '/jerseys/tottenham-home.webp',
    badge: '/badges/tottenham.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Premier League - Newcastle
  {
    id: 'newcastle-home',
    team: 'Newcastle',
    league: 'premier-league',
    price: 84.99,
    image: '/jerseys/newcastle-home.webp',
    badge: '/badges/newcastle.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Premier League - Leeds United
  {
    id: 'leeds-united-home',
    team: 'Leeds United',
    league: 'premier-league',
    price: 84.99,
    image: '/jerseys/leeds-united-home.webp',
    badge: '/badges/leeds-united.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Premier League - Everton
  {
    id: 'everton-home',
    team: 'Everton',
    league: 'premier-league',
    price: 84.99,
    image: '/jerseys/everton-home.webp',
    badge: '/badges/everton.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Premier League - Brighton
  {
    id: 'brighton-home',
    team: 'Brighton',
    league: 'premier-league',
    price: 84.99,
    image: '/jerseys/brighton-home.webp',
    badge: '/badges/brighton.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Premier League - Aston Villa
  {
    id: 'aston-villa-home',
    team: 'Aston Villa',
    league: 'premier-league',
    price: 84.99,
    image: '/jerseys/aston-villa-home.webp',
    badge: '/badges/aston-villa.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Bundesliga - Schalke 04
  {
    id: 'schalke-04-home',
    team: 'Schalke 04',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/schalke-04-home.webp',
    badge: '/badges/schalke-04.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Bundesliga - RB Leipzig
  {
    id: 'rb-leipzig-home',
    team: 'RB Leipzig',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/rb-leipzig-home.webp',
    badge: '/badges/rb-leipzig.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Bundesliga - Wolfsburg
  {
    id: 'wolfsburg-home',
    team: 'Wolfsburg',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/wolfsburg-home.webp',
    badge: '/badges/wolfsburg.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Bundesliga - Eintracht Frankfurt
  {
    id: 'eintracht-frankfurt-home',
    team: 'Eintracht Frankfurt',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/eintracht-frankfurt-home.webp',
    badge: '/badges/eintracht-frankfurt.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Bundesliga - Borussia Mönchengladbach
  {
    id: 'borussia-monchengladbach-home',
    team: 'Borussia Mönchengladbach',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/borussia-monchengladbach-home.webp',
    badge: '/badges/borussia-monchengladbach.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Bundesliga - Stuttgart
  {
    id: 'stuttgart-home',
    team: 'Stuttgart',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/stuttgart-home.webp',
    badge: '/badges/stuttgart.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Bundesliga - FC Union Berlin
  {
    id: 'fc-union-berlin-home',
    team: 'FC Union Berlin',
    league: 'bundesliga',
    price: 79.99,
    image: '/jerseys/fc-union-berlin-home.webp',
    badge: '/badges/fc-union-berlin.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Ligue 1 - Olympique Lyon
  {
    id: 'olympique-lyon-home',
    team: 'Olympique Lyon',
    league: 'ligue-1',
    price: 79.99,
    image: '/jerseys/olympique-lyon-home.webp',
    badge: '/badges/olympique-lyon.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Ligue 1 - Lille
  {
    id: 'lille-home',
    team: 'Lille',
    league: 'ligue-1',
    price: 79.99,
    image: '/jerseys/lille-home.webp',
    badge: '/badges/lille.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Ligue 1 - Stade Rennais
  {
    id: 'stade-rennais-home',
    team: 'Stade Rennais',
    league: 'ligue-1',
    price: 79.99,
    image: '/jerseys/stade-rennais-home.webp',
    badge: '/badges/stade-rennais.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Serie A - Roma
  {
    id: 'roma-home',
    team: 'Roma',
    league: 'serie-a',
    price: 79.99,
    image: '/jerseys/roma-home.webp',
    badge: '/badges/roma.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Serie A - Fiorentina
  {
    id: 'fiorentina-home',
    team: 'Fiorentina',
    league: 'serie-a',
    price: 79.99,
    image: '/jerseys/fiorentina-home.webp',
    badge: '/badges/fiorentina.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Serie A - Atalanta
  {
    id: 'atalanta-home',
    team: 'Atalanta',
    league: 'serie-a',
    price: 79.99,
    image: '/jerseys/atalanta-home.webp',
    badge: '/badges/atalanta.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Serie A - Lazio
  {
    id: 'lazio-home',
    team: 'Lazio',
    league: 'serie-a',
    price: 79.99,
    image: '/jerseys/lazio-home.webp',
    badge: '/badges/lazio.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Serie A - Parma
  {
    id: 'parma-home',
    team: 'Parma',
    league: 'serie-a',
    price: 79.99,
    image: '/jerseys/parma-home.webp',
    badge: '/badges/parma.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Brasileirão - Corinthians
  {
    id: 'corinthians-home',
    team: 'Corinthians',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/corinthians-home.webp',
    badge: '/badges/corinthians.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Brasileirão - Internacional
  {
    id: 'internacional-home',
    team: 'Internacional',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/internacional-home.webp',
    badge: '/badges/internacional.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Brasileirão - Fluminense
  {
    id: 'fluminense-home',
    team: 'Fluminense',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/fluminense-home.webp',
    badge: '/badges/fluminense.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Brasileirão - Cruzeiro
  {
    id: 'cruzeiro-home',
    team: 'Cruzeiro',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/cruzeiro-home.webp',
    badge: '/badges/cruzeiro.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Brasileirão - Vasco Da Gama
  {
    id: 'vasco-da-gama-home',
    team: 'Vasco Da Gama',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/vasco-da-gama-home.webp',
    badge: '/badges/vasco-da-gama.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Brasileirão - Atlético Mineiro
  {
    id: 'atletico-mineiro-home',
    team: 'Atlético Mineiro',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/atletico-mineiro-home.webp',
    badge: '/badges/atletico-mineiro.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Brasileirão - Botafogo
  {
    id: 'botafogo-home',
    team: 'Botafogo',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/botafogo-home.webp',
    badge: '/badges/botafogo.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Noruega
  {
    id: 'noruega-home',
    team: 'Noruega',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/noruega-home.webp',
    badge: '/badges/noruega.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Bolivia
  {
    id: 'bolivia-home',
    team: 'Bolivia',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/bolivia-home.webp',
    badge: '/badges/bolivia.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - México
  {
    id: 'mexico-home',
    team: 'México',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/mexico-home.webp',
    badge: '/badges/mexico.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Japón
  {
    id: 'japon-home',
    team: 'Japón',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/japon-home.webp',
    badge: '/badges/japon.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Colombia
  {
    id: 'colombia-home',
    team: 'Colombia',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/colombia-home.webp',
    badge: '/badges/colombia.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Holanda
  {
    id: 'holanda-home',
    team: 'Holanda',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/holanda-home.webp',
    badge: '/badges/holanda.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Jamaica
  {
    id: 'jamaica-home',
    team: 'Jamaica',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/jamaica-home.webp',
    badge: '/badges/jamaica.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - EEUU
  {
    id: 'eeuu-home',
    team: 'EEUU',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/eeuu-home.webp',
    badge: '/badges/eeuu.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Portugal
  {
    id: 'portugal-home',
    team: 'Portugal',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/portugal-home.webp',
    badge: '/badges/portugal.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Perú
  {
    id: 'peru-home',
    team: 'Perú',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/peru-home.webp',
    badge: '/badges/peru.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Suecia
  {
    id: 'suecia-home',
    team: 'Suecia',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/suecia-home.webp',
    badge: '/badges/suecia.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Grecia
  {
    id: 'grecia-home',
    team: 'Grecia',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/grecia-home.webp',
    badge: '/badges/grecia.webp',
    variant: 'home',
    season: '2024/25',
  },

  // Selecciones - Venezuela
  {
    id: 'venezuela-home',
    team: 'Venezuela',
    league: 'selecciones',
    price: 89.99,
    image: '/jerseys/venezuela-home.webp',
    badge: '/badges/venezuela.webp',
    variant: 'home',
    season: '2024/25',
  },
];

export function getJerseysByLeague(league: League): Jersey[] {
  return jerseys.filter((j) => j.league === league);
}

export function getTeamsByLeague(league: League): string[] {
  const teams = jerseys
    .filter((j) => j.league === league)
    .map((j) => j.team);
  return [...new Set(teams)];
}

export function getBestsellers(): Jersey[] {
  return jerseys.filter((j) => j.isBestseller);
}

export function getNewArrivals(): Jersey[] {
  return jerseys.filter((j) => j.isNew);
}
