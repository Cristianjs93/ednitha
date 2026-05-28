import type { DifficultyLevel } from '@/types/difficulty';

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
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly categoryId: string;
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

export interface ProjectFilters {
  readonly categorySlug?: string;
  readonly difficulty?: string;
  readonly featured?: boolean;
  readonly search?: string;
}
