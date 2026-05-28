import type { CartLineItem } from '@/types/cart';
import { calculateCartTotals } from '@/utils/cartTotals';
import { formatPrice } from '@/utils/format';

export function buildWhatsAppOrderMessage(items: readonly CartLineItem[], appName: string): string {
  if (items.length === 0) {
    return `¡Hola! Me interesa hacer un pedido en ${appName}.`;
  }

  const lines = items.map((item, index) => {
    const lineTotal = item.price * item.quantity;
    const unitLabel = item.quantity > 1 ? ` x${String(item.quantity)}` : '';
    return `${String(index + 1)}. ${item.title}${unitLabel} — ${formatPrice(lineTotal, item.currency)}`;
  });

  const totals = calculateCartTotals(items);
  const totalLines = totals.map(
    (t) => `*Total (${t.currency}): ${formatPrice(t.subtotal, t.currency)}*`,
  );

  return [
    `¡Hola! Quisiera realizar el siguiente pedido en *${appName}*:`,
    '',
    ...lines,
    '',
    ...totalLines,
    '',
    'Quedo atento/a para coordinar el pago y la entrega. ¡Gracias!',
  ].join('\n');
}

export function buildWhatsAppOrderUrl(
  items: readonly CartLineItem[],
  phoneDigits: string,
  appName: string,
): string {
  const sanitizedPhone = phoneDigits.replace(/\D/g, '');
  const message = buildWhatsAppOrderMessage(items, appName);
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}
