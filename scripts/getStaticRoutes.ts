import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface CatalogJson {
  readonly projects: readonly { readonly slug: string }[];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getStaticRoutes(): string[] {
  const filePath = path.resolve(__dirname, '../src/data/projects.json');
  const catalog = JSON.parse(readFileSync(filePath, 'utf-8')) as CatalogJson;

  const projectRoutes = catalog.projects.map((project) => `/proyectos/${project.slug}`);

  return ['/', '/proyectos', '/proyectos?featured=true', ...projectRoutes];
}
