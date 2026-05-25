import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@presentation/components/layout/MainLayout';
import { HomePage } from '@presentation/pages/HomePage';
import { ProjectsPage } from '@presentation/pages/ProjectsPage';
import { ProjectDetailPage } from '@presentation/pages/ProjectDetailPage';
import { NotFoundPage } from '@presentation/pages/NotFoundPage';
import { CartPage } from '@presentation/pages/CartPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="proyectos" element={<ProjectsPage />} />
          <Route path="proyectos/:slug" element={<ProjectDetailPage />} />
          <Route path="carrito" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
