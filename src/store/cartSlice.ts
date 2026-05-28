import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartLineItem, CartLineItemInput } from '@/types/cart';
import { loadCartFromStorage, saveCartToStorage } from '@/store/cartStorage';

export interface CartState {
  readonly items: CartLineItem[];
}

const initialState: CartState = {
  items: loadCartFromStorage(),
};

function persistItems(items: readonly CartLineItem[]): void {
  saveCartToStorage(items);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartLineItemInput>) => {
      const existing = state.items.find((item) => item.projectId === action.payload.projectId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      persistItems(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.projectId !== action.payload);
      persistItems(state.items);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.projectId === action.payload);
      if (item) {
        item.quantity += 1;
        persistItems(state.items);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.projectId === action.payload);
      if (item === undefined) return;

      if (item.quantity <= 1) {
        state.items = state.items.filter((i) => i.projectId !== action.payload);
      } else {
        item.quantity -= 1;
      }

      persistItems(state.items);
    },
    setQuantity: (state, action: PayloadAction<{ projectId: string; quantity: number }>) => {
      const { projectId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.projectId !== projectId);
      } else {
        const item = state.items.find((i) => i.projectId === projectId);
        if (item) {
          item.quantity = quantity;
        }
      }

      persistItems(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      persistItems(state.items);
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
