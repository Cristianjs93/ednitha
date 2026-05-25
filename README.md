# Ednitha — Tienda virtual de manualidades (MVP)

Frontend estático profesional para un catálogo de proyectos creativos. Los datos viven en JSON local; las imágenes se sirven desde **Cloudinary** mediante URLs configurables.

## Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS 4 |
| Build | Vite 6 |
| Routing | React Router 7 |
| Calidad | ESLint 9 + Prettier |
| Tests | Vitest + Testing Library |

## Arquitectura (Clean Architecture)

El código sigue capas con dependencias hacia el dominio (principio de inversión de dependencias / SOLID):

```
src/
├── app/              # Bootstrap, router, DI container
├── core/             # Config (env), utilidades, tipos compartidos
├── domain/           # Entidades y puertos (interfaces)
├── application/      # Casos de uso y servicios de aplicación
├── infrastructure/   # Repositorios JSON, mappers, DTOs
├── data/             # projects.json (fuente de datos estática)
└── presentation/     # UI: componentes, páginas, hooks
```

| Principio SOLID | Aplicación en el proyecto |
|-----------------|---------------------------|
| **S** — Responsabilidad única | Cada caso de uso hace una operación; componentes UI enfocados |
| **O** — Abierto/cerrado | Nuevos repositorios (API REST) sin cambiar casos de uso |
| **L** — Sustitución de Liskov | Implementaciones de `IProjectRepository` intercambiables |
| **I** — Segregación de interfaces | Puertos pequeños (`IProjectRepository`, `ICategoryRepository`) |
| **D** — Inversión de dependencias | `application` depende de puertos, no de JSON concreto |

### Flujo de datos

1. `projects.json` → `JsonProjectRepository`
2. Mapper DTO → entidad de dominio
3. Caso de uso (`GetProjectsUseCase`) → `ProjectService`
4. Hook (`useProjects`) → componentes React

## Requisitos

- **Node.js** ≥ 20 (ver `.nvmrc`)
- **npm** ≥ 10

## Instalación

```bash
# Clonar o entrar al directorio del proyecto
cd ednitha

# Copiar variables de entorno
cp .env.example .env

# Instalar dependencias
npm install
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta según tu entorno:

| Variable | Descripción |
|----------|-------------|
| `VITE_APP_NAME` | Nombre de la marca en la UI |
| `VITE_APP_TAGLINE` | Subtítulo / eslogan |
| `VITE_SITE_URL` | URL pública del sitio |
| `VITE_CONTACT_EMAIL` | Email de contacto |
| `VITE_CLOUDINARY_BASE_URL` | Base del CDN Cloudinary |
| `VITE_CLOUDINARY_PLACEHOLDER_URL` | Imagen por defecto si falta URL |
| `VITE_DEV_PORT` | Puerto del servidor de desarrollo |
| `VITE_PREVIEW_PORT` | Puerto de `vite preview` |
| `VITE_WHATSAPP_PHONE` | Teléfono WhatsApp para pedidos (sin `+`) |

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Typecheck + build de producción en `dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npm run lint` | ESLint (0 warnings permitidos) |
| `npm run lint:fix` | ESLint con autofix |
| `npm run format` | Formatea con Prettier |
| `npm run format:check` | Verifica formato sin escribir |
| `npm run typecheck` | Solo comprobación TypeScript |
| `npm run test` | Tests unitarios (una ejecución) |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con reporte de cobertura |
| `npm run validate` | Pipeline local: typecheck + lint + format + test |

## Comandos de desarrollo

```bash
cp .env.example .env
npm install
npm run dev
```

Abre `http://localhost:5173` (o el puerto definido en `VITE_DEV_PORT`).

### Aliases de importación

Configurados en `vite.config.ts` y `tsconfig.app.json`:

- `@/` → `src/`
- `@app/`, `@core/`, `@domain/`, `@application/`, `@infrastructure/`, `@presentation/`, `@data/`

Ejemplo:

```ts
import { projectService } from '@app/di/container';
import type { Project } from '@domain/entities/Project';
```

## Comandos de build

```bash
npm run build
npm run preview
```

Artefactos en `dist/`, listos para hosting estático o Docker.

## Comandos de testing

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Docker

### Build y ejecución

```bash
docker build -t ednitha-frontend .
docker run -p 8080:80 ednitha-frontend
```

### Docker Compose

```bash
docker compose up --build
```

Sitio en `http://localhost:8080`.

## Catálogo de datos

Edita `src/data/projects.json` para agregar categorías o proyectos. Cada proyecto debe incluir `imageUrl` y URLs de galería/pasos apuntando a Cloudinary.

Placeholder por defecto:

`https://res.cloudinary.com/my-projects-cloudinary/image/upload/v1779735683/Ednitha/muneca-trapo_hq9p3g.jpg`

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Inicio + destacados |
| `/proyectos` | Catálogo con filtros |
| `/proyectos/:slug` | Detalle del proyecto |
| `/carrito` | Carrito + checkout por WhatsApp |
| `*` | 404 |

## Carrito de compras

- Estado global con **Redux Toolkit** (`src/app/store/cartSlice.ts`)
- Persistencia en `localStorage` (clave `ednitha-cart`)
- Agregar / quitar / cambiar cantidades desde catálogo y detalle
- Totalización por moneda (COP / USD)
- Checkout: abre WhatsApp con mensaje prellenado (`VITE_WHATSAPP_PHONE`, por defecto `573185755283`)

## Evolución futura

- Sustituir `JsonProjectRepository` por cliente HTTP sin tocar casos de uso
- Carrito y checkout (nueva capa `application`)
- CMS headless o API para sincronizar `projects.json`
- i18n y SEO con meta dinámicos

## Licencia

Proyecto privado — MVP Ednitha.
