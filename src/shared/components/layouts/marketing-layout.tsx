'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ShoppingBag } from 'lucide-react';
import { CartIcon } from '@/features/cart';
import { SkipLink } from '@/shared/components/ui/skip-link';
import { brand } from '@/shared/config';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const switchLocale = (newLocale: string) => {
    // Replace /en/ or /es/ at the start of the path
    return pathname.replace(`/${locale}`, `/${newLocale}`);
  };

  return (
    <>
      <SkipLink />
      <div className="flex min-h-screen flex-col bg-black">
        {/* Top promo bar */}
        <div className="bg-primary text-black text-center py-2 text-xs sm:text-sm font-semibold tracking-wide">
          {locale === 'es'
            ? '3x2 EN TODAS LAS CAMISETAS + ENVÍO GRATUITO'
            : '3 FOR 2 ON ALL JERSEYS + FREE SHIPPING'}
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 text-white font-black text-xl tracking-tight"
            >
              <ShoppingBag className="h-6 w-6 text-primary" />
              {brand.name}
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <Link
                href={switchLocale('en')}
                className={`text-xs font-bold px-1.5 py-0.5 rounded transition-opacity ${locale === 'en' ? 'text-white opacity-100' : 'text-zinc-500 opacity-60 hover:opacity-90'}`}
                aria-label="English"
              >
                GB
              </Link>
              <Link
                href={switchLocale('es')}
                className={`text-xs font-bold px-1.5 py-0.5 rounded transition-opacity ${locale === 'es' ? 'text-white opacity-100' : 'text-zinc-500 opacity-60 hover:opacity-90'}`}
                aria-label="Español"
              >
                ES
              </Link>

              <CartIcon />
            </div>
          </div>
        </header>

        {/* Main */}
        <main id="main-content" className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-zinc-800/50 bg-black py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 text-white font-black text-lg">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  {brand.name}
                </div>
                <p className="mt-3 text-sm text-zinc-500 max-w-xs">
                  {locale === 'es'
                    ? 'Camisetas de fútbol originales de las mejores ligas del mundo.'
                    : 'Original football jerseys from the best leagues in the world.'}
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  {locale === 'es' ? 'Enlaces' : 'Links'}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href={`/${locale}/privacy`} className="text-sm text-zinc-500 hover:text-primary transition-colors">
                      {locale === 'es' ? 'Privacidad' : 'Privacy'}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/terms`} className="text-sm text-zinc-500 hover:text-primary transition-colors">
                      {locale === 'es' ? 'Términos' : 'Terms'}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  {locale === 'es' ? 'Contacto' : 'Contact'}
                </h3>
                <p className="text-sm text-zinc-500">{brand.support}</p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-800/50 text-center">
              <p className="text-sm text-zinc-600">
                {brand.copyright}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
