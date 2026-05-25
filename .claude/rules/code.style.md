# Reglas de estilo — Ednitha

## TypeScript

- Activar y respetar `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- Usar `type` para unions y objetos de solo lectura; `interface` para contratos extensibles (puertos)
- Importaciones de tipos: `import type { X } from '...'`
- Evitar aserciones `as` salvo branded types (`createProjectId`)
- Exportar tipos junto a entidades en `domain/entities`

## React

- Un componente por archivo; nombre del archivo = nombre del componente (PascalCase)
- Props siempre con prefijo explícito en la desestructuración y marcadas `readonly` en la interfaz
- Lógica de datos en hooks (`useProjects`, `useProject`), no en componentes de presentación pesados
- `key` estable: preferir `project.id` sobre índice de array
- Accesibilidad: `aria-label` en botones icono, `role="status"` en spinners

## Capas y SOLID

- Nuevo origen de datos → nueva clase en `infrastructure/repositories` que implemente el puerto existente
- Nueva operación de negocio → nuevo caso de uso en `application/use-cases`, registrar en `ProjectService` y `container.ts`
- No duplicar lógica de filtrado entre UI y repositorio: filtros en `ProjectFilters` del puerto

## Estilos (Tailwind)

- Usar clases del tema: `brand-*`, `ink`, `surface`, `border`
- Contenedor principal: `container-app`
- Bordes redondeados consistentes: `rounded-2xl` tarjetas, `rounded-full` botones
- Responsive mobile-first: prefijos `sm:`, `md:`, `lg:`

## Tests

- Ubicación: junto al módulo (`*.test.ts`) o en `src/test` para setup
- Nombrar tests en español descriptivo: `it('filtra proyectos destacados', ...)`
- Probar mappers y repositorios; UI solo cuando aporte valor

## Commits sugeridos (Conventional Commits)

- `feat:` nueva funcionalidad
- `fix:` corrección
- `refactor:` sin cambio de comportamiento
- `docs:` documentación
- `chore:` tooling

## Prohibido

- `any`, `@ts-ignore` sin justificación documentada
- Importar JSON desde `presentation/`
- Hardcodear URLs de imágenes en componentes (usar env o `resolveImageUrl`)
- Lógica de negocio compleja dentro de JSX
