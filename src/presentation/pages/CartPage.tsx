import { Link } from 'react-router-dom';
import { CartLineItemRow } from '@presentation/components/features/cart/CartLineItemRow';
import { CartSummary } from '@presentation/components/features/cart/CartSummary';
import { Button } from '@presentation/components/ui/Button';
import { EmptyState } from '@presentation/components/ui/EmptyState';
import { useCart } from '@presentation/hooks/useCart';

export function CartPage() {
  const { items, isEmpty } = useCart();

  return (
    <div className="container-app py-10">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-ink">Tu carrito</h1>
        <p className="mt-2 text-ink-muted">
          Revisa tus proyectos y finaliza el pedido por WhatsApp.
        </p>
      </header>

      {isEmpty ? (
        <div className="w-full text-center">
          <EmptyState
            title="El carrito está vacío"
            description="Explora nuestros proyectos de manualidades y agrega los que más te gusten."
          />
          <div className="mt-4">
            <Link to="/proyectos">
              <Button>Ver proyectos</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          <ul className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <CartLineItemRow key={item.projectId} item={item} />
            ))}
          </ul>

          <CartSummary />
        </div>
      )}
    </div>
  );
}
