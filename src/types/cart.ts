export interface CartLineItem {
  readonly projectId: string;
  readonly slug: string;
  readonly title: string;
  readonly price: number;
  readonly currency: 'COP' | 'USD';
  readonly imageUrl: string;
  readonly quantity: number;
}

export type CartLineItemInput = Omit<CartLineItem, 'quantity'>;
