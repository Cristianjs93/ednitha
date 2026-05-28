import { describe, it, expect } from 'vitest';
import { calculateCartTotals, getTotalItemCount } from '@/utils/cartTotals';
import type { CartLineItem } from '@/types/cart';

const item: CartLineItem = {
  projectId: '1',
  slug: 'a',
  title: 'A',
  price: 100,
  currency: 'COP',
  imageUrl: '',
  quantity: 2,
};

describe('cartTotals', () => {
  it('suma subtotales y cantidades', () => {
    const totals = calculateCartTotals([item]);
    expect(totals).toHaveLength(1);
    expect(totals[0]?.subtotal).toBe(200);
    expect(totals[0]?.itemCount).toBe(2);
  });

  it('cuenta artículos totales', () => {
    expect(getTotalItemCount([item])).toBe(2);
  });
});
