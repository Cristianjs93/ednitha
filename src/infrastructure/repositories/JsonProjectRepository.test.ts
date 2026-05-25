import { describe, it, expect } from 'vitest';
import { JsonProjectRepository } from '@infrastructure/repositories/JsonProjectRepository';

describe('JsonProjectRepository', () => {
  const repository = new JsonProjectRepository();

  it('devuelve todos los proyectos', async () => {
    const result = await repository.findAll();
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.length).toBeGreaterThan(0);
    }
  });

  it('filtra proyectos destacados', async () => {
    const result = await repository.findAll({ featured: true });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.every((p) => p.featured)).toBe(true);
    }
  });

  it('encuentra proyecto por slug', async () => {
    const result = await repository.findBySlug('muneca-de-trapo');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data?.title).toContain('Muñeca');
    }
  });
});
