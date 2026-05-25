import { useEffect, useState } from 'react';
import type { Category } from '@domain/entities/Category';
import { projectService } from '@app/di/container';
import type { AsyncState } from '@presentation/hooks/useProjects';

export function useCategories(): AsyncState<readonly Category[]> {
  const [state, setState] = useState<AsyncState<readonly Category[]>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      const result = await projectService.listCategories();

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
  }, []);

  return state;
}
