# Reglas de estilo — Ednitha

## Estructura

- Componentes en `src/components/` agrupados por feature (`cart`, `projects`, `ui`, `layout`)
- Páginas solo en `src/pages/` — sin lógica de negocio pesada
- Lógica reutilizable en `hooks/` o `utils/`
- Acceso a JSON/API en `services/`
- Tipos compartidos en `types/`

## TypeScript

- `strict` activo; sin `any`
- `import type` para tipos
- Interfaces en `types/` para entidades de dominio

## React

- Un componente por archivo (PascalCase)
- Datos de catálogo vía `catalogService` + hooks (`useProjects`, `useProject`)
- Carrito vía `useCart()` y Redux, no props drilling

## Estilos

- Tailwind; tokens en `@theme` de `styles/index.css`
- Contenedor: clase `container-app`
- Botones: `cursor-pointer` (global en CSS)

## Tests

- Carpeta `tests/` en la raíz, misma estructura que `src/` (`tests/utils/`, `tests/services/`, …)
- No colocar `*.test.ts` dentro de `src/`
- Vitest; descripciones en español

## Evitar

- Capas tipo clean architecture (domain/application/infrastructure) — proyecto simplificado
- Importar JSON desde componentes — usar `services/catalogService`
- URLs de imagen hardcodeadas en JSX
