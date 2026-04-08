import { getTranslations } from 'next-intl/server';
import {
  PromoBanner,
  JerseyGrid,
  NewsletterSection,
} from '@/features/jerseys';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.landing' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function HomePage() {
  return (
    <>
      <JerseyGrid />
      <PromoBanner />
      <NewsletterSection />
    </>
  );
}
