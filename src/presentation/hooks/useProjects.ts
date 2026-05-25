import { useEffect, useState } from 'react';
import type { Project } from '@domain/entities/Project';
import type { ProjectFilters } from '@domain/ports/IProjectRepository';
import { projectService } from '@app/di/container';

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
      const result = await projectService.listProjects(filters);

      if (cancelled) return;

      if (result.success) {
        setState({ status: 'success', data: result.data });
      } else {
        setState({ status: 'error', message: result.error.message });
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [filters?.categorySlug, filters?.difficulty, filters?.featured, filters?.search]);

  return state;
}
