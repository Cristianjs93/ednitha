export type CategoryId = string & { readonly __brand: 'CategoryId' };

export function createCategoryId(value: string): CategoryId {
  return value as CategoryId;
}

export interface Category {
  readonly id: CategoryId;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
}
