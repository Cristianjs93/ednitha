import { Link } from 'react-router-dom';
import type { Project } from '@/types/project';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { Badge } from '@/components/ui/Badge';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { formatDifficulty, formatDuration, formatPrice } from '@/utils/format';

export interface ProjectCardProps {
  readonly project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-sm transition-shadow hover:shadow-lg">
      <Link to={`/proyectos/${project.slug}`} className="relative block overflow-hidden">
        <CloudinaryImage
          src={project.imageUrl}
          alt={project.title}
          aspectRatio="video"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {project.featured && (
          <span className="absolute top-3 left-3">
            <Badge tone="accent">Destacado</Badge>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{formatDifficulty(project.difficulty)}</Badge>
          <span className="text-xs text-ink-muted">{formatDuration(project.durationMinutes)}</span>
        </div>

        <Link to={`/proyectos/${project.slug}`}>
          <h3 className="font-display text-lg text-ink transition-colors group-hover:text-brand-700">
            {project.title}
          </h3>
        </Link>

        <p className="line-clamp-2 flex-1 text-sm text-ink-muted">{project.shortDescription}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-brand-800">
            {formatPrice(project.price, project.currency)}
          </span>
          <Link
            to={`/proyectos/${project.slug}`}
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            Ver detalle →
          </Link>
        </div>

        <AddToCartButton project={project} size="sm" fullWidth className="mt-2" />
      </div>
    </article>
  );
}
