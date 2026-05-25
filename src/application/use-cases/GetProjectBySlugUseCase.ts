import type { IProjectRepository } from '@domain/ports/IProjectRepository';
import type { Project } from '@domain/entities/Project';
import type { Result } from '@core/types/result';
import { ok, err } from '@core/types/result';

export class GetProjectBySlugUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(slug: string): Promise<Result<Project>> {
    const trimmed = slug.trim();
    if (trimmed.length === 0) {
      return err(new Error('El slug del proyecto no puede estar vacío'));
    }

    const result = await this.projectRepository.findBySlug(trimmed);

    if (!result.success) {
      return result;
    }

    if (result.data === null) {
      return err(new Error(`Proyecto no encontrado: ${trimmed}`));
    }

    return ok(result.data);
  }
}
