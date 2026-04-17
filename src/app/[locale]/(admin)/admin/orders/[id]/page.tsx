import { requireAdmin } from '@/shared/auth';
import { getOrderWithItems } from '@/features/orders';
import { OrderDetail } from '@/features/orders/components/order-detail';
import { notFound } from 'next/navigation';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Order Detail - Admin',
};

export default async function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  await requireAdmin();

  const { id } = await params;
  const { data: order } = await getOrderWithItems(id);

  if (!order) {
    notFound();
  }

  return <OrderDetail order={order} />;
}
