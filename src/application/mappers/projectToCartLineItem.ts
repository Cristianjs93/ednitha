import type { Project } from '@domain/entities/Project';
import type { CartLineItemInput } from '@domain/entities/CartLineItem';

export function projectToCartLineItem(project: Project): CartLineItemInput {
  return {
    projectId: String(project.id),
    slug: project.slug,
    title: project.title,
    price: project.price,
    currency: project.currency,
    imageUrl: project.imageUrl,
  };
}
