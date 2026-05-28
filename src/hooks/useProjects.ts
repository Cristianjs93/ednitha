import { useEffect, useState } from 'react';
import type { Project, ProjectFilters } from '@/types/project';
import { fetchProjects } from '@/services/catalogService';

export type AsyncState<T> =
  | { readonly status: 'idle' | 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly message: string };

export function useProjects(filters?: ProjectFilters): AsyncState<readonly Project[]> {
  const [state, setState] = useState<AsyncState<readonly Project[]>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      setState({ status: 'loading' });
      try {
        const data = await fetchProjects(filters);
        if (!cancelled) {
          setState({ status: 'success', data });
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Error al cargar proyectos';
          setState({ status: 'error', message });
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [filters?.categorySlug, filters?.difficulty, filters?.featured, filters?.search]);

  return state;
}
