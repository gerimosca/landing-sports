import { MarketingLayout } from '@/shared/components/layouts';
import { PageTracker } from '@/features/analytics/page-tracker';

export default function MarketingRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketingLayout>
      <PageTracker userId={null} />
      {children}
    </MarketingLayout>
  );
}
