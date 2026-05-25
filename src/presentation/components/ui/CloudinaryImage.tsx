import { resolveImageUrl } from '@core/constants/images';

export interface CloudinaryImageProps {
  readonly src: string | undefined | null;
  readonly alt: string;
  readonly className?: string;
  readonly loading?: 'lazy' | 'eager';
  readonly aspectRatio?: 'square' | 'video' | 'portrait';
}

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
} as const;

export function CloudinaryImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  aspectRatio,
}: CloudinaryImageProps) {
  const resolvedSrc = resolveImageUrl(src);
  const aspect = aspectRatio !== undefined ? aspectClasses[aspectRatio] : '';

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`h-full w-full object-cover ${aspect} ${className}`}
    />
  );
}
