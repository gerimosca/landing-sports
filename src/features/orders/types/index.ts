import { z } from 'zod';

// Order status
export const orderStatusSchema = z.enum([
  'paid',
  'shipped',
  'delivered',
  'refunded',
  'cancelled',
]);

export type OrderStatus = z.infer<typeof orderStatusSchema>;

// Database types
export type Order = {
  id: string;
  order_number: string;
  stripe_session_id: string;
  customer_email: string;
  shipping_name: string | null;
  shipping_phone: string | null;
  shipping_address: string | null;
  shipping_address2: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  subtotal: number;
  discount: number;
  shipping_cost: number;
  total: number;
  currency: string;
  status: OrderStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  is_customization: boolean;
  created_at: string;
};

export type OrderWithItems = Order & {
  order_items: OrderItem[];
};

// Input types for commands
export type CreateOrderInput = {
  order_number: string;
  stripe_session_id: string;
  customer_email: string;
  shipping_name?: string | null;
  shipping_phone?: string | null;
  shipping_address?: string | null;
  shipping_address2?: string | null;
  shipping_city?: string | null;
  shipping_postal_code?: string | null;
  subtotal: number;
  discount: number;
  shipping_cost: number;
  total: number;
  currency?: string;
};

export type CreateOrderItemInput = {
  order_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  is_customization?: boolean;
};

// Update status input
export const updateOrderStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: orderStatusSchema,
  notes: z.string().optional(),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
