import { Suspense } from 'react';
import { CheckoutSuccess } from '@/features/cart';

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <CheckoutSuccess />
    </Suspense>
  );
}
