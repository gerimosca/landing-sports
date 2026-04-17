import { createClient } from '@supabase/supabase-js';
import type { Order, OrderWithItems } from './types';

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

export async function listOrders(filters?: {
  status?: string;
  email?: string;
  limit?: number;
  offset?: number;
}) {
  const supabase = createAdminClient();

  let query = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.email) {
    query = query.ilike('customer_email', `%${filters.email}%`);
  }
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error listing orders:', error);
    return { data: [] as Order[], count: 0, error: error.message };
  }

  return { data: (data || []) as Order[], count: count || 0, error: null };
}

export async function getOrderWithItems(orderId: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error getting order:', error);
    return { data: null, error: error.message };
  }

  return { data: data as OrderWithItems, error: null };
}

export async function getOrderStats() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('orders')
    .select('status, total');

  if (error) {
    console.error('Error getting order stats:', error);
    return { totalOrders: 0, totalRevenue: 0, byStatus: {} };
  }

  const orders = data || [];
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const byStatus: Record<string, number> = {};
  for (const order of orders) {
    byStatus[order.status] = (byStatus[order.status] || 0) + 1;
  }

  return { totalOrders, totalRevenue, byStatus };
}
