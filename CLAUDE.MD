# Ednitha — Guía para asistentes de IA

## Contexto

MVP de tienda virtual de **manualidades**. React + TypeScript + Tailwind. Catálogo en `src/data/projects.json`. Imágenes en Cloudinary.

Placeholder de imagen:

```
https://res.cloudinary.com/my-projects-cloudinary/image/upload/v1779735683/Ednitha/muneca-trapo_hq9p3g.jpg
```

Usar `resolveImageUrl()` de `@/utils/images` si falta una URL.

## Estructura del proyecto

```
src/
├── components/     # UI por dominio (ui, layout, cart, home, projects)
├── pages/          # Vistas de rutas
├── hooks/          # Lógica de estado en React
├── store/          # Redux (carrito)
├── services/       # Acceso a datos y WhatsApp
├── types/          # Tipos e interfaces TypeScript
├── utils/          # Helpers puros (format, env, cartTotals)
├── data/           # projects.json
├── routes/         # React Router
├── providers/      # Context / Redux Provider
└── styles/         # Tailwind global
```

Importaciones con alias `@/` → `src/`.

## Convenciones

- TypeScript strict, sin `any`
- Props con `readonly` en componentes
- UI en español; código en inglés
- Estilos solo con Tailwind (`src/styles/index.css`)

## Datos

- Editar `src/data/projects.json`
- `difficulty`: `principiante` | `intermedio` | `avanzado`
- `currency`: `COP` | `USD`

## Prerender (SSG)

- Plugin: `vite-prerender-plugin` en `vite.config.ts`
- `src/prerender.tsx` exporta `prerender()`
- Rutas en `scripts/getStaticRoutes.ts`
- Meta por página: `src/utils/pageHead.ts`

## Carrito

- Redux: `src/store/cartSlice.ts`, persistencia `localStorage` (`ednitha-cart`)
- Hook: `useCart()`
- Checkout WhatsApp: `buildWhatsAppOrderUrl()` + `VITE_WHATSAPP_PHONE`

## Comandos

```bash
npm run dev
npm run validate
npm run build
```

## Estilo

Ver `.claude/rules/code.style.md`
