import type { Project } from '@domain/entities/Project';
import { createProjectId } from '@domain/entities/Project';
import { createCategoryId } from '@domain/entities/Category';
import { isDifficultyLevel } from '@domain/entities/Difficulty';
import type { ProjectDto } from '@infrastructure/dto/CatalogDto';

export class ProjectMapperError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectMapperError';
  }
}

export class ProjectMapper {
  static toDomain(dto: ProjectDto): Project {
    if (!isDifficultyLevel(dto.difficulty)) {
      throw new ProjectMapperError(`Dificultad inválida: ${dto.difficulty}`);
    }

    if (dto.currency !== 'COP' && dto.currency !== 'USD') {
      throw new ProjectMapperError(`Moneda inválida: ${dto.currency}`);
    }

    return {
      id: createProjectId(dto.id),
      slug: dto.slug,
      title: dto.title,
      shortDescription: dto.shortDescription,
      description: dto.description,
      categoryId: createCategoryId(dto.categoryId),
      difficulty: dto.difficulty,
      durationMinutes: dto.durationMinutes,
      price: dto.price,
      currency: dto.currency,
      featured: dto.featured,
      tags: [...dto.tags],
      imageUrl: dto.imageUrl,
      galleryUrls: [...dto.galleryUrls],
      materials: dto.materials.map((m) => ({
        name: m.name,
        quantity: m.quantity,
        optional: m.optional,
      })),
      steps: dto.steps.map((s) => ({
        order: s.order,
        title: s.title,
        description: s.description,
        imageUrl: s.imageUrl,
      })),
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }

  static toDomainList(dtos: readonly ProjectDto[]): readonly Project[] {
    return dtos.map((dto) => ProjectMapper.toDomain(dto));
  }
}
