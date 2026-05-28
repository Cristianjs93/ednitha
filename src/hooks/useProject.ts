import { useEffect, useState } from 'react';
import type { Project } from '@/types/project';
import { fetchProjectBySlug } from '@/services/catalogService';
import type { AsyncState } from '@/hooks/useProjects';

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
      try {
        const data = await fetchProjectBySlug(slug);
        if (!cancelled) {
          setState({ status: 'success', data });
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Error al cargar proyecto';
          setState({ status: 'error', message });
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}
