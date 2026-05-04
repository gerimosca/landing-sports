import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // TODO: Re-enable after fixing all route references
  // typedRoutes: true,

  // Disable Vercel image optimization: we pre-generate responsive WebP variants
  // via `npm run optimize:images` and serve them as static assets to stay
  // within Vercel's free tier (no Image Optimization cache reads consumed).
  images: {
    unoptimized: true,
  },

  // Optimize logging for reduced output
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  // Webpack optimization for minimal build output
  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      config.stats = 'errors-only';
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
