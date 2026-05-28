import { describe, expect, it } from 'vitest';
import { getPageHead } from '@/utils/pageHead';

function metaContent(
  config: ReturnType<typeof getPageHead>,
  key: { readonly name?: string; readonly property?: string },
): string | undefined {
  const element = [...config.elements].find((item) => {
    if (item.type !== 'meta') return false;
    if (key.property !== undefined) return item.props.property === key.property;
    return item.props.name === key.name;
  });
  return element?.type === 'meta' ? element.props.content : undefined;
}

describe('getPageHead', () => {
  it('incluye og:image y url canónica en la home', () => {
    const head = getPageHead('/', 'Ednitha');

    expect(head.title).toContain('Ednitha');
    expect(head.canonicalUrl).toMatch(/\/$/);
    expect(metaContent(head, { property: 'og:image' })).toMatch(/^https:\/\//);
    expect(metaContent(head, { property: 'og:url' })).toBe(head.canonicalUrl);
  });

  it('usa imagen del proyecto en detalle', () => {
    const head = getPageHead('/proyectos/muneca-de-trapo', 'Ednitha');

    expect(head.title).toContain('Muñeca de trapo');
    expect(metaContent(head, { property: 'og:image' })).toMatch(/cloudinary\.com/);
    expect(metaContent(head, { name: 'description' })).toContain('Muñeca artesanal');
  });

  it('diferencia catálogo y destacados', () => {
    const catalog = getPageHead('/proyectos', 'Ednitha');
    const featured = getPageHead('/proyectos?featured=true', 'Ednitha');

    expect(catalog.title).toContain('Catálogo');
    expect(featured.title).toContain('destacados');
    expect(catalog.canonicalUrl).not.toBe(featured.canonicalUrl);
  });
});
