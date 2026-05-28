import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';

export function CartIconLink() {
  const { itemCount } = useCart();

  return (
    <Link
      to="/carrito"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-ink transition hover:border-brand-300 hover:bg-brand-50"
      aria-label={`Carrito de compras, ${String(itemCount)} artículos`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-700 px-1 text-xs font-bold text-white">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
