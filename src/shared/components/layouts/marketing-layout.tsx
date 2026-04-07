'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { SkipLink } from '@/shared/components/ui/skip-link';
import { brand } from '@/shared/config';
import { cn } from '@/shared/lib/utils';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  const t = useTranslations('jerseys.nav');
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <SkipLink />
      <div className="flex min-h-screen flex-col bg-black">
        {/* Top promo bar */}
        <div className="bg-primary text-black text-center py-2 text-xs sm:text-sm font-semibold tracking-wide">
          {locale === 'es'
            ? 'ENVÍO GRATIS en pedidos superiores a $100'
            : 'FREE SHIPPING on orders over $100'}
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

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {t('home')}
              </Link>
              <Link
                href={`/${locale}#catalog`}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {t('catalog')}
              </Link>
              <Link
                href={`/${locale}#catalog`}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {t('leagues')}
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="hidden sm:inline-flex bg-primary text-black font-bold hover:bg-primary/90"
                asChild
              >
                <Link href={`/${locale}#catalog`}>
                  <ShoppingBag className="h-4 w-4 mr-1.5" />
                  {t('catalog')}
                </Link>
              </Button>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-zinc-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-zinc-800 bg-black">
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white py-2"
                >
                  {t('home')}
                </Link>
                <Link
                  href={`/${locale}#catalog`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white py-2"
                >
                  {t('catalog')}
                </Link>
                <Link
                  href={`/${locale}#catalog`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white py-2"
                >
                  {t('leagues')}
                </Link>
              </nav>
            </div>
          )}
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
                    <Link href={`/${locale}`} className="text-sm text-zinc-500 hover:text-primary transition-colors">
                      {t('home')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}#catalog`} className="text-sm text-zinc-500 hover:text-primary transition-colors">
                      {t('catalog')}
                    </Link>
                  </li>
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
