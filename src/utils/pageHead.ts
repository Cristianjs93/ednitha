import catalogData from '@/data/projects.json';
import type { CatalogDto } from '@/types/catalog';
import { env } from '@/utils/env';
import { PLACEHOLDER_IMAGE_URL, resolveImageUrl } from '@/utils/images';
import { isFeaturedProjectsRoute } from '@/utils/navigation';

const catalog = catalogData as CatalogDto;

const DEFAULT_DESCRIPTION =
  'Ednitha — tienda virtual de manualidades. Proyectos creativos, kits y tutoriales para hacer en casa.';

interface HeadMeta {
  readonly name?: string;
  readonly property?: string;
  readonly content: string;
}

interface HeadLink {
  readonly rel: string;
  readonly href: string;
}

export type HeadElement =
  | { readonly type: 'meta'; readonly props: HeadMeta }
  | { readonly type: 'link'; readonly props: HeadLink };

export interface PageHeadConfig {
  readonly lang: string;
  readonly title: string;
  readonly canonicalUrl: string;
  readonly elements: ReadonlySet<HeadElement>;
}

function meta(props: HeadMeta): HeadElement {
  return { type: 'meta', props };
}

function link(props: HeadLink): HeadElement {
  return { type: 'link', props };
}

function toAbsoluteUrl(pathname: string, search: string): string {
  const base = env.siteUrl.replace(/\/$/, '');
  return `${base}${pathname}${search}`;
}

export function getPageHead(url: string, appName = env.appName): PageHeadConfig {
  const parsed = new URL(url, 'http://localhost');
  const { pathname, search } = parsed;
  const canonicalUrl = toAbsoluteUrl(pathname, search);

  let title = `${appName} | Manualidades y proyectos creativos`;
  let description = DEFAULT_DESCRIPTION;
  let imageUrl = PLACEHOLDER_IMAGE_URL;

  if (pathname === '/') {
    title = `${appName} | Manualidades y proyectos creativos`;
  } else if (isFeaturedProjectsRoute(pathname, search)) {
    title = `Proyectos destacados | ${appName}`;
    description = 'Los proyectos de manualidades favoritos de nuestra comunidad creativa.';
  } else if (pathname === '/proyectos') {
    title = `Catálogo de proyectos | ${appName}`;
    description = 'Explora kits y tutoriales de manualidades para todos los niveles.';
  } else if (pathname.startsWith('/proyectos/')) {
    const slug = pathname.replace('/proyectos/', '');
    const project = catalog.projects.find((item) => item.slug === slug);
    if (project) {
      title = `${project.title} | ${appName}`;
      description = project.shortDescription;
      imageUrl = resolveImageUrl(project.imageUrl);
    }
  } else if (pathname === '/carrito') {
    title = `Carrito | ${appName}`;
    description = 'Revisa los proyectos de manualidades en tu carrito antes de pedir por WhatsApp.';
  } else if (pathname !== '/') {
    title = `Página no encontrada | ${appName}`;
    description = DEFAULT_DESCRIPTION;
  }

  return {
    lang: 'es',
    title,
    canonicalUrl,
    elements: new Set([
      meta({ name: 'description', content: description }),
      meta({ property: 'og:type', content: 'website' }),
      meta({ property: 'og:locale', content: 'es_CO' }),
      meta({ property: 'og:url', content: canonicalUrl }),
      meta({ property: 'og:title', content: title }),
      meta({ property: 'og:description', content: description }),
      meta({ property: 'og:image', content: imageUrl }),
      meta({ name: 'twitter:card', content: 'summary_large_image' }),
      meta({ name: 'twitter:title', content: title }),
      meta({ name: 'twitter:description', content: description }),
      meta({ name: 'twitter:image', content: imageUrl }),
      link({ rel: 'canonical', href: canonicalUrl }),
    ]),
  };
}

function upsertMeta(attributes: HeadMeta): void {
  if (typeof document === 'undefined') return;

  const key = attributes.property ?? attributes.name;
  if (key === undefined) return;

  const selector =
    attributes.property !== undefined
      ? `meta[property="${attributes.property}"]`
      : `meta[name="${attributes.name ?? ''}"]`;

  let element = document.querySelector(selector);
  if (element === null) {
    element = document.createElement('meta');
    if (attributes.property !== undefined) {
      element.setAttribute('property', attributes.property);
    }
    if (attributes.name !== undefined) {
      element.setAttribute('name', attributes.name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute('content', attributes.content);
}

function upsertLink(attributes: HeadLink): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`link[rel="${attributes.rel}"]`);
  if (element === null) {
    element = document.createElement('link');
    element.setAttribute('rel', attributes.rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', attributes.href);
}

/** Sincroniza title, meta y canonical en el cliente (dev y navegación SPA). */
export function applyPageHead(config: PageHeadConfig): void {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = config.lang;
  document.title = config.title;

  for (const element of config.elements) {
    if (element.type === 'meta') {
      upsertMeta(element.props);
    } else {
      upsertLink(element.props);
    }
  }
}
