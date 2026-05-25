import type { CartLineItem } from '@domain/entities/CartLineItem';

export interface CartTotalsByCurrency {
  readonly currency: 'COP' | 'USD';
  readonly subtotal: number;
  readonly itemCount: number;
}

export function calculateCartTotals(items: readonly CartLineItem[]): readonly CartTotalsByCurrency[] {
  const accumulator = new Map<'COP' | 'USD', { subtotal: number; itemCount: number }>();

  for (const item of items) {
    const current = accumulator.get(item.currency) ?? { subtotal: 0, itemCount: 0 };
    accumulator.set(item.currency, {
      subtotal: current.subtotal + item.price * item.quantity,
      itemCount: current.itemCount + item.quantity,
    });
  }

  return Array.from(accumulator.entries()).map(([currency, data]) => ({
    currency,
    subtotal: data.subtotal,
    itemCount: data.itemCount,
  }));
}

export function getTotalItemCount(items: readonly CartLineItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
