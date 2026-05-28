import { useEffect, useState } from 'react';
import type { Project } from '@/types/project';
import { getProjectBySlugSync } from '@/services/catalogService';
import type { AsyncState } from '@/hooks/useProjects';

function loadProject(slug: string | undefined): AsyncState<Project> {
  if (slug === undefined || slug.length === 0) {
    return { status: 'error', message: 'Proyecto no especificado' };
  }

  try {
    return { status: 'success', data: getProjectBySlugSync(slug) };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al cargar proyecto';
    return { status: 'error', message };
  }
}

export function useProject(slug: string | undefined): AsyncState<Project> {
  const [state, setState] = useState<AsyncState<Project>>(() => loadProject(slug));

  useEffect(() => {
    setState(loadProject(slug));
  }, [slug]);

  return state;
}
