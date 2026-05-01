import { AppLayout } from '@/shared/components/layouts';
import { AppProvider } from '@/shared/providers';
import { getUser, isAdmin } from '@/shared/auth';
import { PageTracker } from '@/features/analytics/page-tracker';

export default async function AppRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  // Check if user is admin
  const userIsAdmin = user ? await isAdmin() : false;

  return (
    <AppProvider
      initialState={{
        user: user
          ? {
              id: user.id,
              email: user.email,
              avatar_url: user.avatar,
            }
          : null,
        subscription: null,
        credits: 0,
      }}
    >
      <AppLayout
        user={{
          email: user?.email,
          avatar_url: user?.avatar,
        }}
        isAdmin={userIsAdmin}
      >
        <PageTracker userId={user?.id} />
        {children}
      </AppLayout>
    </AppProvider>
  );
}
