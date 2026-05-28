import catalogData from '@/data/projects.json';
import type { CatalogDto, ProjectDto } from '@/types/catalog';
import type { Category } from '@/types/category';
import type { Project, ProjectFilters } from '@/types/project';
import { isDifficultyLevel } from '@/types/difficulty';

const catalog = catalogData as CatalogDto;

let projectsCache: Project[] | null = null;

function mapProject(dto: ProjectDto): Project {
  if (!isDifficultyLevel(dto.difficulty)) {
    throw new Error(`Dificultad inválida: ${dto.difficulty}`);
  }

  if (dto.currency !== 'COP' && dto.currency !== 'USD') {
    throw new Error(`Moneda inválida: ${dto.currency}`);
  }

  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    shortDescription: dto.shortDescription,
    description: dto.description,
    categoryId: dto.categoryId,
    difficulty: dto.difficulty,
    durationMinutes: dto.durationMinutes,
    price: dto.price,
    currency: dto.currency,
    featured: dto.featured,
    tags: [...dto.tags],
    imageUrl: dto.imageUrl,
    galleryUrls: [...dto.galleryUrls],
    materials: dto.materials.map((m) => ({
      name: m.name,
      quantity: m.quantity,
      optional: m.optional,
    })),
    steps: dto.steps.map((s) => ({
      order: s.order,
      title: s.title,
      description: s.description,
      imageUrl: s.imageUrl,
    })),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

function getAllProjects(): Project[] {
  if (projectsCache === null) {
    projectsCache = catalog.projects.map(mapProject);
  }
  return projectsCache;
}

function filterProjects(projects: Project[], filters?: ProjectFilters): Project[] {
  let result = [...projects];

  if (filters?.featured === true) {
    result = result.filter((p) => p.featured);
  }

  if (filters?.difficulty !== undefined && filters.difficulty.length > 0) {
    result = result.filter((p) => p.difficulty === filters.difficulty);
  }

  if (filters?.categorySlug !== undefined && filters.categorySlug.length > 0) {
    const category = catalog.categories.find((c) => c.slug === filters.categorySlug);
    if (category) {
      result = result.filter((p) => p.categoryId === category.id);
    }
  }

  if (filters?.search !== undefined && filters.search.trim().length > 0) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  return result;
}

export function getProjectsSync(filters?: ProjectFilters): Project[] {
  return filterProjects(getAllProjects(), filters);
}

export function getProjectBySlugSync(slug: string): Project {
  const trimmed = slug.trim();
  const project = getAllProjects().find((p) => p.slug === trimmed);

  if (project === undefined) {
    throw new Error(`Proyecto no encontrado: ${trimmed}`);
  }

  return project;
}

export function getCategoriesSync(): Category[] {
  return catalog.categories.map((dto) => ({
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    description: dto.description,
  }));
}

export async function fetchProjects(filters?: ProjectFilters): Promise<Project[]> {
  return getProjectsSync(filters);
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  return getProjectBySlugSync(slug);
}

export async function fetchCategories(): Promise<Category[]> {
  return getCategoriesSync();
}
