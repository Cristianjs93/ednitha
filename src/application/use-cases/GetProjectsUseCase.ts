import type { IProjectRepository, ProjectFilters } from '@domain/ports/IProjectRepository';
import type { Project } from '@domain/entities/Project';
import type { Result } from '@core/types/result';

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(filters?: ProjectFilters): Promise<Result<readonly Project[]>> {
    return this.projectRepository.findAll(filters);
  }
}
