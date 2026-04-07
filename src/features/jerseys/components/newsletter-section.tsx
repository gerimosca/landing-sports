'use client';

import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export function NewsletterSection() {
  const t = useTranslations('jerseys');

  return (
    <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {t('newsletter.title')}
          </h2>
          <p className="mt-4 text-zinc-400">
            {t('newsletter.description')}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-primary focus:ring-primary"
              required
              aria-label={t('newsletter.placeholder')}
            />
            <Button
              type="submit"
              className="bg-primary text-black font-bold hover:bg-primary/90"
            >
              <Send className="h-4 w-4 mr-2" />
              {t('newsletter.submit')}
            </Button>
          </form>
          <p className="mt-3 text-xs text-zinc-600">
            {t('newsletter.privacy')}
          </p>
        </div>
      </div>
    </section>
  );
}
