import { useEffect, useState } from 'react';
import type { Project } from '@domain/entities/Project';
import { projectService } from '@app/di/container';
import type { AsyncState } from '@presentation/hooks/useProjects';

export function useProject(slug: string | undefined): AsyncState<Project> {
  const [state, setState] = useState<AsyncState<Project>>({ status: 'idle' });

  useEffect(() => {
    if (slug === undefined || slug.length === 0) {
      setState({ status: 'error', message: 'Proyecto no especificado' });
      return;
    }

    let cancelled = false;

    const load = async (): Promise<void> => {
      setState({ status: 'loading' });
      const result = await projectService.getProject(slug);

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
  }, [slug]);

  return state;
}
