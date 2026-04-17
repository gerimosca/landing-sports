import { requireAdmin } from '@/shared/auth';
import { listOrders } from '@/features/orders';
import { OrderList } from '@/features/orders/components/order-list';
import { ShoppingBag } from 'lucide-react';

export const metadata = {
  title: 'Orders - Admin',
  description: 'View and manage customer orders',
};

export default async function AdminOrdersPage() {
  await requireAdmin();

  const { data: orders, count } = await listOrders({ limit: 100 });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">View and manage customer orders</p>
        </div>
      </div>

      <OrderList initialOrders={orders} totalCount={count} />
    </div>
  );
}
