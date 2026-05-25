import { describe, it, expect } from 'vitest';
import { ProjectMapper } from '@infrastructure/mappers/ProjectMapper';
import type { ProjectDto } from '@infrastructure/dto/CatalogDto';

const validDto: ProjectDto = {
  id: 'proj-test',
  slug: 'test-project',
  title: 'Proyecto test',
  shortDescription: 'Corta',
  description: 'Larga',
  categoryId: 'cat-textil',
  difficulty: 'principiante',
  durationMinutes: 60,
  price: 100,
  currency: 'COP',
  featured: false,
  tags: ['test'],
  imageUrl: 'https://example.com/img.jpg',
  galleryUrls: [],
  materials: [],
  steps: [],
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
};

describe('ProjectMapper', () => {
  it('mapea un DTO válido al dominio', () => {
    const project = ProjectMapper.toDomain(validDto);
    expect(project.slug).toBe('test-project');
    expect(project.difficulty).toBe('principiante');
    expect(project.currency).toBe('COP');
  });

  it('rechaza dificultad inválida', () => {
    expect(() =>
      ProjectMapper.toDomain({ ...validDto, difficulty: 'experto' }),
    ).toThrow();
  });
});
