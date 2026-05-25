import { Link } from 'react-router-dom';
import type { CartLineItem } from '@domain/entities/CartLineItem';
import { CloudinaryImage } from '@presentation/components/ui/CloudinaryImage';
import { formatPrice } from '@presentation/utils/format';
import { useCart } from '@presentation/hooks/useCart';

export interface CartLineItemRowProps {
  readonly item: CartLineItem;
}

export function CartLineItemRow({ item }: CartLineItemRowProps) {
  const { increment, decrement, removeProject } = useCart();
  const lineTotal = item.price * item.quantity;

  return (
    <li className="flex gap-4 rounded-2xl border border-border bg-surface-elevated p-4">
      <Link
        to={`/proyectos/${item.slug}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl"
      >
        <CloudinaryImage src={item.imageUrl} alt={item.title} aspectRatio="square" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <Link
          to={`/proyectos/${item.slug}`}
          className="font-display text-lg text-ink hover:text-brand-700"
        >
          {item.title}
        </Link>

        <p className="mt-1 text-sm text-ink-muted">
          {formatPrice(item.price, item.currency)} c/u
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <div className="inline-flex items-center rounded-full border border-border">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-l-full text-lg hover:bg-brand-50"
              aria-label="Disminuir cantidad"
              onClick={() => {
                decrement(item.projectId);
              }}
            >
              −
            </button>
            <span className="min-w-[2rem] px-2 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-r-full text-lg hover:bg-brand-50"
              aria-label="Aumentar cantidad"
              onClick={() => {
                increment(item.projectId);
              }}
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-brand-800">
              {formatPrice(lineTotal, item.currency)}
            </span>
            <button
              type="button"
              className="text-sm text-red-600 hover:underline"
              onClick={() => {
                removeProject(item.projectId);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
