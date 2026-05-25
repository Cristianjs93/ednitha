import { describe, it, expect } from 'vitest';
import { calculateCartTotals, getTotalItemCount } from '@domain/services/calculateCartTotals';
import type { CartLineItem } from '@domain/entities/CartLineItem';

const item: CartLineItem = {
  projectId: '1',
  slug: 'a',
  title: 'A',
  price: 100,
  currency: 'COP',
  imageUrl: '',
  quantity: 2,
};

describe('calculateCartTotals', () => {
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
