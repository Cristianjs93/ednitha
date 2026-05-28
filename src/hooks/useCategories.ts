import type { Category } from '@/types/category';
import { getCategoriesSync } from '@/services/catalogService';
import type { AsyncState } from '@/hooks/useProjects';

export function useCategories(): AsyncState<readonly Category[]> {
  return { status: 'success', data: getCategoriesSync() };
}
