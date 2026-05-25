import type { CartLineItem } from '@domain/entities/CartLineItem';
import { calculateCartTotals } from '@domain/services/calculateCartTotals';
import { formatPrice } from '@core/utils/format';

export class WhatsAppOrderService {
  buildOrderMessage(items: readonly CartLineItem[], appName: string): string {
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

  buildOrderUrl(items: readonly CartLineItem[], phoneDigits: string, appName: string): string {
    const sanitizedPhone = phoneDigits.replace(/\D/g, '');
    const message = this.buildOrderMessage(items, appName);
    return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
  }
}
