'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Jersey } from '@/features/jerseys';
import type { CartItem, CartItemOptions } from './types';
import { cartItemKey } from './types';

const STORAGE_KEY = 'jersey-cart';

interface CartContextValue {
  items: CartItem[];
  addItem: (jersey: Jersey, options: CartItemOptions) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  discount: number;
  shippingCost: number;
  finalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function getKey(item: CartItem): string {
  return cartItemKey(item.jersey.id, {
    size: item.size,
    dorsalName: item.dorsalName,
    dorsalNumber: item.dorsalNumber,
  });
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage full or unavailable
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(items);
  }, [items, hydrated]);

  const addItem = useCallback((jersey: Jersey, options: CartItemOptions) => {
    const key = cartItemKey(jersey.id, options);
    setItems((prev) => {
      const existing = prev.find((item) => getKey(item) === key);
      if (existing) {
        return prev.map((item) =>
          getKey(item) === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          jersey,
          quantity: 1,
          size: options.size,
          dorsalName: options.dorsalName,
          dorsalNumber: options.dorsalNumber,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => getKey(item) !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => getKey(item) !== key));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (getKey(item) === key ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.jersey.price * item.quantity, 0),
    [items]
  );

  // 3x2 logic: for every 3 jerseys, the cheapest one is free
  const discount = useMemo(() => {
    // Expand items by quantity into individual unit prices
    const unitPrices: number[] = [];
    for (const item of items) {
      for (let i = 0; i < item.quantity; i++) {
        unitPrices.push(item.jersey.price);
      }
    }
    if (unitPrices.length < 3) return 0;
    // Sort ascending so cheapest are first
    unitPrices.sort((a, b) => a - b);
    // Every group of 3, the cheapest (first in group) is free
    const freeCount = Math.floor(unitPrices.length / 3);
    return unitPrices.slice(0, freeCount).reduce((sum, p) => sum + p, 0);
  }, [items]);

  // Shipping: free if 3+ jerseys, otherwise €7
  const shippingCost = useMemo(() => (totalItems >= 3 ? 0 : 7), [totalItems]);

  const finalPrice = useMemo(
    () => totalPrice - discount + shippingCost,
    [totalPrice, discount, shippingCost]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, discount, shippingCost, finalPrice }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, discount, shippingCost, finalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
