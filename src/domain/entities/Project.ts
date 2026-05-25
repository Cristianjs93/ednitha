import type { CategoryId } from '@domain/entities/Category';
import type { DifficultyLevel } from '@domain/entities/Difficulty';

export type ProjectId = string & { readonly __brand: 'ProjectId' };

export function createProjectId(value: string): ProjectId {
  return value as ProjectId;
}

export interface ProjectMaterial {
  readonly name: string;
  readonly quantity: string;
  readonly optional: boolean;
}

export interface ProjectStep {
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
}

export interface Project {
  readonly id: ProjectId;
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly categoryId: CategoryId;
  readonly difficulty: DifficultyLevel;
  readonly durationMinutes: number;
  readonly price: number;
  readonly currency: 'COP' | 'USD';
  readonly featured: boolean;
  readonly tags: readonly string[];
  readonly imageUrl: string;
  readonly galleryUrls: readonly string[];
  readonly materials: readonly ProjectMaterial[];
  readonly steps: readonly ProjectStep[];
  readonly createdAt: string;
  readonly updatedAt: string;
}
