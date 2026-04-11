import type { League, LeagueInfo, Jersey } from '../types';

export const leagues: LeagueInfo[] = [
  { id: 'selecciones', name: { en: 'National Teams', es: 'Selecciones' }, country: 'INTL' },
  { id: 'la-liga', name: { en: 'La Liga', es: 'La Liga' }, country: 'ES' },
  { id: 'premier-league', name: { en: 'Premier League', es: 'Premier League' }, country: 'GB' },
  { id: 'serie-a', name: { en: 'Serie A', es: 'Serie A' }, country: 'IT' },
  { id: 'bundesliga', name: { en: 'Bundesliga', es: 'Bundesliga' }, country: 'DE' },
  { id: 'ligue-1', name: { en: 'Ligue 1', es: 'Ligue 1' }, country: 'FR' },
  { id: 'brasileirao', name: { en: 'Brasileirão', es: 'Brasileirão' }, country: 'BR' },
  { id: 'resto-de-ligas', name: { en: 'Other Leagues', es: 'Resto de Ligas' }, country: 'INTL' },
  { id: 'retro', name: { en: 'Retro', es: 'Retro' }, country: 'INTL' },
];

export const jerseys: Jersey[] = [
  // La Liga - Real Madrid
  {
    id: 'real-madrid-1',
    team: 'Real Madrid',
    league: 'la-liga',
    price: 89.99,
    originalPrice: 109.99,
    image: '/images/la-liga/real-madrid/1/1.jpg',
    images: [
      '/images/la-liga/real-madrid/1/1.jpg',
      '/images/la-liga/real-madrid/1/2.jpg',
      '/images/la-liga/real-madrid/1/3.jpg',
      '/images/la-liga/real-madrid/1/4.jpg',
      '/images/la-liga/real-madrid/1/5.jpg',
    ],
    badge: '/badges/real-madrid.webp',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'real-madrid-2',
    team: 'Real Madrid',
    league: 'la-liga',
    price: 89.99,
    image: '/images/la-liga/real-madrid/2/1.jpg',
    images: [
      '/images/la-liga/real-madrid/2/1.jpg',
      '/images/la-liga/real-madrid/2/2.jpg',
      '/images/la-liga/real-madrid/2/3.jpg',
      '/images/la-liga/real-madrid/2/4.jpg',
      '/images/la-liga/real-madrid/2/5.jpg',
    ],
    badge: '/badges/real-madrid.webp',
    season: '2024/25',
  },
  {
    id: 'real-madrid-3',
    team: 'Real Madrid',
    league: 'la-liga',
    price: 89.99,
    image: '/images/la-liga/real-madrid/3/1.jpg',
    images: [
      '/images/la-liga/real-madrid/3/1.jpg',
      '/images/la-liga/real-madrid/3/2.jpg',
      '/images/la-liga/real-madrid/3/3.jpg',
      '/images/la-liga/real-madrid/3/4.jpg',
      '/images/la-liga/real-madrid/3/5.jpg',
      '/images/la-liga/real-madrid/3/6.jpg',
    ],
    badge: '/badges/real-madrid.webp',
    season: '2024/25',
    isNew: true,
  },

  // La Liga - FC Barcelona
  {
    id: 'barcelona-1',
    team: 'FC Barcelona',
    league: 'la-liga',
    price: 89.99,
    originalPrice: 109.99,
    image: '/images/la-liga/barcelona/1/1.jpg',
    images: [
      '/images/la-liga/barcelona/1/1.jpg',
      '/images/la-liga/barcelona/1/2.jpg',
      '/images/la-liga/barcelona/1/3.jpg',
      '/images/la-liga/barcelona/1/4.jpg',
      '/images/la-liga/barcelona/1/5.jpg',
    ],
    badge: '/badges/barcelona.webp',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'barcelona-2',
    team: 'FC Barcelona',
    league: 'la-liga',
    price: 89.99,
    image: '/images/la-liga/barcelona/2/1.jpg',
    images: [
      '/images/la-liga/barcelona/2/1.jpg',
      '/images/la-liga/barcelona/2/2.jpg',
      '/images/la-liga/barcelona/2/3.jpg',
      '/images/la-liga/barcelona/2/4.jpg',
      '/images/la-liga/barcelona/2/5.jpg',
      '/images/la-liga/barcelona/2/6.jpg',
    ],
    badge: '/badges/barcelona.webp',
    season: '2024/25',
  },
  {
    id: 'barcelona-3',
    team: 'FC Barcelona',
    league: 'la-liga',
    price: 89.99,
    image: '/images/la-liga/barcelona/3/1.jpg',
    images: [
      '/images/la-liga/barcelona/3/1.jpg',
      '/images/la-liga/barcelona/3/2.jpg',
      '/images/la-liga/barcelona/3/3.jpg',
      '/images/la-liga/barcelona/3/4.jpg',
      '/images/la-liga/barcelona/3/5.jpg',
      '/images/la-liga/barcelona/3/6.jpg',
    ],
    badge: '/badges/barcelona.webp',
    season: '2024/25',
    isNew: true,
  },

  // La Liga - Atlético de Madrid
  {
    id: 'atletico-madrid-1',
    team: 'Atlético de Madrid',
    league: 'la-liga',
    price: 84.99,
    image: '/images/la-liga/atletico-madrid/1/1.jpg',
    images: [
      '/images/la-liga/atletico-madrid/1/1.jpg',
      '/images/la-liga/atletico-madrid/1/2.jpg',
      '/images/la-liga/atletico-madrid/1/3.jpg',
      '/images/la-liga/atletico-madrid/1/4.jpg',
      '/images/la-liga/atletico-madrid/1/5.jpg',
    ],
    badge: '/badges/atletico.webp',
    season: '2024/25',
  },

  // La Liga - Real Sociedad
  {
    id: 'real-sociedad-1',
    team: 'Real Sociedad',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/real-sociedad/1/1.jpg',
    images: [
      '/images/la-liga/real-sociedad/1/1.jpg',
      '/images/la-liga/real-sociedad/1/2.jpg',
      '/images/la-liga/real-sociedad/1/3.jpg',
      '/images/la-liga/real-sociedad/1/4.jpg',
      '/images/la-liga/real-sociedad/1/5.jpg',
      '/images/la-liga/real-sociedad/1/6.jpg',
    ],
    badge: '/badges/real-sociedad.webp',
    season: '2024/25',
    isNew: true,
  },

  // Premier League - Manchester City
  {
    id: 'manchester-city-1',
    team: 'Manchester City',
    league: 'premier-league',
    price: 94.99,
    image: '/images/premier-league/manchester-city/1/1.jpg',
    images: [
      '/images/premier-league/manchester-city/1/1.jpg',
      '/images/premier-league/manchester-city/1/2.jpg',
      '/images/premier-league/manchester-city/1/3.jpg',
      '/images/premier-league/manchester-city/1/4.jpg',
      '/images/premier-league/manchester-city/1/5.jpg',
      '/images/premier-league/manchester-city/1/6.jpg',
    ],
    badge: '/badges/man-city.webp',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'manchester-city-2',
    team: 'Manchester City',
    league: 'premier-league',
    price: 94.99,
    image: '/images/premier-league/manchester-city/2/1.jpg',
    images: [
      '/images/premier-league/manchester-city/2/1.jpg',
      '/images/premier-league/manchester-city/2/2.jpg',
      '/images/premier-league/manchester-city/2/3.jpg',
      '/images/premier-league/manchester-city/2/4.jpg',
      '/images/premier-league/manchester-city/2/5.jpg',
    ],
    badge: '/badges/man-city.webp',
    season: '2024/25',
  },
  {
    id: 'manchester-city-3',
    team: 'Manchester City',
    league: 'premier-league',
    price: 94.99,
    image: '/images/premier-league/manchester-city/3/1.jpg',
    images: [
      '/images/premier-league/manchester-city/3/1.jpg',
      '/images/premier-league/manchester-city/3/2.jpg',
      '/images/premier-league/manchester-city/3/3.jpg',
      '/images/premier-league/manchester-city/3/4.jpg',
      '/images/premier-league/manchester-city/3/5.jpg',
      '/images/premier-league/manchester-city/3/6.jpg',
    ],
    badge: '/badges/man-city.webp',
    season: '2024/25',
  },
  {
    id: 'manchester-city-4',
    team: 'Manchester City',
    league: 'premier-league',
    price: 94.99,
    image: '/images/premier-league/manchester-city/4/1.jpg',
    images: [
      '/images/premier-league/manchester-city/4/1.jpg',
      '/images/premier-league/manchester-city/4/2.jpg',
      '/images/premier-league/manchester-city/4/3.jpg',
      '/images/premier-league/manchester-city/4/4.jpg',
      '/images/premier-league/manchester-city/4/5.jpg',
      '/images/premier-league/manchester-city/4/6.jpg',
    ],
    badge: '/badges/man-city.webp',
    season: '2024/25',
    isNew: true,
  },

  // Premier League - Arsenal FC
  {
    id: 'arsenal-1',
    team: 'Arsenal FC',
    league: 'premier-league',
    price: 89.99,
    image: '/images/premier-league/arsenal/1/1.jpg',
    images: [
      '/images/premier-league/arsenal/1/1.jpg',
      '/images/premier-league/arsenal/1/2.jpg',
      '/images/premier-league/arsenal/1/3.jpg',
      '/images/premier-league/arsenal/1/4.jpg',
      '/images/premier-league/arsenal/1/5.jpg',
      '/images/premier-league/arsenal/1/6.jpg',
    ],
    badge: '/badges/arsenal.webp',
    season: '2024/25',
  },
  {
    id: 'arsenal-2',
    team: 'Arsenal FC',
    league: 'premier-league',
    price: 89.99,
    image: '/images/premier-league/arsenal/2/1.jpg',
    images: [
      '/images/premier-league/arsenal/2/1.jpg',
      '/images/premier-league/arsenal/2/2.jpg',
      '/images/premier-league/arsenal/2/3.jpg',
      '/images/premier-league/arsenal/2/4.jpg',
      '/images/premier-league/arsenal/2/5.jpg',
    ],
    badge: '/badges/arsenal.webp',
    season: '2024/25',
  },

  // Premier League - Chelsea FC
  {
    id: 'chelsea-1',
    team: 'Chelsea FC',
    league: 'premier-league',
    price: 89.99,
    image: '/images/premier-league/chelsea/1/1.jpg',
    images: [
      '/images/premier-league/chelsea/1/1.jpg',
      '/images/premier-league/chelsea/1/2.jpg',
      '/images/premier-league/chelsea/1/3.jpg',
      '/images/premier-league/chelsea/1/4.jpg',
      '/images/premier-league/chelsea/1/5.jpg',
    ],
    badge: '/badges/chelsea.webp',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'chelsea-2',
    team: 'Chelsea FC',
    league: 'premier-league',
    price: 89.99,
    image: '/images/premier-league/chelsea/2/1.jpg',
    images: [
      '/images/premier-league/chelsea/2/1.jpg',
      '/images/premier-league/chelsea/2/2.jpg',
      '/images/premier-league/chelsea/2/3.jpg',
      '/images/premier-league/chelsea/2/4.jpg',
      '/images/premier-league/chelsea/2/5.jpg',
    ],
    badge: '/badges/chelsea.webp',
    season: '2024/25',
  },

  // Serie A - Inter Milan
  {
    id: 'inter-milan-1',
    team: 'Inter Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/images/serie-a/inter-milan/1/1.jpg',
    images: [
      '/images/serie-a/inter-milan/1/1.jpg',
      '/images/serie-a/inter-milan/1/2.jpg',
      '/images/serie-a/inter-milan/1/3.jpg',
      '/images/serie-a/inter-milan/1/4.jpg',
      '/images/serie-a/inter-milan/1/5.jpg',
    ],
    badge: '/badges/inter.webp',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'inter-milan-2',
    team: 'Inter Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/images/serie-a/inter-milan/2/1.jpg',
    images: [
      '/images/serie-a/inter-milan/2/1.jpg',
      '/images/serie-a/inter-milan/2/2.jpg',
      '/images/serie-a/inter-milan/2/3.jpg',
      '/images/serie-a/inter-milan/2/4.jpg',
      '/images/serie-a/inter-milan/2/5.jpg',
      '/images/serie-a/inter-milan/2/6.jpg',
    ],
    badge: '/badges/inter.webp',
    season: '2024/25',
  },

  // Serie A - AC Milan
  {
    id: 'ac-milan-1',
    team: 'AC Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/images/serie-a/ac-milan/1/1.jpg',
    images: [
      '/images/serie-a/ac-milan/1/1.jpg',
      '/images/serie-a/ac-milan/1/2.jpg',
      '/images/serie-a/ac-milan/1/3.jpg',
      '/images/serie-a/ac-milan/1/4.jpg',
      '/images/serie-a/ac-milan/1/5.jpg',
      '/images/serie-a/ac-milan/1/6.jpg',
      '/images/serie-a/ac-milan/1/7.jpg',
    ],
    badge: '/badges/ac-milan.webp',
    season: '2024/25',
  },
  {
    id: 'ac-milan-2',
    team: 'AC Milan',
    league: 'serie-a',
    price: 84.99,
    image: '/images/serie-a/ac-milan/2/1.jpg',
    images: [
      '/images/serie-a/ac-milan/2/1.jpg',
      '/images/serie-a/ac-milan/2/2.jpg',
      '/images/serie-a/ac-milan/2/3.jpg',
      '/images/serie-a/ac-milan/2/4.jpg',
      '/images/serie-a/ac-milan/2/5.jpg',
      '/images/serie-a/ac-milan/2/6.jpg',
    ],
    badge: '/badges/ac-milan.webp',
    season: '2024/25',
  },

  // Serie A - Juventus FC
  {
    id: 'juventus-1',
    team: 'Juventus FC',
    league: 'serie-a',
    price: 84.99,
    originalPrice: 99.99,
    image: '/images/serie-a/juventus/1/1.jpg',
    images: [
      '/images/serie-a/juventus/1/1.jpg',
      '/images/serie-a/juventus/1/2.jpg',
      '/images/serie-a/juventus/1/3.jpg',
      '/images/serie-a/juventus/1/4.jpg',
      '/images/serie-a/juventus/1/5.jpg',
      '/images/serie-a/juventus/1/6.jpg',
    ],
    badge: '/badges/juventus.webp',
    season: '2024/25',
  },

  // Serie A - SSC Napoli
  {
    id: 'napoli-1',
    team: 'SSC Napoli',
    league: 'serie-a',
    price: 79.99,
    image: '/images/serie-a/napoli/1/1.jpg',
    images: [
      '/images/serie-a/napoli/1/1.jpg',
      '/images/serie-a/napoli/1/2.jpg',
      '/images/serie-a/napoli/1/3.jpg',
      '/images/serie-a/napoli/1/4.jpg',
      '/images/serie-a/napoli/1/5.jpg',
    ],
    badge: '/badges/napoli.webp',
    season: '2024/25',
  },
  {
    id: 'napoli-2',
    team: 'SSC Napoli',
    league: 'serie-a',
    price: 79.99,
    image: '/images/serie-a/napoli/2/1.jpg',
    images: [
      '/images/serie-a/napoli/2/1.jpg',
      '/images/serie-a/napoli/2/2.jpg',
      '/images/serie-a/napoli/2/3.jpg',
      '/images/serie-a/napoli/2/4.jpg',
      '/images/serie-a/napoli/2/5.jpg',
    ],
    badge: '/badges/napoli.webp',
    season: '2024/25',
  },

  // Bundesliga - Bayern München
  {
    id: 'bayern-munich-1',
    team: 'Bayern München',
    league: 'bundesliga',
    price: 89.99,
    image: '/images/bundesliga/bayern-munich/1/1.jpg',
    images: [
      '/images/bundesliga/bayern-munich/1/1.jpg',
      '/images/bundesliga/bayern-munich/1/2.jpg',
      '/images/bundesliga/bayern-munich/1/3.jpg',
      '/images/bundesliga/bayern-munich/1/4.jpg',
      '/images/bundesliga/bayern-munich/1/5.jpg',
      '/images/bundesliga/bayern-munich/1/6.jpg',
    ],
    badge: '/badges/bayern.webp',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'bayern-munich-2',
    team: 'Bayern München',
    league: 'bundesliga',
    price: 89.99,
    image: '/images/bundesliga/bayern-munich/2/1.jpg',
    images: [
      '/images/bundesliga/bayern-munich/2/1.jpg',
      '/images/bundesliga/bayern-munich/2/2.jpg',
      '/images/bundesliga/bayern-munich/2/3.jpg',
      '/images/bundesliga/bayern-munich/2/4.jpg',
      '/images/bundesliga/bayern-munich/2/5.jpg',
    ],
    badge: '/badges/bayern.webp',
    season: '2024/25',
  },
  {
    id: 'bayern-munich-3',
    team: 'Bayern München',
    league: 'bundesliga',
    price: 89.99,
    image: '/images/bundesliga/bayern-munich/3/1.jpg',
    images: [
      '/images/bundesliga/bayern-munich/3/1.jpg',
      '/images/bundesliga/bayern-munich/3/2.jpg',
      '/images/bundesliga/bayern-munich/3/3.jpg',
      '/images/bundesliga/bayern-munich/3/4.jpg',
      '/images/bundesliga/bayern-munich/3/5.jpg',
    ],
    badge: '/badges/bayern.webp',
    season: '2024/25',
  },

  // Bundesliga - Borussia Dortmund
  {
    id: 'dortmund-1',
    team: 'Borussia Dortmund',
    league: 'bundesliga',
    price: 84.99,
    image: '/images/bundesliga/dortmund/1/1.jpg',
    images: [
      '/images/bundesliga/dortmund/1/1.jpg',
      '/images/bundesliga/dortmund/1/2.jpg',
      '/images/bundesliga/dortmund/1/3.jpg',
      '/images/bundesliga/dortmund/1/4.jpg',
      '/images/bundesliga/dortmund/1/5.jpg',
      '/images/bundesliga/dortmund/1/6.jpg',
    ],
    badge: '/badges/dortmund.webp',
    season: '2024/25',
  },
  {
    id: 'dortmund-2',
    team: 'Borussia Dortmund',
    league: 'bundesliga',
    price: 84.99,
    image: '/images/bundesliga/dortmund/2/1.jpg',
    images: [
      '/images/bundesliga/dortmund/2/1.jpg',
      '/images/bundesliga/dortmund/2/2.jpg',
      '/images/bundesliga/dortmund/2/3.jpg',
      '/images/bundesliga/dortmund/2/4.jpg',
      '/images/bundesliga/dortmund/2/5.jpg',
    ],
    badge: '/badges/dortmund.webp',
    season: '2024/25',
  },

  // Bundesliga - Bayer Leverkusen
  {
    id: 'leverkusen-1',
    team: 'Bayer Leverkusen',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/leverkusen/1/1.jpg',
    images: [
      '/images/bundesliga/leverkusen/1/1.jpg',
      '/images/bundesliga/leverkusen/1/2.jpg',
      '/images/bundesliga/leverkusen/1/3.jpg',
      '/images/bundesliga/leverkusen/1/4.jpg',
      '/images/bundesliga/leverkusen/1/5.jpg',
      '/images/bundesliga/leverkusen/1/6.jpg',
    ],
    badge: '/badges/leverkusen.webp',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'leverkusen-2',
    team: 'Bayer Leverkusen',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/leverkusen/2/1.jpg',
    images: [
      '/images/bundesliga/leverkusen/2/1.jpg',
      '/images/bundesliga/leverkusen/2/2.jpg',
      '/images/bundesliga/leverkusen/2/3.jpg',
      '/images/bundesliga/leverkusen/2/4.jpg',
      '/images/bundesliga/leverkusen/2/5.jpg',
      '/images/bundesliga/leverkusen/2/6.jpg',
    ],
    badge: '/badges/leverkusen.webp',
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
    season: '2024/25',
  },
  {
    id: 'psg-third',
    team: 'Paris Saint-Germain',
    league: 'ligue-1',
    price: 94.99,
    image: '/jerseys/psg-third.webp',
    badge: '/badges/psg.webp',
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
    season: '2024/25',
  },
  {
    id: 'marseille-away',
    team: 'Olympique de Marseille',
    league: 'ligue-1',
    price: 79.99,
    image: '/jerseys/marseille-away.webp',
    badge: '/badges/marseille.webp',
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
    season: '2024/25',
  },
  {
    id: 'palmeiras-away',
    team: 'Palmeiras',
    league: 'brasileirao',
    price: 74.99,
    image: '/jerseys/palmeiras-away.webp',
    badge: '/badges/palmeiras.webp',
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
    season: '2024/25',
  },
  {
    id: 'santos-away',
    team: 'Santos FC',
    league: 'brasileirao',
    price: 69.99,
    image: '/jerseys/santos-away.webp',
    badge: '/badges/santos.webp',
    season: '2024/25',
  },

  // LPF Argentina - Boca Juniors
  {
    id: 'boca-juniors-home',
    team: 'Boca Juniors',
    league: 'resto-de-ligas',
    price: 74.99,
    image: '/jerseys/boca-home.webp',
    badge: '/badges/boca.webp',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'boca-juniors-away',
    team: 'Boca Juniors',
    league: 'resto-de-ligas',
    price: 74.99,
    image: '/jerseys/boca-away.webp',
    badge: '/badges/boca.webp',
    season: '2024/25',
  },
  {
    id: 'boca-juniors-third',
    team: 'Boca Juniors',
    league: 'resto-de-ligas',
    price: 74.99,
    image: '/jerseys/boca-third.webp',
    badge: '/badges/boca.webp',
    season: '2024/25',
  },

  // LPF Argentina - River Plate
  {
    id: 'river-plate-home',
    team: 'River Plate',
    league: 'resto-de-ligas',
    price: 74.99,
    image: '/jerseys/river-home.webp',
    badge: '/badges/river.webp',
    season: '2024/25',
    isBestseller: true,
  },
  {
    id: 'river-plate-away',
    team: 'River Plate',
    league: 'resto-de-ligas',
    price: 74.99,
    image: '/jerseys/river-away.webp',
    badge: '/badges/river.webp',
    season: '2024/25',
  },
  {
    id: 'river-plate-third',
    team: 'River Plate',
    league: 'resto-de-ligas',
    price: 74.99,
    image: '/jerseys/river-third.webp',
    badge: '/badges/river.webp',
    season: '2024/25',
    isNew: true,
  },

  // LPF Argentina - Racing Club
  {
    id: 'racing-club-home',
    team: 'Racing Club',
    league: 'resto-de-ligas',
    price: 69.99,
    image: '/jerseys/racing-home.webp',
    badge: '/badges/racing.webp',
    season: '2024/25',
  },
  {
    id: 'racing-club-away',
    team: 'Racing Club',
    league: 'resto-de-ligas',
    price: 69.99,
    image: '/jerseys/racing-away.webp',
    badge: '/badges/racing.webp',
    season: '2024/25',
  },

  // LPF Argentina - Independiente
  {
    id: 'independiente-home',
    team: 'Independiente',
    league: 'resto-de-ligas',
    price: 69.99,
    image: '/jerseys/independiente-home.webp',
    badge: '/badges/independiente.webp',
    season: '2024/25',
    isNew: true,
  },
  {
    id: 'independiente-away',
    team: 'Independiente',
    league: 'resto-de-ligas',
    price: 69.99,
    image: '/jerseys/independiente-away.webp',
    badge: '/badges/independiente.webp',
    season: '2024/25',
  },

  // Selecciones - Argentina
  {
    id: 'argentina-1',
    team: 'Argentina',
    league: 'selecciones',
    price: 99.99,
    image: '/images/selecciones/argentina/1/1.jpg',
    images: [
      '/images/selecciones/argentina/1/1.jpg',
      '/images/selecciones/argentina/1/2.jpg',
      '/images/selecciones/argentina/1/3.jpg',
      '/images/selecciones/argentina/1/4.jpg',
      '/images/selecciones/argentina/1/5.jpg',
      '/images/selecciones/argentina/1/6.jpg',
      '/images/selecciones/argentina/1/7.jpg',
    ],
    badge: '/badges/argentina.webp',
    season: '2024/25',
    isBestseller: true,
  },

  // Selecciones - Brasil
  {
    id: 'brasil-1',
    team: 'Brasil',
    league: 'selecciones',
    price: 99.99,
    image: '/images/selecciones/brasil/1/1.jpg',
    images: [
      '/images/selecciones/brasil/1/1.jpg',
      '/images/selecciones/brasil/1/2.jpg',
      '/images/selecciones/brasil/1/3.jpg',
      '/images/selecciones/brasil/1/4.jpg',
      '/images/selecciones/brasil/1/5.jpg',
      '/images/selecciones/brasil/1/6.jpg',
    ],
    badge: '/badges/brasil.webp',
    season: '2024/25',
    isBestseller: true,
  },

  // Selecciones - España
  {
    id: 'espana-1',
    team: 'España',
    league: 'selecciones',
    price: 94.99,
    image: '/images/selecciones/espana/1/1.jpg',
    images: [
      '/images/selecciones/espana/1/1.jpg',
      '/images/selecciones/espana/1/2.jpg',
      '/images/selecciones/espana/1/3.jpg',
      '/images/selecciones/espana/1/4.jpg',
      '/images/selecciones/espana/1/5.jpg',
    ],
    badge: '/badges/espana.webp',
    season: '2024/25',
  },

  // Selecciones - Francia
  {
    id: 'francia-1',
    team: 'Francia',
    league: 'selecciones',
    price: 94.99,
    image: '/images/selecciones/francia/1/1.jpg',
    images: [
      '/images/selecciones/francia/1/1.jpg',
      '/images/selecciones/francia/1/2.jpg',
      '/images/selecciones/francia/1/3.jpg',
      '/images/selecciones/francia/1/4.jpg',
      '/images/selecciones/francia/1/5.jpg',
      '/images/selecciones/francia/1/6.jpg',
    ],
    badge: '/badges/francia.webp',
    season: '2024/25',
  },

  // Selecciones - Alemania
  {
    id: 'alemania-1',
    team: 'Alemania',
    league: 'selecciones',
    price: 94.99,
    image: '/images/selecciones/alemania/1/1.jpg',
    images: [
      '/images/selecciones/alemania/1/1.jpg',
      '/images/selecciones/alemania/1/2.jpg',
      '/images/selecciones/alemania/1/3.jpg',
      '/images/selecciones/alemania/1/4.jpg',
      '/images/selecciones/alemania/1/5.jpg',
      '/images/selecciones/alemania/1/6.jpg',
      '/images/selecciones/alemania/1/7.jpg',
    ],
    badge: '/badges/alemania.webp',
    season: '2024/25',
    isNew: true,
  },

  // Selecciones - Italia
  {
    id: 'italia-1',
    team: 'Italia',
    league: 'selecciones',
    price: 94.99,
    image: '/images/selecciones/italia/1/1.jpg',
    images: [
      '/images/selecciones/italia/1/1.jpg',
      '/images/selecciones/italia/1/2.jpg',
      '/images/selecciones/italia/1/3.jpg',
      '/images/selecciones/italia/1/4.jpg',
      '/images/selecciones/italia/1/5.jpg',
      '/images/selecciones/italia/1/6.jpg',
    ],
    badge: '/badges/italia.webp',
    season: '2024/25',
  },

  // Selecciones - Inglaterra
  {
    id: 'inglaterra-1',
    team: 'Inglaterra',
    league: 'selecciones',
    price: 94.99,
    image: '/images/selecciones/inglaterra/1/1.jpg',
    images: [
      '/images/selecciones/inglaterra/1/1.jpg',
      '/images/selecciones/inglaterra/1/2.jpg',
      '/images/selecciones/inglaterra/1/3.jpg',
      '/images/selecciones/inglaterra/1/4.jpg',
      '/images/selecciones/inglaterra/1/5.jpg',
      '/images/selecciones/inglaterra/1/6.jpg',
    ],
    badge: '/badges/inglaterra.webp',
    season: '2024/25',
  },

  // La Liga - Valencia
  {
    id: 'valencia-1',
    team: 'Valencia',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/valencia/1/1.jpg',
    images: [
      '/images/la-liga/valencia/1/1.jpg',
      '/images/la-liga/valencia/1/2.jpg',
      '/images/la-liga/valencia/1/3.jpg',
      '/images/la-liga/valencia/1/4.jpg',
      '/images/la-liga/valencia/1/5.jpg',
      '/images/la-liga/valencia/1/6.jpg',
    ],
    badge: '/badges/valencia.webp',
    season: '2024/25',
  },

  // La Liga - Oviedo
  {
    id: 'oviedo-1',
    team: 'Oviedo',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/oviedo/1/1.jpg',
    images: [
      '/images/la-liga/oviedo/1/1.jpg',
      '/images/la-liga/oviedo/1/2.jpg',
      '/images/la-liga/oviedo/1/3.jpg',
      '/images/la-liga/oviedo/1/4.jpg',
      '/images/la-liga/oviedo/1/5.jpg',
      '/images/la-liga/oviedo/1/6.jpg',
    ],
    badge: '/badges/oviedo.webp',
    season: '2024/25',
  },

  // La Liga - Real Betis
  {
    id: 'real-betis-1',
    team: 'Real Betis',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/real-betis/1/1.jpg',
    images: [
      '/images/la-liga/real-betis/1/1.jpg',
      '/images/la-liga/real-betis/1/2.jpg',
      '/images/la-liga/real-betis/1/3.jpg',
      '/images/la-liga/real-betis/1/4.jpg',
      '/images/la-liga/real-betis/1/5.jpg',
      '/images/la-liga/real-betis/1/6.jpg',
    ],
    badge: '/badges/real-betis.webp',
    season: '2024/25',
  },

  // La Liga - Tenerife
  {
    id: 'tenerife-1',
    team: 'Tenerife',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/tenerife/1/1.jpg',
    images: [
      '/images/la-liga/tenerife/1/1.jpg',
      '/images/la-liga/tenerife/1/2.jpg',
      '/images/la-liga/tenerife/1/3.jpg',
      '/images/la-liga/tenerife/1/4.jpg',
      '/images/la-liga/tenerife/1/5.jpg',
    ],
    badge: '/badges/tenerife.webp',
    season: '2024/25',
  },

  // La Liga - Sevilla
  {
    id: 'sevilla-1',
    team: 'Sevilla',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/sevilla/1/1.jpg',
    images: [
      '/images/la-liga/sevilla/1/1.jpg',
      '/images/la-liga/sevilla/1/2.jpg',
      '/images/la-liga/sevilla/1/3.jpg',
      '/images/la-liga/sevilla/1/4.jpg',
      '/images/la-liga/sevilla/1/5.jpg',
      '/images/la-liga/sevilla/1/6.jpg',
      '/images/la-liga/sevilla/1/7.jpg',
    ],
    badge: '/badges/sevilla.webp',
    season: '2024/25',
  },

  // La Liga - RCD Mallorca
  {
    id: 'rcd-mallorca-1',
    team: 'RCD Mallorca',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/rcd-mallorca/1/1.jpg',
    images: [
      '/images/la-liga/rcd-mallorca/1/1.jpg',
      '/images/la-liga/rcd-mallorca/1/2.jpg',
      '/images/la-liga/rcd-mallorca/1/3.jpg',
      '/images/la-liga/rcd-mallorca/1/4.jpg',
      '/images/la-liga/rcd-mallorca/1/5.jpg',
      '/images/la-liga/rcd-mallorca/1/6.jpg',
    ],
    badge: '/badges/rcd-mallorca.webp',
    season: '2024/25',
  },

  // La Liga - Málaga
  {
    id: 'malaga-1',
    team: 'Málaga',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/malaga/1/1.jpg',
    images: [
      '/images/la-liga/malaga/1/1.jpg',
      '/images/la-liga/malaga/1/2.jpg',
      '/images/la-liga/malaga/1/3.jpg',
      '/images/la-liga/malaga/1/4.jpg',
      '/images/la-liga/malaga/1/5.jpg',
      '/images/la-liga/malaga/1/6.jpg',
    ],
    badge: '/badges/malaga.webp',
    season: '2024/25',
  },

  // La Liga - Girona
  {
    id: 'girona-1',
    team: 'Girona',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/girona/1/1.jpg',
    images: [
      '/images/la-liga/girona/1/1.jpg',
      '/images/la-liga/girona/1/2.jpg',
      '/images/la-liga/girona/1/3.jpg',
      '/images/la-liga/girona/1/4.jpg',
      '/images/la-liga/girona/1/5.jpg',
      '/images/la-liga/girona/1/6.jpg',
      '/images/la-liga/girona/1/7.jpg',
    ],
    badge: '/badges/girona.webp',
    season: '2024/25',
  },

  // La Liga - Deportivo la Coruña
  {
    id: 'deportivo-la-coruna-1',
    team: 'Deportivo la Coruña',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/deportivo-la-coruna/1/1.jpg',
    images: [
      '/images/la-liga/deportivo-la-coruna/1/1.jpg',
      '/images/la-liga/deportivo-la-coruna/1/2.jpg',
      '/images/la-liga/deportivo-la-coruna/1/3.jpg',
      '/images/la-liga/deportivo-la-coruna/1/4.jpg',
      '/images/la-liga/deportivo-la-coruna/1/5.jpg',
      '/images/la-liga/deportivo-la-coruna/1/6.jpg',
    ],
    badge: '/badges/deportivo-la-coruna.webp',
    season: '2024/25',
  },

  // La Liga - Córdoba
  {
    id: 'cordoba-1',
    team: 'Córdoba',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/cordoba/1/1.jpg',
    images: [
      '/images/la-liga/cordoba/1/1.jpg',
      '/images/la-liga/cordoba/1/2.jpg',
      '/images/la-liga/cordoba/1/3.jpg',
      '/images/la-liga/cordoba/1/4.jpg',
      '/images/la-liga/cordoba/1/5.jpg',
    ],
    badge: '/badges/cordoba.webp',
    season: '2024/25',
  },

  // La Liga - Celta
  {
    id: 'celta-1',
    team: 'Celta',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/celta/1/1.jpg',
    images: [
      '/images/la-liga/celta/1/1.jpg',
      '/images/la-liga/celta/1/2.jpg',
      '/images/la-liga/celta/1/3.jpg',
      '/images/la-liga/celta/1/4.jpg',
      '/images/la-liga/celta/1/5.jpg',
      '/images/la-liga/celta/1/6.jpg',
    ],
    badge: '/badges/celta.webp',
    season: '2024/25',
  },

  // La Liga - Cádiz
  {
    id: 'cadiz-1',
    team: 'Cádiz',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/cadiz/1/1.jpg',
    images: [
      '/images/la-liga/cadiz/1/1.jpg',
      '/images/la-liga/cadiz/1/2.jpg',
      '/images/la-liga/cadiz/1/3.jpg',
      '/images/la-liga/cadiz/1/4.jpg',
      '/images/la-liga/cadiz/1/5.jpg',
      '/images/la-liga/cadiz/1/6.jpg',
    ],
    badge: '/badges/cadiz.webp',
    season: '2024/25',
  },

  // La Liga - Athletic Bilbao
  {
    id: 'athletic-bilbao-1',
    team: 'Athletic Bilbao',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/athletic-bilbao/1/1.jpg',
    images: [
      '/images/la-liga/athletic-bilbao/1/1.jpg',
      '/images/la-liga/athletic-bilbao/1/2.jpg',
      '/images/la-liga/athletic-bilbao/1/3.jpg',
      '/images/la-liga/athletic-bilbao/1/4.jpg',
      '/images/la-liga/athletic-bilbao/1/5.jpg',
      '/images/la-liga/athletic-bilbao/1/6.jpg',
    ],
    badge: '/badges/athletic-bilbao.webp',
    season: '2024/25',
  },

  // La Liga - Zaragoza
  {
    id: 'zaragoza-1',
    team: 'Zaragoza',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/zaragoza/1/1.jpg',
    images: [
      '/images/la-liga/zaragoza/1/1.jpg',
      '/images/la-liga/zaragoza/1/2.jpg',
      '/images/la-liga/zaragoza/1/3.jpg',
      '/images/la-liga/zaragoza/1/4.jpg',
      '/images/la-liga/zaragoza/1/5.jpg',
      '/images/la-liga/zaragoza/1/6.jpg',
    ],
    badge: '/badges/zaragoza.webp',
    season: '2024/25',
  },

  // La Liga - Racing de Santander
  {
    id: 'racing-de-santander-1',
    team: 'Racing de Santander',
    league: 'la-liga',
    price: 79.99,
    image: '/images/la-liga/racing-de-santander/1/1.jpg',
    images: [
      '/images/la-liga/racing-de-santander/1/1.jpg',
      '/images/la-liga/racing-de-santander/1/2.jpg',
      '/images/la-liga/racing-de-santander/1/3.jpg',
      '/images/la-liga/racing-de-santander/1/4.jpg',
      '/images/la-liga/racing-de-santander/1/5.jpg',
    ],
    badge: '/badges/racing-de-santander.webp',
    season: '2024/25',
  },

  // Premier League - Manchester United
  {
    id: 'manchester-united-1',
    team: 'Manchester United',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/manchester-united/1/1.jpg',
    images: [
      '/images/premier-league/manchester-united/1/1.jpg',
      '/images/premier-league/manchester-united/1/2.jpg',
      '/images/premier-league/manchester-united/1/3.jpg',
      '/images/premier-league/manchester-united/1/4.jpg',
      '/images/premier-league/manchester-united/1/5.jpg',
      '/images/premier-league/manchester-united/1/6.jpg',
    ],
    badge: '/badges/manchester-united.webp',
    season: '2024/25',
  },
  {
    id: 'manchester-united-2',
    team: 'Manchester United',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/manchester-united/2/1.jpg',
    images: [
      '/images/premier-league/manchester-united/2/1.jpg',
      '/images/premier-league/manchester-united/2/2.jpg',
      '/images/premier-league/manchester-united/2/3.jpg',
      '/images/premier-league/manchester-united/2/4.jpg',
      '/images/premier-league/manchester-united/2/5.jpg',
    ],
    badge: '/badges/manchester-united.webp',
    season: '2024/25',
  },

  // Premier League - Tottenham
  {
    id: 'tottenham-1',
    team: 'Tottenham',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/tottenham/1/1.jpg',
    images: [
      '/images/premier-league/tottenham/1/1.jpg',
      '/images/premier-league/tottenham/1/2.jpg',
      '/images/premier-league/tottenham/1/3.jpg',
      '/images/premier-league/tottenham/1/4.jpg',
      '/images/premier-league/tottenham/1/5.jpg',
      '/images/premier-league/tottenham/1/6.jpg',
    ],
    badge: '/badges/tottenham.webp',
    season: '2024/25',
  },

  // Premier League - Newcastle
  {
    id: 'newcastle-1',
    team: 'Newcastle',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/newcastle/1/1.jpg',
    images: [
      '/images/premier-league/newcastle/1/1.jpg',
      '/images/premier-league/newcastle/1/2.jpg',
      '/images/premier-league/newcastle/1/3.jpg',
      '/images/premier-league/newcastle/1/4.jpg',
      '/images/premier-league/newcastle/1/5.jpg',
      '/images/premier-league/newcastle/1/6.jpg',
    ],
    badge: '/badges/newcastle.webp',
    season: '2024/25',
  },

  // Premier League - Leeds United
  {
    id: 'leeds-united-1',
    team: 'Leeds United',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/leeds-united/1/1.jpg',
    images: [
      '/images/premier-league/leeds-united/1/1.jpg',
      '/images/premier-league/leeds-united/1/2.jpg',
      '/images/premier-league/leeds-united/1/3.jpg',
      '/images/premier-league/leeds-united/1/4.jpg',
      '/images/premier-league/leeds-united/1/5.jpg',
      '/images/premier-league/leeds-united/1/6.jpg',
    ],
    badge: '/badges/leeds-united.webp',
    season: '2024/25',
  },

  // Premier League - Everton
  {
    id: 'everton-1',
    team: 'Everton',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/everton/1/1.jpg',
    images: [
      '/images/premier-league/everton/1/1.jpg',
      '/images/premier-league/everton/1/2.jpg',
      '/images/premier-league/everton/1/3.jpg',
      '/images/premier-league/everton/1/4.jpg',
      '/images/premier-league/everton/1/5.jpg',
      '/images/premier-league/everton/1/6.jpg',
    ],
    badge: '/badges/everton.webp',
    season: '2024/25',
  },

  // Premier League - Brighton
  {
    id: 'brighton-1',
    team: 'Brighton',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/brighton/1/1.jpg',
    images: [
      '/images/premier-league/brighton/1/1.jpg',
      '/images/premier-league/brighton/1/2.jpg',
      '/images/premier-league/brighton/1/3.jpg',
      '/images/premier-league/brighton/1/4.jpg',
      '/images/premier-league/brighton/1/5.jpg',
      '/images/premier-league/brighton/1/6.jpg',
    ],
    badge: '/badges/brighton.webp',
    season: '2024/25',
  },

  // Premier League - Aston Villa
  {
    id: 'aston-villa-1',
    team: 'Aston Villa',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/aston-villa/1/1.jpg',
    images: [
      '/images/premier-league/aston-villa/1/1.jpg',
      '/images/premier-league/aston-villa/1/2.jpg',
      '/images/premier-league/aston-villa/1/3.jpg',
      '/images/premier-league/aston-villa/1/4.jpg',
      '/images/premier-league/aston-villa/1/5.jpg',
    ],
    badge: '/badges/aston-villa.webp',
    season: '2024/25',
  },
  {
    id: 'aston-villa-2',
    team: 'Aston Villa',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/aston-villa/2/1.jpg',
    images: [
      '/images/premier-league/aston-villa/2/1.jpg',
      '/images/premier-league/aston-villa/2/2.jpg',
      '/images/premier-league/aston-villa/2/3.jpg',
      '/images/premier-league/aston-villa/2/4.jpg',
      '/images/premier-league/aston-villa/2/5.jpg',
    ],
    badge: '/badges/aston-villa.webp',
    season: '2024/25',
  },
  {
    id: 'aston-villa-3',
    team: 'Aston Villa',
    league: 'premier-league',
    price: 84.99,
    image: '/images/premier-league/aston-villa/3/1.jpg',
    images: [
      '/images/premier-league/aston-villa/3/1.jpg',
      '/images/premier-league/aston-villa/3/2.jpg',
      '/images/premier-league/aston-villa/3/3.jpg',
      '/images/premier-league/aston-villa/3/4.jpg',
      '/images/premier-league/aston-villa/3/5.jpg',
      '/images/premier-league/aston-villa/3/6.jpg',
    ],
    badge: '/badges/aston-villa.webp',
    season: '2024/25',
    isNew: true,
  },

  // Bundesliga - Schalke 04
  {
    id: 'schalke-04-1',
    team: 'Schalke 04',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/schalke-04/1/1.jpg',
    images: [
      '/images/bundesliga/schalke-04/1/1.jpg',
      '/images/bundesliga/schalke-04/1/2.jpg',
      '/images/bundesliga/schalke-04/1/3.jpg',
      '/images/bundesliga/schalke-04/1/4.jpg',
      '/images/bundesliga/schalke-04/1/5.jpg',
    ],
    badge: '/badges/schalke-04.webp',
    season: '2024/25',
  },

  // Bundesliga - RB Leipzig
  {
    id: 'rb-leipzig-1',
    team: 'RB Leipzig',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/rb-leipzig/1/1.jpg',
    images: [
      '/images/bundesliga/rb-leipzig/1/1.jpg',
      '/images/bundesliga/rb-leipzig/1/2.jpg',
      '/images/bundesliga/rb-leipzig/1/3.jpg',
      '/images/bundesliga/rb-leipzig/1/4.jpg',
      '/images/bundesliga/rb-leipzig/1/5.jpg',
    ],
    badge: '/badges/rb-leipzig.webp',
    season: '2024/25',
  },

  // Bundesliga - Wolfsburg
  {
    id: 'wolfsburg-1',
    team: 'Wolfsburg',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/wolfsburg/1/1.jpg',
    images: [
      '/images/bundesliga/wolfsburg/1/1.jpg',
      '/images/bundesliga/wolfsburg/1/2.jpg',
      '/images/bundesliga/wolfsburg/1/3.jpg',
      '/images/bundesliga/wolfsburg/1/4.jpg',
      '/images/bundesliga/wolfsburg/1/5.jpg',
      '/images/bundesliga/wolfsburg/1/6.jpg',
    ],
    badge: '/badges/wolfsburg.webp',
    season: '2024/25',
  },

  // Bundesliga - Eintracht Frankfurt
  {
    id: 'eintracht-frankfurt-1',
    team: 'Eintracht Frankfurt',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/eintracht-frankfurt/1/1.jpg',
    images: [
      '/images/bundesliga/eintracht-frankfurt/1/1.jpg',
      '/images/bundesliga/eintracht-frankfurt/1/2.jpg',
      '/images/bundesliga/eintracht-frankfurt/1/3.jpg',
      '/images/bundesliga/eintracht-frankfurt/1/4.jpg',
      '/images/bundesliga/eintracht-frankfurt/1/5.jpg',
    ],
    badge: '/badges/eintracht-frankfurt.webp',
    season: '2024/25',
  },

  // Bundesliga - Borussia Mönchengladbach
  {
    id: 'borussia-monchengladbach-1',
    team: 'Borussia Mönchengladbach',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/borussia-monchengladbach/1/1.jpg',
    images: [
      '/images/bundesliga/borussia-monchengladbach/1/1.jpg',
      '/images/bundesliga/borussia-monchengladbach/1/2.jpg',
      '/images/bundesliga/borussia-monchengladbach/1/3.jpg',
      '/images/bundesliga/borussia-monchengladbach/1/4.jpg',
      '/images/bundesliga/borussia-monchengladbach/1/5.jpg',
    ],
    badge: '/badges/borussia-monchengladbach.webp',
    season: '2024/25',
  },
  {
    id: 'borussia-monchengladbach-2',
    team: 'Borussia Mönchengladbach',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/borussia-monchengladbach/2/1.jpg',
    images: [
      '/images/bundesliga/borussia-monchengladbach/2/1.jpg',
      '/images/bundesliga/borussia-monchengladbach/2/2.jpg',
      '/images/bundesliga/borussia-monchengladbach/2/3.jpg',
      '/images/bundesliga/borussia-monchengladbach/2/4.jpg',
      '/images/bundesliga/borussia-monchengladbach/2/5.jpg',
    ],
    badge: '/badges/borussia-monchengladbach.webp',
    season: '2024/25',
  },

  // Bundesliga - Stuttgart
  {
    id: 'stuttgart-1',
    team: 'Stuttgart',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/stuttgart/1/1.jpg',
    images: [
      '/images/bundesliga/stuttgart/1/1.jpg',
      '/images/bundesliga/stuttgart/1/2.jpg',
      '/images/bundesliga/stuttgart/1/3.jpg',
      '/images/bundesliga/stuttgart/1/4.jpg',
      '/images/bundesliga/stuttgart/1/5.jpg',
    ],
    badge: '/badges/stuttgart.webp',
    season: '2024/25',
  },
  {
    id: 'stuttgart-2',
    team: 'Stuttgart',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/stuttgart/2/1.jpg',
    images: [
      '/images/bundesliga/stuttgart/2/1.jpg',
      '/images/bundesliga/stuttgart/2/2.jpg',
      '/images/bundesliga/stuttgart/2/3.jpg',
      '/images/bundesliga/stuttgart/2/4.jpg',
      '/images/bundesliga/stuttgart/2/5.jpg',
    ],
    badge: '/badges/stuttgart.webp',
    season: '2024/25',
  },

  // Bundesliga - FC Union Berlin
  {
    id: 'fc-union-berlin-1',
    team: 'FC Union Berlin',
    league: 'bundesliga',
    price: 79.99,
    image: '/images/bundesliga/fc-union-berlin/1/1.jpg',
    images: [
      '/images/bundesliga/fc-union-berlin/1/1.jpg',
      '/images/bundesliga/fc-union-berlin/1/2.jpg',
      '/images/bundesliga/fc-union-berlin/1/3.jpg',
      '/images/bundesliga/fc-union-berlin/1/4.jpg',
      '/images/bundesliga/fc-union-berlin/1/5.jpg',
    ],
    badge: '/badges/fc-union-berlin.webp',
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
    season: '2024/25',
  },

  // Serie A - Roma
  {
    id: 'roma-1',
    team: 'Roma',
    league: 'serie-a',
    price: 79.99,
    image: '/images/serie-a/roma/1/1.jpg',
    images: [
      '/images/serie-a/roma/1/1.jpg',
      '/images/serie-a/roma/1/2.jpg',
      '/images/serie-a/roma/1/3.jpg',
      '/images/serie-a/roma/1/4.jpg',
      '/images/serie-a/roma/1/5.jpg',
      '/images/serie-a/roma/1/6.jpg',
    ],
    badge: '/badges/roma.webp',
    season: '2024/25',
  },
  {
    id: 'roma-2',
    team: 'Roma',
    league: 'serie-a',
    price: 79.99,
    image: '/images/serie-a/roma/2/1.jpg',
    images: [
      '/images/serie-a/roma/2/1.jpg',
      '/images/serie-a/roma/2/2.jpg',
      '/images/serie-a/roma/2/3.jpg',
      '/images/serie-a/roma/2/4.jpg',
      '/images/serie-a/roma/2/5.jpg',
      '/images/serie-a/roma/2/6.jpg',
    ],
    badge: '/badges/roma.webp',
    season: '2024/25',
  },

  // Serie A - Fiorentina
  {
    id: 'fiorentina-1',
    team: 'Fiorentina',
    league: 'serie-a',
    price: 79.99,
    image: '/images/serie-a/fiorentina/1/1.jpg',
    images: [
      '/images/serie-a/fiorentina/1/1.jpg',
      '/images/serie-a/fiorentina/1/2.jpg',
      '/images/serie-a/fiorentina/1/3.jpg',
      '/images/serie-a/fiorentina/1/4.jpg',
      '/images/serie-a/fiorentina/1/5.jpg',
      '/images/serie-a/fiorentina/1/6.jpg',
      '/images/serie-a/fiorentina/1/7.jpg',
      '/images/serie-a/fiorentina/1/8.jpg',
    ],
    badge: '/badges/fiorentina.webp',
    season: '2024/25',
  },

  // Serie A - Atalanta
  {
    id: 'atalanta-1',
    team: 'Atalanta',
    league: 'serie-a',
    price: 79.99,
    image: '/images/serie-a/atalanta/1/1.jpg',
    images: [
      '/images/serie-a/atalanta/1/1.jpg',
      '/images/serie-a/atalanta/1/2.jpg',
      '/images/serie-a/atalanta/1/3.jpg',
      '/images/serie-a/atalanta/1/4.jpg',
      '/images/serie-a/atalanta/1/5.jpg',
      '/images/serie-a/atalanta/1/6.jpg',
    ],
    badge: '/badges/atalanta.webp',
    season: '2024/25',
  },

  // Serie A - Lazio
  {
    id: 'lazio-1',
    team: 'Lazio',
    league: 'serie-a',
    price: 79.99,
    image: '/images/serie-a/lazio/1/1.jpg',
    images: [
      '/images/serie-a/lazio/1/1.jpg',
      '/images/serie-a/lazio/1/2.jpg',
      '/images/serie-a/lazio/1/3.jpg',
      '/images/serie-a/lazio/1/4.jpg',
      '/images/serie-a/lazio/1/5.jpg',
      '/images/serie-a/lazio/1/6.jpg',
    ],
    badge: '/badges/lazio.webp',
    season: '2024/25',
  },

  // Serie A - Parma
  {
    id: 'parma-1',
    team: 'Parma',
    league: 'serie-a',
    price: 79.99,
    image: '/images/serie-a/parma/1/1.jpg',
    images: [
      '/images/serie-a/parma/1/1.jpg',
      '/images/serie-a/parma/1/2.jpg',
      '/images/serie-a/parma/1/3.jpg',
      '/images/serie-a/parma/1/4.jpg',
      '/images/serie-a/parma/1/5.jpg',
    ],
    badge: '/badges/parma.webp',
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
    season: '2024/25',
  },

  // Selecciones - Noruega
  {
    id: 'noruega-1',
    team: 'Noruega',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/noruega/1/1.jpg',
    images: [
      '/images/selecciones/noruega/1/1.jpg',
      '/images/selecciones/noruega/1/2.jpg',
      '/images/selecciones/noruega/1/3.jpg',
      '/images/selecciones/noruega/1/4.jpg',
      '/images/selecciones/noruega/1/5.jpg',
      '/images/selecciones/noruega/1/6.jpg',
    ],
    badge: '/badges/noruega.webp',
    season: '2024/25',
  },

  // Selecciones - Bolivia
  {
    id: 'bolivia-1',
    team: 'Bolivia',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/bolivia/1/1.jpg',
    images: [
      '/images/selecciones/bolivia/1/1.jpg',
      '/images/selecciones/bolivia/1/2.jpg',
      '/images/selecciones/bolivia/1/3.jpg',
      '/images/selecciones/bolivia/1/4.jpg',
      '/images/selecciones/bolivia/1/5.jpg',
    ],
    badge: '/badges/bolivia.webp',
    season: '2024/25',
  },

  // Selecciones - México
  {
    id: 'mexico-1',
    team: 'México',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/mexico/1/1.jpg',
    images: [
      '/images/selecciones/mexico/1/1.jpg',
      '/images/selecciones/mexico/1/2.jpg',
      '/images/selecciones/mexico/1/3.jpg',
      '/images/selecciones/mexico/1/4.jpg',
      '/images/selecciones/mexico/1/5.jpg',
      '/images/selecciones/mexico/1/6.jpg',
    ],
    badge: '/badges/mexico.webp',
    season: '2024/25',
  },

  // Selecciones - Japón
  {
    id: 'japon-1',
    team: 'Japón',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/japon/1/1.jpg',
    images: [
      '/images/selecciones/japon/1/1.jpg',
      '/images/selecciones/japon/1/2.jpg',
      '/images/selecciones/japon/1/3.jpg',
      '/images/selecciones/japon/1/4.jpg',
      '/images/selecciones/japon/1/5.jpg',
      '/images/selecciones/japon/1/6.jpg',
    ],
    badge: '/badges/japon.webp',
    season: '2024/25',
  },

  // Selecciones - Colombia
  {
    id: 'colombia-1',
    team: 'Colombia',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/colombia/1/1.jpg',
    images: [
      '/images/selecciones/colombia/1/1.jpg',
      '/images/selecciones/colombia/1/2.jpg',
      '/images/selecciones/colombia/1/3.jpg',
      '/images/selecciones/colombia/1/4.jpg',
      '/images/selecciones/colombia/1/5.jpg',
      '/images/selecciones/colombia/1/6.jpg',
    ],
    badge: '/badges/colombia.webp',
    season: '2024/25',
  },

  // Selecciones - Holanda
  {
    id: 'holanda-1',
    team: 'Holanda',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/holanda/1/1.jpg',
    images: [
      '/images/selecciones/holanda/1/1.jpg',
      '/images/selecciones/holanda/1/2.jpg',
      '/images/selecciones/holanda/1/3.jpg',
      '/images/selecciones/holanda/1/4.jpg',
      '/images/selecciones/holanda/1/5.jpg',
    ],
    badge: '/badges/holanda.webp',
    season: '2024/25',
  },

  // Selecciones - Jamaica
  {
    id: 'jamaica-1',
    team: 'Jamaica',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/jamaica/1/1.jpg',
    images: [
      '/images/selecciones/jamaica/1/1.jpg',
      '/images/selecciones/jamaica/1/2.jpg',
      '/images/selecciones/jamaica/1/3.jpg',
      '/images/selecciones/jamaica/1/4.jpg',
      '/images/selecciones/jamaica/1/5.jpg',
    ],
    badge: '/badges/jamaica.webp',
    season: '2024/25',
  },

  // Selecciones - EEUU
  {
    id: 'eeuu-1',
    team: 'EEUU',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/eeuu/1/1.jpg',
    images: [
      '/images/selecciones/eeuu/1/1.jpg',
      '/images/selecciones/eeuu/1/2.jpg',
      '/images/selecciones/eeuu/1/3.jpg',
      '/images/selecciones/eeuu/1/4.jpg',
      '/images/selecciones/eeuu/1/5.jpg',
    ],
    badge: '/badges/eeuu.webp',
    season: '2024/25',
  },

  // Selecciones - Portugal
  {
    id: 'portugal-1',
    team: 'Portugal',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/portugal/1/1.jpg',
    images: [
      '/images/selecciones/portugal/1/1.jpg',
      '/images/selecciones/portugal/1/2.jpg',
      '/images/selecciones/portugal/1/3.jpg',
      '/images/selecciones/portugal/1/4.jpg',
      '/images/selecciones/portugal/1/5.jpg',
      '/images/selecciones/portugal/1/6.jpg',
    ],
    badge: '/badges/portugal.webp',
    season: '2024/25',
  },

  // Selecciones - Perú
  {
    id: 'peru-1',
    team: 'Perú',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/peru/1/1.jpg',
    images: [
      '/images/selecciones/peru/1/1.jpg',
      '/images/selecciones/peru/1/2.jpg',
      '/images/selecciones/peru/1/3.jpg',
      '/images/selecciones/peru/1/4.jpg',
      '/images/selecciones/peru/1/5.jpg',
    ],
    badge: '/badges/peru.webp',
    season: '2024/25',
  },

  // Selecciones - Suecia
  {
    id: 'suecia-1',
    team: 'Suecia',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/suecia/1/1.jpg',
    images: [
      '/images/selecciones/suecia/1/1.jpg',
      '/images/selecciones/suecia/1/2.jpg',
      '/images/selecciones/suecia/1/3.jpg',
      '/images/selecciones/suecia/1/4.jpg',
      '/images/selecciones/suecia/1/5.jpg',
    ],
    badge: '/badges/suecia.webp',
    season: '2024/25',
  },

  // Selecciones - Grecia
  {
    id: 'grecia-1',
    team: 'Grecia',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/grecia/1/1.jpg',
    images: [
      '/images/selecciones/grecia/1/1.jpg',
      '/images/selecciones/grecia/1/2.jpg',
      '/images/selecciones/grecia/1/3.jpg',
      '/images/selecciones/grecia/1/4.jpg',
      '/images/selecciones/grecia/1/5.jpg',
      '/images/selecciones/grecia/1/6.jpg',
      '/images/selecciones/grecia/1/7.jpg',
    ],
    badge: '/badges/grecia.webp',
    season: '2024/25',
  },

  // Selecciones - Venezuela
  {
    id: 'venezuela-1',
    team: 'Venezuela',
    league: 'selecciones',
    price: 89.99,
    image: '/images/selecciones/venezuela/1/1.jpg',
    images: [
      '/images/selecciones/venezuela/1/1.jpg',
      '/images/selecciones/venezuela/1/2.jpg',
      '/images/selecciones/venezuela/1/3.jpg',
      '/images/selecciones/venezuela/1/4.jpg',
      '/images/selecciones/venezuela/1/5.jpg',
      '/images/selecciones/venezuela/1/6.jpg',
    ],
    badge: '/badges/venezuela.webp',
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
