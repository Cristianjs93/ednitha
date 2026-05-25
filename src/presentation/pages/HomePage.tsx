import { Link } from 'react-router-dom';
import { HeroSection } from '@presentation/components/features/home/HeroSection';
import { CategoryStrip } from '@presentation/components/features/home/CategoryStrip';
import { ProjectGrid } from '@presentation/components/features/projects/ProjectGrid';
import { Spinner } from '@presentation/components/ui/Spinner';
import { Button } from '@presentation/components/ui/Button';
import { useProjects } from '@presentation/hooks/useProjects';
import { useCategories } from '@presentation/hooks/useCategories';

export function HomePage() {
  const featuredState = useProjects({ featured: true });
  const categoriesState = useCategories();

  return (
    <>
      <HeroSection />

      <section className="container-app py-14">
        <h2 className="text-center font-display text-2xl text-ink">Explora por categoría</h2>
        <div className="mt-8">
          <CategoryStrip state={categoriesState} />
        </div>
      </section>

      <section className="bg-brand-50/50 py-14">
        <div className="container-app">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl text-ink">Proyectos destacados</h2>
              <p className="mt-2 text-ink-muted">Los favoritos de nuestra comunidad creativa</p>
            </div>
            <Link to="/proyectos">
              <Button variant="ghost">Ver todos</Button>
            </Link>
          </div>

          {featuredState.status === 'loading' && <Spinner />}
          {featuredState.status === 'error' && (
            <p className="text-center text-red-600">{featuredState.message}</p>
          )}
          {featuredState.status === 'success' && <ProjectGrid projects={featuredState.data} />}
        </div>
      </section>

      <section className="container-app py-16 text-center">
        <h2 className="font-display text-2xl text-ink">¿Lista para tu próximo proyecto?</h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-muted">
          Cada kit incluye materiales, instrucciones claras e imágenes de referencia en alta
          calidad.
        </p>
        <div className="mt-6">
          <Link to="/proyectos">
            <Button size="lg">Empezar ahora</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
