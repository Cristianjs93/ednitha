import { describe, it, expect } from 'vitest';
import {
  isFeaturedProjectsRoute,
  isFeaturedSearch,
  isNavLinkActive,
} from '@/utils/navigation';

describe('navigation', () => {
  it('isFeaturedSearch detecta el query param', () => {
    expect(isFeaturedSearch('?featured=true')).toBe(true);
    expect(isFeaturedSearch('')).toBe(false);
  });

  it('isFeaturedProjectsRoute requiere pathname y query', () => {
    expect(isFeaturedProjectsRoute('/proyectos', '?featured=true')).toBe(true);
    expect(isFeaturedProjectsRoute('/destacados', '')).toBe(false);
    expect(isFeaturedProjectsRoute('/proyectos', '')).toBe(false);
  });

  it('isNavLinkActive distingue proyectos y destacados', () => {
    expect(isNavLinkActive('projects', '/proyectos', '')).toBe(true);
    expect(isNavLinkActive('featured', '/proyectos', '')).toBe(false);
    expect(isNavLinkActive('featured', '/proyectos', '?featured=true')).toBe(true);
    expect(isNavLinkActive('projects', '/proyectos', '?featured=true')).toBe(false);
  });
});
