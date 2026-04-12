'use client';

import { useTranslations } from 'next-intl';
import { Truck, BadgeCheck, Clock, RotateCcw, CreditCard } from 'lucide-react';

const features = [
  { icon: Truck, key: 'shipping' },
  { icon: BadgeCheck, key: 'quality' },
  { icon: Clock, key: 'delivery' },
  { icon: RotateCcw, key: 'returns' },
  { icon: CreditCard, key: 'payment' },
] as const;

export function PromoBanner() {
  const t = useTranslations('jerseys');

  return (
    <section className="py-12 bg-zinc-950 border-y border-zinc-800/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8 md:flex-nowrap">
          {features.map(({ icon: Icon, key }) => (
            <div key={key} className="flex flex-col items-center text-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {t(`promo.${key}.title`)}
                </p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {t(`promo.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
