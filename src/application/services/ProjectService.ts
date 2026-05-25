import type { Project } from '@domain/entities/Project';
import type { Category } from '@domain/entities/Category';
import type { ProjectFilters } from '@domain/ports/IProjectRepository';
import type { Result } from '@core/types/result';
import { GetProjectsUseCase } from '@application/use-cases/GetProjectsUseCase';
import { GetProjectBySlugUseCase } from '@application/use-cases/GetProjectBySlugUseCase';
import { GetCategoriesUseCase } from '@application/use-cases/GetCategoriesUseCase';

export class ProjectService {
  private readonly getProjects: GetProjectsUseCase;
  private readonly getProjectBySlug: GetProjectBySlugUseCase;
  private readonly getCategories: GetCategoriesUseCase;

  constructor(
    getProjectsUseCase: GetProjectsUseCase,
    getProjectBySlugUseCase: GetProjectBySlugUseCase,
    getCategoriesUseCase: GetCategoriesUseCase,
  ) {
    this.getProjects = getProjectsUseCase;
    this.getProjectBySlug = getProjectBySlugUseCase;
    this.getCategories = getCategoriesUseCase;
  }

  listProjects(filters?: ProjectFilters): Promise<Result<readonly Project[]>> {
    return this.getProjects.execute(filters);
  }

  getProject(slug: string): Promise<Result<Project>> {
    return this.getProjectBySlug.execute(slug);
  }

  listCategories(): Promise<Result<readonly Category[]>> {
    return this.getCategories.execute();
  }
}
