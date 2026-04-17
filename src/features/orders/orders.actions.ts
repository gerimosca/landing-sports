'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/shared/auth';
import { updateOrderStatus } from './orders.command';
import { updateOrderStatusSchema } from './types';

export async function updateOrderStatusAction(
  _prevState: { success: boolean; error: string | null } | null,
  formData: FormData
) {
  await requireAdmin();

  const input = {
    orderId: formData.get('orderId') as string,
    status: formData.get('status') as string,
    notes: (formData.get('notes') as string) || undefined,
  };

  const validation = updateOrderStatusSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const result = await updateOrderStatus(
    validation.data.orderId,
    validation.data.status,
    validation.data.notes
  );

  if (result.success) {
    revalidatePath('/admin/orders');
  }

  return result;
}
