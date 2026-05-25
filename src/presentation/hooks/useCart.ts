import { useCallback, useMemo } from 'react';
import type { Project } from '@domain/entities/Project';
import { projectToCartLineItem } from '@application/mappers/projectToCartLineItem';
import { whatsAppOrderService } from '@app/di/container';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '@app/store/cartSlice';
import {
  selectCartItems,
  selectCartItemCount,
  selectCartTotals,
  selectIsCartEmpty,
} from '@app/store/selectors/cartSelectors';
import { env } from '@core/config/env';

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const totals = useAppSelector(selectCartTotals);
  const isEmpty = useAppSelector(selectIsCartEmpty);

  const addProject = useCallback(
    (project: Project) => {
      dispatch(addItem(projectToCartLineItem(project)));
    },
    [dispatch],
  );

  const removeProject = useCallback(
    (projectId: string) => {
      dispatch(removeItem(projectId));
    },
    [dispatch],
  );

  const increment = useCallback(
    (projectId: string) => {
      dispatch(incrementQuantity(projectId));
    },
    [dispatch],
  );

  const decrement = useCallback(
    (projectId: string) => {
      dispatch(decrementQuantity(projectId));
    },
    [dispatch],
  );

  const clear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const whatsAppCheckoutUrl = useMemo(
    () => whatsAppOrderService.buildOrderUrl(items, env.whatsappPhone, env.appName),
    [items],
  );

  const isInCart = useCallback(
    (projectId: string) => items.some((item) => item.projectId === projectId),
    [items],
  );

  return {
    items,
    itemCount,
    totals,
    isEmpty,
    addProject,
    removeProject,
    increment,
    decrement,
    clear,
    whatsAppCheckoutUrl,
    isInCart,
  };
}
