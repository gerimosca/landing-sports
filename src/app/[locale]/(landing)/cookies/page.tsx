import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { brand } from '@/shared/config/brand';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.cookies' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function CookiesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'legal.cookies' });

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
            {t('sections.necessary.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.necessary.description')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.necessary.items.session')}</li>
              <li>{t('sections.necessary.items.auth')}</li>
              <li>{t('sections.necessary.items.preferences')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.analytics.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.analytics.description')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.analytics.items.usage')}</li>
              <li>{t('sections.analytics.items.performance')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.marketing.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.marketing.description')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.marketing.items.googleAds')}</li>
              <li>{t('sections.marketing.items.metaPixel')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.manage.title')}
          </h2>
          <p className="text-sm leading-relaxed">{t('sections.manage.content')}</p>
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
