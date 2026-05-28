import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/index';
import { calculateCartTotals, getTotalItemCount } from '@/utils/cartTotals';

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(selectCartState, (cart) => cart.items);

export const selectCartItemCount = createSelector(selectCartItems, (items) =>
  getTotalItemCount(items),
);

export const selectCartTotals = createSelector(selectCartItems, (items) =>
  calculateCartTotals(items),
);

export const selectIsCartEmpty = createSelector(selectCartItems, (items) => items.length === 0);
