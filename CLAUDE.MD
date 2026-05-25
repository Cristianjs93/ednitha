# Ednitha — Guía para asistentes de IA

## Contexto del proyecto

MVP de tienda virtual de **manualidades**. Frontend estático con React + TypeScript + Tailwind. Los proyectos se leen desde `src/data/projects.json`. Imágenes vía URLs de **Cloudinary**.

Placeholder global de imágenes:

```
https://res.cloudinary.com/my-projects-cloudinary/image/upload/v1779735683/Ednitha/muneca-trapo_hq9p3g.jpg
```

Usar `resolveImageUrl()` de `@core/constants/images` cuando una URL pueda faltar.

## Arquitectura obligatoria

Respetar las capas y el sentido de dependencias:

| Capa | Puede importar de |
|------|-------------------|
| `domain` | Solo tipos/utilidades puras en `domain` |
| `application` | `domain`, `core` |
| `infrastructure` | `domain`, `core`, `data` |
| `presentation` | `application` (vía hooks/DI), `domain` (tipos), `core`, `presentation` |
| `app` | Todas (composición / DI) |

**No** importar `infrastructure` desde `presentation` directamente. Usar `projectService` desde `@app/di/container` o hooks.

## Convenciones de código

- TypeScript **strict**: sin `any`, preferir `readonly` en entidades y props
- Tipos de marca para IDs: `ProjectId`, `CategoryId`
- Resultados con `Result<T>` en repositorios y casos de uso
- Componentes funcionales; props con `readonly`
- Nombres en español para UI y datos de negocio; código (identificadores) en inglés
- CSS solo con utilidades Tailwind; tokens en `src/styles/index.css` (`@theme`)

## Al agregar un proyecto

1. Añadir entrada en `src/data/projects.json`
2. Validar `difficulty`: `principiante` | `intermedio` | `avanzado`
3. Validar `currency`: `COP` | `USD`
4. URLs de imagen completas de Cloudinary

## Comandos útiles

```bash
npm run dev
npm run validate
npm run build
```

## Carrito (Redux)

- Store: `src/app/store/` — slice `cart`, persistencia `localStorage` (`ednitha-cart`)
- Hook: `useCart()` — agregar, quitar, cantidades, URL WhatsApp
- Checkout: `WhatsAppOrderService` + `VITE_WHATSAPP_PHONE` (default `573185755283`)
- Ruta: `/carrito`

## Archivos clave

- DI: `src/app/di/container.ts`
- Datos: `src/data/projects.json`
- Env: `src/core/config/env.ts`
- Router: `src/app/router/AppRouter.tsx`

## Reglas adicionales

Ver `.claude/rules/code.style.md` para estilo detallado.
