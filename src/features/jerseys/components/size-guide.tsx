'use client';

import { useState } from 'react';
import { Ruler, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogPortal,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';

const SIZE_DATA = [
  { size: 'S', length: 70, chest: 100, weight: '55 - 60 kg', height: '165 -' },
  { size: 'M', length: 73, chest: 104, weight: '60 - 70 kg', height: '170 -' },
  { size: 'L', length: 75, chest: 108, weight: '70 - 80 kg', height: '175 -' },
  { size: 'XL', length: 77, chest: 112, weight: '80 - 90 kg', height: '175 -' },
  { size: '2XL', length: 79, chest: 116, weight: '90 - 95 kg', height: '175 -' },
  { size: '3XL', length: 81, chest: 120, weight: '95 - 105 kg', height: '175 -' },
  { size: '4XL', length: 83, chest: 124, weight: '105 - 115 kg', height: '175 -' },
] as const;

export function SizeGuide() {
  const tc = useTranslations('cart');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-primary uppercase tracking-wider underline-offset-2 hover:underline transition-colors"
          aria-label={tc('sizeGuide')}
        >
          <Ruler className="h-3 w-3" aria-hidden="true" />
          {tc('sizeGuide')}
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed z-[120]',
            // Mobile: bottom sheet
            'left-0 right-0 bottom-0 top-auto',
            'w-full max-w-full max-h-[85vh] overflow-y-auto',
            'rounded-t-2xl rounded-b-none border-t border-x-0 border-b-0',
            // Desktop: centered modal
            'sm:left-[50%] sm:right-auto sm:top-[50%] sm:bottom-auto',
            'sm:translate-x-[-50%] sm:translate-y-[-50%]',
            'sm:max-w-2xl sm:max-h-[90vh]',
            'sm:rounded-2xl sm:border',
            // Animation
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            'sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=open]:slide-in-from-bottom-0',
            'sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95',
            // Style
            'bg-zinc-950 border-zinc-800 p-0 shadow-xl'
          )}
        >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex-1 min-w-0">
            <DialogTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Ruler className="h-4 w-4 text-primary" aria-hidden="true" />
              {tc('sizeGuideTitle')}
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-400 mt-1">
              {tc('sizeGuideDescription')}
            </DialogDescription>
          </div>
          <DialogClose
            aria-label={tc('close')}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div className="px-3 sm:px-5 py-4">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-2 px-1 sm:px-2 text-[9px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider w-[14%]">
                  {tc('sizeGuideCol_size')}
                </th>
                <th className="text-center py-2 px-1 sm:px-2 text-[9px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider w-[16%]">
                  {tc('sizeGuideCol_length')}
                </th>
                <th className="text-center py-2 px-1 sm:px-2 text-[9px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider w-[16%]">
                  {tc('sizeGuideCol_chest')}
                </th>
                <th className="text-center py-2 px-1 sm:px-2 text-[9px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider w-[30%]">
                  {tc('sizeGuideCol_weight')}
                </th>
                <th className="text-center py-2 px-1 sm:px-2 text-[9px] sm:text-[11px] font-semibold text-zinc-400 uppercase tracking-wider w-[24%]">
                  {tc('sizeGuideCol_height')}
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZE_DATA.map((row) => (
                <tr
                  key={row.size}
                  className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="py-3 px-1 sm:px-2 font-bold text-primary text-xs sm:text-sm">
                    {row.size}
                  </td>
                  <td className="py-3 px-1 sm:px-2 text-center text-zinc-200 text-[11px] sm:text-sm tabular-nums">
                    {row.length}
                  </td>
                  <td className="py-3 px-1 sm:px-2 text-center text-zinc-200 text-[11px] sm:text-sm tabular-nums">
                    {row.chest}
                  </td>
                  <td className="py-3 px-1 sm:px-2 text-center text-zinc-200 text-[10px] sm:text-sm tabular-nums whitespace-nowrap">
                    {row.weight}
                  </td>
                  <td className="py-3 px-1 sm:px-2 text-center text-zinc-200 text-[10px] sm:text-sm tabular-nums whitespace-nowrap">
                    {row.height}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 text-[10px] sm:text-[11px] text-zinc-500 italic">
            * {tc('sizeGuideNote')}
          </p>
        </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
