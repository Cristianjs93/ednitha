import type { CartLineItem } from '@/types/cart';

export const CART_STORAGE_KEY = 'ednitha-cart';

function isCartLineItem(value: unknown): value is CartLineItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.projectId === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.title === 'string' &&
    typeof item.price === 'number' &&
    (item.currency === 'COP' || item.currency === 'USD') &&
    typeof item.imageUrl === 'string' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  );
}

export function loadCartFromStorage(): CartLineItem[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return [];
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw === null) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isCartLineItem);
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: readonly CartLineItem[]): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}
