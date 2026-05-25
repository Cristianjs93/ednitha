import type { Category } from '@domain/entities/Category';
import { createCategoryId } from '@domain/entities/Category';
import type { CategoryDto } from '@infrastructure/dto/CatalogDto';

export class CategoryMapper {
  static toDomain(dto: CategoryDto): Category {
    return {
      id: createCategoryId(dto.id),
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
    };
  }

  static toDomainList(dtos: readonly CategoryDto[]): readonly Category[] {
    return dtos.map((dto) => CategoryMapper.toDomain(dto));
  }
}
