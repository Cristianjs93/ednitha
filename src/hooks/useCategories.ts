import { useEffect, useState } from 'react';
import type { Category } from '@/types/category';
import { fetchCategories } from '@/services/catalogService';
import type { AsyncState } from '@/hooks/useProjects';

export function useCategories(): AsyncState<readonly Category[]> {
  const [state, setState] = useState<AsyncState<readonly Category[]>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      try {
        const data = await fetchCategories();
        if (!cancelled) {
          setState({ status: 'success', data });
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Error al cargar categorías';
          setState({ status: 'error', message });
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
