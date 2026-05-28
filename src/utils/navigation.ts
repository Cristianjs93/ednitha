import type { NavLinkId } from '@/data/constants/navigation';

export function navLinkClassName(active: boolean): string {
  return `text-sm font-medium transition-colors ${
    active ? 'text-brand-700' : 'text-ink-muted hover:text-brand-700'
  }`;
}

/** Vista de catálogo filtrada a proyectos destacados: /proyectos?featured=true */
export function isFeaturedSearch(search: string): boolean {
  return new URLSearchParams(search).get('featured') === 'true';
}

export function isFeaturedProjectsRoute(pathname: string, search: string): boolean {
  return pathname === '/proyectos' && isFeaturedSearch(search);
}

export function isNavLinkActive(id: NavLinkId, pathname: string, search: string): boolean {
  switch (id) {
    case 'home':
      return pathname === '/';
    case 'projects':
      return pathname === '/proyectos' && !isFeaturedSearch(search);
    case 'featured':
      return isFeaturedProjectsRoute(pathname, search);
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}
