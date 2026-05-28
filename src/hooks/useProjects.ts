import { useEffect, useState } from 'react';
import type { Project, ProjectFilters } from '@/types/project';
import { getProjectsSync } from '@/services/catalogService';

export type AsyncState<T> =
  | { readonly status: 'idle' | 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly message: string };

function loadProjects(filters?: ProjectFilters): AsyncState<readonly Project[]> {
  try {
    return { status: 'success', data: getProjectsSync(filters) };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar proyectos';
    return { status: 'error', message };
  }
}

export function useProjects(filters?: ProjectFilters): AsyncState<readonly Project[]> {
  const [state, setState] = useState<AsyncState<readonly Project[]>>(() => loadProjects(filters));

  useEffect(() => {
    setState(loadProjects(filters));
  }, [filters?.categorySlug, filters?.difficulty, filters?.featured, filters?.search]);

  return state;
}
