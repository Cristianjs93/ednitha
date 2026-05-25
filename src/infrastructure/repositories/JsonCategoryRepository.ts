import type { ICategoryRepository } from '@domain/ports/ICategoryRepository';
import type { Category, CategoryId } from '@domain/entities/Category';
import type { Result } from '@core/types/result';
import { ok, err } from '@core/types/result';
import type { CatalogDto } from '@infrastructure/dto/CatalogDto';
import { CategoryMapper } from '@infrastructure/mappers/CategoryMapper';
import catalogData from '@data/projects.json';

export class JsonCategoryRepository implements ICategoryRepository {
  private readonly categories: readonly Category[];

  constructor(data: CatalogDto = catalogData as CatalogDto) {
    this.categories = CategoryMapper.toDomainList(data.categories);
  }

  async findAll(): Promise<Result<readonly Category[]>> {
    try {
      return ok(this.categories);
    } catch (error) {
      return err(error instanceof Error ? error : new Error('Error al cargar categorías'));
    }
  }

  async findById(id: CategoryId): Promise<Result<Category | null>> {
    try {
      const category = this.categories.find((c) => c.id === id) ?? null;
      return ok(category);
    } catch (error) {
      return err(error instanceof Error ? error : new Error('Error al buscar categoría'));
    }
  }

  async findBySlug(slug: string): Promise<Result<Category | null>> {
    try {
      const category = this.categories.find((c) => c.slug === slug) ?? null;
      return ok(category);
    } catch (error) {
      return err(error instanceof Error ? error : new Error('Error al buscar categoría'));
    }
  }
}
