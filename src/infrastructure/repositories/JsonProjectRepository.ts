import type { IProjectRepository, ProjectFilters } from '@domain/ports/IProjectRepository';
import type { Project, ProjectId } from '@domain/entities/Project';
import { createProjectId } from '@domain/entities/Project';
import type { Result } from '@core/types/result';
import { ok, err } from '@core/types/result';
import type { CatalogDto } from '@infrastructure/dto/CatalogDto';
import { ProjectMapper } from '@infrastructure/mappers/ProjectMapper';
import catalogData from '@data/projects.json';

export class JsonProjectRepository implements IProjectRepository {
  private readonly catalog: CatalogDto;
  private projectsCache: readonly Project[] | null = null;

  constructor(data: CatalogDto = catalogData as CatalogDto) {
    this.catalog = data;
  }

  private loadProjects(): readonly Project[] {
    if (this.projectsCache === null) {
      this.projectsCache = ProjectMapper.toDomainList(this.catalog.projects);
    }
    return this.projectsCache;
  }

  async findAll(filters?: ProjectFilters): Promise<Result<readonly Project[]>> {
    try {
      let projects = [...this.loadProjects()];

      if (filters?.featured === true) {
        projects = projects.filter((p) => p.featured);
      }

      if (filters?.difficulty !== undefined && filters.difficulty.length > 0) {
        projects = projects.filter((p) => p.difficulty === filters.difficulty);
      }

      if (filters?.categorySlug !== undefined && filters.categorySlug.length > 0) {
        const category = this.catalog.categories.find((c) => c.slug === filters.categorySlug);
        if (category) {
          projects = projects.filter((p) => p.categoryId === category.id);
        }
      }

      if (filters?.search !== undefined && filters.search.trim().length > 0) {
        const query = filters.search.trim().toLowerCase();
        projects = projects.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.shortDescription.toLowerCase().includes(query) ||
            p.tags.some((tag) => tag.toLowerCase().includes(query)),
        );
      }

      return ok(projects);
    } catch (error) {
      return err(error instanceof Error ? error : new Error('Error al cargar proyectos'));
    }
  }

  async findById(id: ProjectId): Promise<Result<Project | null>> {
    try {
      const project = this.loadProjects().find((p) => p.id === id) ?? null;
      return ok(project);
    } catch (error) {
      return err(error instanceof Error ? error : new Error('Error al buscar proyecto'));
    }
  }

  async findBySlug(slug: string): Promise<Result<Project | null>> {
    try {
      const project = this.loadProjects().find((p) => p.slug === slug) ?? null;
      return ok(project);
    } catch (error) {
      return err(error instanceof Error ? error : new Error('Error al buscar proyecto'));
    }
  }

  async findByIdString(id: string): Promise<Result<Project | null>> {
    return this.findById(createProjectId(id));
  }
}
