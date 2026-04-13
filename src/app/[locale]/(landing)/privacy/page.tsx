import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { brand } from '@/shared/config/brand';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

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
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.intro.p1')}</p>
            <p>{t('sections.intro.p2')}</p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.dataCollection.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.dataCollection.intro')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.dataCollection.items.identity')}</li>
              <li>{t('sections.dataCollection.items.shipping')}</li>
              <li>{t('sections.dataCollection.items.payment')}</li>
              <li>{t('sections.dataCollection.items.order')}</li>
              <li>{t('sections.dataCollection.items.customization')}</li>
              <li>{t('sections.dataCollection.items.technical')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.dataUsage.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.dataUsage.intro')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.dataUsage.items.order')}</li>
              <li>{t('sections.dataUsage.items.support')}</li>
              <li>{t('sections.dataUsage.items.improve')}</li>
              <li>{t('sections.dataUsage.items.marketing')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.legalBasis.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.legalBasis.intro')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.legalBasis.items.contract')}</li>
              <li>{t('sections.legalBasis.items.consent')}</li>
              <li>{t('sections.legalBasis.items.interest')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.dataSharing.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.dataSharing.intro')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.dataSharing.items.payment')}</li>
              <li>{t('sections.dataSharing.items.shipping')}</li>
              <li>{t('sections.dataSharing.items.hosting')}</li>
              <li>{t('sections.dataSharing.items.legal')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.retention.title')}
          </h2>
          <p className="text-sm leading-relaxed">{t('sections.retention.content')}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.yourRights.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.yourRights.intro')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('sections.yourRights.rights.access')}</li>
              <li>{t('sections.yourRights.rights.rectification')}</li>
              <li>{t('sections.yourRights.rights.erasure')}</li>
              <li>{t('sections.yourRights.rights.portability')}</li>
              <li>{t('sections.yourRights.rights.objection')}</li>
              <li>{t('sections.yourRights.rights.withdrawal')}</li>
              <li>{t('sections.yourRights.rights.complaint')}</li>
            </ul>
            <p>
              {t('sections.yourRights.contact')}{' '}
              <a
                href={`mailto:${brand.support}`}
                className="text-primary hover:underline"
              >
                {brand.support}
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.cookies.title')}
          </h2>
          <p className="text-sm leading-relaxed">{t('sections.cookies.content')}</p>
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
