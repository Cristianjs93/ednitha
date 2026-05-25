import type { Project, ProjectId } from '@domain/entities/Project';
import type { Result } from '@core/types/result';

export interface ProjectFilters {
  readonly categorySlug?: string;
  readonly difficulty?: string;
  readonly featured?: boolean;
  readonly search?: string;
}

export interface IProjectRepository {
  findAll(filters?: ProjectFilters): Promise<Result<readonly Project[]>>;
  findById(id: ProjectId): Promise<Result<Project | null>>;
  findBySlug(slug: string): Promise<Result<Project | null>>;
}
