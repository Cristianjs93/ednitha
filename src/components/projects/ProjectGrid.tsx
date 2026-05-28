import type { Project } from '@/types/project';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';

export interface ProjectGridProps {
  readonly projects: readonly Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="Sin proyectos"
        description="No encontramos proyectos con los filtros seleccionados. Prueba otra categoría o búsqueda."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
