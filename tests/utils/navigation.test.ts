import { describe, it, expect } from 'vitest';
import { isNavLinkActive } from '@/utils/navigation';

describe('isNavLinkActive', () => {
  it('marca inicio solo en /', () => {
    expect(isNavLinkActive('home', '/', '')).toBe(true);
    expect(isNavLinkActive('home', '/proyectos', '')).toBe(false);
  });

  it('distingue proyectos y destacados en /proyectos', () => {
    expect(isNavLinkActive('projects', '/proyectos', '')).toBe(true);
    expect(isNavLinkActive('featured', '/proyectos', '')).toBe(false);
    expect(isNavLinkActive('featured', '/proyectos', '?featured=true')).toBe(true);
    expect(isNavLinkActive('projects', '/proyectos', '?featured=true')).toBe(false);
  });
});
