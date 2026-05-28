export const NAV_LINKS = [
  { id: 'home', to: '/', label: 'Inicio' },
  { id: 'projects', to: '/proyectos', label: 'Proyectos' },
  { id: 'featured', to: '/proyectos?featured=true', label: 'Destacados' },
] as const;

export type NavLinkId = (typeof NAV_LINKS)[number]['id'];

export type NavLinkConfig = (typeof NAV_LINKS)[number];
