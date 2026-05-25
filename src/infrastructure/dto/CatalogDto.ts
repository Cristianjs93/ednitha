export interface CategoryDto {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
}

export interface ProjectMaterialDto {
  readonly name: string;
  readonly quantity: string;
  readonly optional: boolean;
}

export interface ProjectStepDto {
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
}

export interface ProjectDto {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly categoryId: string;
  readonly difficulty: string;
  readonly durationMinutes: number;
  readonly price: number;
  readonly currency: string;
  readonly featured: boolean;
  readonly tags: readonly string[];
  readonly imageUrl: string;
  readonly galleryUrls: readonly string[];
  readonly materials: readonly ProjectMaterialDto[];
  readonly steps: readonly ProjectStepDto[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CatalogDto {
  readonly categories: readonly CategoryDto[];
  readonly projects: readonly ProjectDto[];
}
