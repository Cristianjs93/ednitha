import type { Category, CategoryId } from '@domain/entities/Category';
import type { Result } from '@core/types/result';

export interface ICategoryRepository {
  findAll(): Promise<Result<readonly Category[]>>;
  findById(id: CategoryId): Promise<Result<Category | null>>;
  findBySlug(slug: string): Promise<Result<Category | null>>;
}
