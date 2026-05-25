import { env } from '@core/config/env';

export const PLACEHOLDER_IMAGE_URL = env.placeholderImageUrl;

export function resolveImageUrl(url: string | undefined | null): string {
  if (typeof url === 'string' && url.trim().length > 0) {
    return url;
  }
  return PLACEHOLDER_IMAGE_URL;
}
