import type { Project } from '@/types/project';
import type { CartLineItemInput } from '@/types/cart';

export function projectToCartLineItem(project: Project): CartLineItemInput {
  return {
    projectId: project.id,
    slug: project.slug,
    title: project.title,
    price: project.price,
    currency: project.currency,
    imageUrl: project.imageUrl,
  };
}
