import { describe, it, expect } from 'vitest';
import { fetchProjects, fetchProjectBySlug } from '@/services/catalogService';

describe('catalogService', () => {
  it('devuelve todos los proyectos', async () => {
    const projects = await fetchProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it('filtra proyectos destacados', async () => {
    const projects = await fetchProjects({ featured: true });
    expect(projects.every((p) => p.featured)).toBe(true);
  });

  it('encuentra proyecto por slug', async () => {
    const project = await fetchProjectBySlug('muneca-de-trapo');
    expect(project.title).toContain('Muñeca');
  });
});
