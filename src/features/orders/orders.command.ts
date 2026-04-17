import { createClient } from '@supabase/supabase-js';
import type {
  CreateOrderInput,
  CreateOrderItemInput,
  OrderStatus,
} from './types';

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function createOrder(input: CreateOrderInput) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('orders')
    .insert({
      order_number: input.order_number,
      stripe_session_id: input.stripe_session_id,
      customer_email: input.customer_email,
      shipping_name: input.shipping_name || null,
      shipping_phone: input.shipping_phone || null,
      shipping_address: input.shipping_address || null,
      shipping_address2: input.shipping_address2 || null,
      shipping_city: input.shipping_city || null,
      shipping_postal_code: input.shipping_postal_code || null,
      subtotal: input.subtotal,
      discount: input.discount,
      shipping_cost: input.shipping_cost,
      total: input.total,
      currency: input.currency || 'eur',
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message, orderId: null };
  }

  return { success: true, error: null, orderId: data.id as string };
}

export async function createOrderItems(items: CreateOrderItemInput[]) {
  const supabase = createAdminClient();

  const { error } = await supabase.from('order_items').insert(items);

  if (error) {
    console.error('Error creating order items:', error);
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  notes?: string
) {
  const supabase = createAdminClient();

  const update: Record<string, unknown> = { status };
  if (notes !== undefined) update.notes = notes;

  const { error } = await supabase
    .from('orders')
    .update(update)
    .eq('id', orderId);

  if (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
