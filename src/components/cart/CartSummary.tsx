import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/format';
import { useCart } from '@/hooks/useCart';

export function CartSummary() {
  const { totals, isEmpty, whatsAppCheckoutUrl, clear } = useCart();

  if (isEmpty) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-border bg-surface-elevated p-6 lg:sticky lg:top-24">
      <h2 className="font-display text-xl text-ink">Resumen del pedido</h2>

      <ul className="mt-4 space-y-2 border-b border-border pb-4">
        {totals.map((total) => (
          <li key={total.currency} className="flex justify-between text-sm">
            <span className="text-ink-muted">
              Subtotal ({total.currency}) · {total.itemCount}{' '}
              {total.itemCount === 1 ? 'artículo' : 'artículos'}
            </span>
            <span className="font-semibold text-ink">
              {formatPrice(total.subtotal, total.currency)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-ink-muted">
        Al continuar se abrirá WhatsApp con el detalle de tu pedido para coordinar pago y entrega
        con nuestro equipo.
      </p>

      <a
        href={whatsAppCheckoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block"
      >
        <Button fullWidth size="lg">
          Finalizar pedido por WhatsApp
        </Button>
      </a>

      <button
        type="button"
        className="mt-3 w-full text-center text-sm text-ink-muted hover:text-red-600"
        onClick={clear}
      >
        Vaciar carrito
      </button>

      <Link
        to="/proyectos"
        className="mt-4 block text-center text-sm font-medium text-brand-700 hover:underline"
      >
        Seguir comprando
      </Link>
    </aside>
  );
}
