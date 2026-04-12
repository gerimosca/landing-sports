import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.returns' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function ReturnsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'legal.returns' });

  return (
    <div className="container max-w-4xl py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        {t('title')}
      </h1>

      <div className="space-y-10 text-zinc-300">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.returns.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.returns.p1')}</p>
            <p>{t('sections.returns.p2')}</p>
            <p>{t('sections.returns.p3')}</p>
            <p>{t('sections.returns.p4')}</p>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.cancellation.title')}
          </h2>
          <p className="text-sm leading-relaxed">{t('sections.cancellation.content')}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.refund.title')}
          </h2>
          <p className="text-sm leading-relaxed">{t('sections.refund.content')}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.shippingCosts.title')}
          </h2>
          <p className="text-sm leading-relaxed">{t('sections.shippingCosts.content')}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
            {t('sections.unclaimed.title')}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>{t('sections.unclaimed.p1')}</p>
            <p>{t('sections.unclaimed.p2')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
