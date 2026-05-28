import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import {
  ProjectFilters,
  type ProjectFiltersState,
} from '@/components/projects/ProjectFilters';
import { Spinner } from '@/components/ui/Spinner';
import type { ProjectFilters as ProjectQueryFilters } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';
import { useCategories } from '@/hooks/useCategories';
import { isFeaturedProjectsRoute } from '@/utils/navigation';

export function ProjectsPage() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const categoriesState = useCategories();

  const featuredOnly = isFeaturedProjectsRoute(pathname, searchParams.toString());

  const initialFilters = useMemo<ProjectFiltersState>(
    () => ({
      categorySlug: searchParams.get('category') ?? '',
      difficulty: searchParams.get('difficulty') ?? '',
      search: searchParams.get('q') ?? '',
    }),
    [searchParams],
  );

  const [localFilters, setLocalFilters] = useState<ProjectFiltersState>(initialFilters);

  const repoFilters = useMemo((): ProjectQueryFilters | undefined => {
    const filters: ProjectQueryFilters = {
      ...(localFilters.categorySlug.length > 0
        ? { categorySlug: localFilters.categorySlug }
        : {}),
      ...(localFilters.difficulty.length > 0 ? { difficulty: localFilters.difficulty } : {}),
      ...(localFilters.search.length > 0 ? { search: localFilters.search } : {}),
      ...(featuredOnly ? { featured: true } : {}),
    };

    return Object.keys(filters).length > 0 ? filters : undefined;
  }, [localFilters, featuredOnly]);

  const projectsState = useProjects(repoFilters);

  return (
    <div className="container-app py-10">
      <header className="mb-10">
        <h1 className="font-display text-4xl text-ink">
          {featuredOnly ? 'Proyectos destacados' : 'Catálogo de proyectos'}
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Encuentra manualidades para todos los niveles. Filtra por categoría, dificultad o
          palabra clave.
        </p>
      </header>

      {categoriesState.status === 'success' && (
        <div className="mb-8">
          <ProjectFilters
            categories={categoriesState.data}
            filters={localFilters}
            onChange={setLocalFilters}
          />
        </div>
      )}

      {projectsState.status === 'loading' && <Spinner />}
      {projectsState.status === 'error' && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-red-700">{projectsState.message}</p>
      )}
      {projectsState.status === 'success' && <ProjectGrid projects={projectsState.data} />}
    </div>
  );
}
