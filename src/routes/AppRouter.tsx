import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { CartPage } from '@/pages/CartPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export interface AppRouterProps {
  /** URL inicial para prerender en build (MemoryRouter). Sin prop → BrowserRouter en el cliente. */
  readonly url?: string;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="proyectos/:slug" element={<ProjectDetailPage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function AppRouter({ url }: AppRouterProps = {}) {
  if (url !== undefined) {
    return (
      <MemoryRouter initialEntries={[url]} initialIndex={0}>
        <AppRoutes />
      </MemoryRouter>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
