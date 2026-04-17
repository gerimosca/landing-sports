'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft, Package, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';
import type { OrderWithItems, OrderStatus } from '../types';
import { updateOrderStatusAction } from '../orders.actions';

const statusConfig: Record<OrderStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  paid: { label: 'Paid', variant: 'default' },
  shipped: { label: 'Shipped', variant: 'secondary' },
  delivered: { label: 'Delivered', variant: 'outline' },
  refunded: { label: 'Refunded', variant: 'destructive' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
};

const statusFlow: OrderStatus[] = ['paid', 'shipped', 'delivered'];

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

interface OrderDetailProps {
  order: OrderWithItems;
}

export function OrderDetail({ order }: OrderDetailProps) {
  const status = statusConfig[order.status as OrderStatus] || statusConfig.paid;
  const currentStatusIndex = statusFlow.indexOf(order.status as OrderStatus);
  const nextStatus = currentStatusIndex >= 0 && currentStatusIndex < statusFlow.length - 1
    ? statusFlow[currentStatusIndex + 1]
    : null;

  const [state, action, pending] = useActionState(updateOrderStatusAction, null);

  useEffect(() => {
    if (state?.success) toast.success('Order status updated');
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-mono">{order.order_number}</h1>
            <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
          </div>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        {nextStatus && (
          <form action={action}>
            <input type="hidden" name="orderId" value={order.id} />
            <input type="hidden" name="status" value={nextStatus} />
            <Button type="submit" disabled={pending} size="sm">
              {pending ? 'Updating...' : `Mark as ${statusConfig[nextStatus].label}`}
            </Button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-4 w-4" />
            <h2 className="font-semibold">Items</h2>
          </div>
          <div className="space-y-3">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity}x {formatCents(item.unit_price, order.currency)}
                    {item.is_customization && ' (customization)'}
                  </p>
                </div>
                <span className="text-sm font-medium">{formatCents(item.total_price, order.currency)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-t space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCents(order.subtotal, order.currency)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount (3x2)</span>
                <span>-{formatCents(order.discount, order.currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{order.shipping_cost === 0 ? 'Free' : formatCents(order.shipping_cost, order.currency)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>{formatCents(order.total, order.currency)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-4 w-4" />
              <h2 className="font-semibold text-sm">Customer</h2>
            </div>
            <p className="text-sm">{order.customer_email}</p>
          </div>

          {/* Shipping */}
          {order.shipping_name && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4" />
                <h2 className="font-semibold text-sm">Shipping</h2>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-medium">{order.shipping_name}</p>
                <p>{order.shipping_address}</p>
                {order.shipping_address2 && <p>{order.shipping_address2}</p>}
                <p>{order.shipping_postal_code} {order.shipping_city}</p>
                {order.shipping_phone && <p>{order.shipping_phone}</p>}
              </div>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="rounded-lg border p-4">
              <h2 className="font-semibold text-sm mb-2">Notes</h2>
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
