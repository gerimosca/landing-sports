import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { brand } from '@/shared/config/brand';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function TermsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  return (
    <div className="container max-w-4xl py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        {t('title')}
      </h1>

      <div className="space-y-10 text-zinc-300">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.intro.title')}
          </h2>
          <p className="text-sm leading-relaxed">
            {t('sections.intro.content', { companyName: brand.name })}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.service.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.service.intro')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.service.items.harm')}</li>
              <li>{t('sections.service.items.abuse')}</li>
              <li>{t('sections.service.items.spam')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.liability.title')}
          </h2>
          <p className="text-sm leading-relaxed">
            {t('sections.liability.content', { companyName: brand.name })}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.changes.title')}
          </h2>
          <p className="text-sm leading-relaxed">{t('sections.changes.content')}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.contact.title')}
          </h2>
          <p className="text-sm leading-relaxed">
            {t('sections.contact.content')}{' '}
            <a
              href={`mailto:${brand.support}`}
              className="text-primary hover:underline"
            >
              {brand.support}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
