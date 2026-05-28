import { describe, it, expect } from 'vitest';
import { buildWhatsAppOrderMessage, buildWhatsAppOrderUrl } from '@/services/whatsappOrder';
import type { CartLineItem } from '@/types/cart';

const sampleItem: CartLineItem = {
  projectId: 'proj-1',
  slug: 'test',
  title: 'Muñeca de trapo',
  price: 349,
  currency: 'COP',
  imageUrl: 'https://example.com/img.jpg',
  quantity: 2,
};

describe('whatsappOrder', () => {
  it('incluye productos y total en el mensaje', () => {
    const message = buildWhatsAppOrderMessage([sampleItem], 'Ednitha');
    expect(message).toContain('Muñeca de trapo');
    expect(message).toContain('x2');
    expect(message).toContain('Total (COP)');
  });

  it('genera URL de WhatsApp con teléfono y texto codificado', () => {
    const url = buildWhatsAppOrderUrl([sampleItem], '573185755283', 'Ednitha');
    expect(url).toMatch(/^https:\/\/wa\.me\/573185755283\?text=/);
    expect(decodeURIComponent(url.split('text=')[1] ?? '')).toContain('Ednitha');
  });
});
