import { forwardRef, type CSSProperties, type ImgHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

const VARIANT_WIDTHS = [400, 800, 1200] as const;

function buildSrcSet(originalSrc: string): string {
  const lastDot = originalSrc.lastIndexOf('.');
  if (lastDot === -1) return originalSrc;
  const base = originalSrc.slice(0, lastDot);
  return VARIANT_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
}

function buildFallback(originalSrc: string): string {
  const lastDot = originalSrc.lastIndexOf('.');
  if (lastDot === -1) return originalSrc;
  return `${originalSrc.slice(0, lastDot)}-800.webp`;
}

type NativeImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'loading' | 'decoding'
>;

export interface ResponsiveImageProps extends NativeImgProps {
  /** Original image path, e.g. '/images/la-liga/real-madrid/1/1.jpg'. WebP variants must exist alongside it. */
  src: string;
  /** Alt text. Required for accessibility. */
  alt: string;
  /** sizes attribute, e.g. '(max-width: 640px) 50vw, 25vw' */
  sizes: string;
  /** When true, fills the parent (which must be position: relative). */
  fill?: boolean;
  /** When true, image loads eagerly with high priority. */
  priority?: boolean;
  /** className applied to the underlying <img>. */
  className?: string;
}

export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
  function ResponsiveImage(
    { src, alt, sizes, fill, priority, className, style, ...rest },
    ref
  ) {
    const fillStyle: CSSProperties | undefined = fill
      ? {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          ...style,
        }
      : style;

    return (
      <img
        ref={ref}
        src={buildFallback(src)}
        srcSet={buildSrcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn(fill && 'object-cover', className)}
        style={fillStyle}
        {...rest}
      />
    );
  }
);
