'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Search, ChevronRight } from 'lucide-react';
import type { Order, OrderStatus } from '../types';

const statusConfig: Record<OrderStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  paid: { label: 'Paid', variant: 'default' },
  shipped: { label: 'Shipped', variant: 'secondary' },
  delivered: { label: 'Delivered', variant: 'outline' },
  refunded: { label: 'Refunded', variant: 'destructive' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
};

function formatCents(cents: number, currency: string = 'eur') {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

interface OrderListProps {
  initialOrders: Order[];
  totalCount: number;
}

export function OrderList({ initialOrders, totalCount }: OrderListProps) {
  const router = useRouter();
  const [searchEmail, setSearchEmail] = useState('');

  const filteredOrders = searchEmail
    ? initialOrders.filter((o) =>
        o.customer_email.toLowerCase().includes(searchEmail.toLowerCase())
      )
    : initialOrders;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats summary */}
      <p className="text-sm text-muted-foreground">
        {totalCount} {totalCount === 1 ? 'order' : 'orders'} total
      </p>

      {/* Table */}
      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 text-sm font-medium">Order</th>
              <th className="text-left p-3 text-sm font-medium">Customer</th>
              <th className="text-left p-3 text-sm font-medium">Total</th>
              <th className="text-left p-3 text-sm font-medium">Status</th>
              <th className="text-left p-3 text-sm font-medium">Date</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status as OrderStatus] || statusConfig.paid;
              return (
                <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-3">
                    <span className="font-mono text-sm font-medium">{order.order_number}</span>
                  </td>
                  <td className="p-3">
                    <div>
                      <p className="text-sm">{order.customer_email}</p>
                      {order.shipping_name && (
                        <p className="text-xs text-muted-foreground">{order.shipping_name}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium">{formatCents(order.total, order.currency)}</span>
                    {order.discount > 0 && (
                      <span className="ml-1 text-xs text-green-600">(-{formatCents(order.discount, order.currency)})</span>
                    )}
                  </td>
                  <td className="p-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="p-3">
                    <span className="text-sm text-muted-foreground">{formatDate(order.created_at)}</span>
                  </td>
                  <td className="p-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/orders/${order.id}`)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
