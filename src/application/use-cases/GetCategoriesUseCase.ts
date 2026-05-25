import type { ICategoryRepository } from '@domain/ports/ICategoryRepository';
import type { Category } from '@domain/entities/Category';
import type { Result } from '@core/types/result';

export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Result<readonly Category[]>> {
    return this.categoryRepository.findAll();
  }
}
