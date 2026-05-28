import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="container-app flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-bold text-brand-200">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink">Página no encontrada</h1>
      <p className="mt-2 max-w-md text-ink-muted">
        La ruta que buscas no existe. Regresa al inicio o explora nuestros proyectos.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/">
          <Button>Inicio</Button>
        </Link>
        <Link to="/proyectos">
          <Button variant="outline">Proyectos</Button>
        </Link>
      </div>
    </div>
  );
}
