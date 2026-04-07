import type { Jersey } from '@/features/jerseys';

export const SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'] as const;
export type Size = (typeof SIZES)[number];

export interface CartItemOptions {
  size: Size;
  dorsalName?: string;
  dorsalNumber?: string;
}

export interface CartItem {
  jersey: Jersey;
  quantity: number;
  size: Size;
  dorsalName?: string;
  dorsalNumber?: string;
}

export interface Cart {
  items: CartItem[];
}

/** Unique key for a cart item (same jersey + same size + same dorsal = same line) */
export function cartItemKey(jerseyId: string, opts: CartItemOptions): string {
  return `${jerseyId}__${opts.size}__${opts.dorsalName || ''}__${opts.dorsalNumber || ''}`;
}
