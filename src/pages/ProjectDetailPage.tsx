import { Link, useParams } from 'react-router-dom';
import { useProject } from '@/hooks/useProject';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { Spinner } from '@/components/ui/Spinner';
import { formatDifficulty, formatDuration, formatPrice } from '@/utils/format';
import { env } from '@/utils/env';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const state = useProject(slug);

  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <div className="container-app py-16">
        <Spinner label="Cargando proyecto..." />
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="container-app py-16 text-center">
        <h1 className="font-display text-2xl text-ink">Proyecto no encontrado</h1>
        <p className="mt-2 text-ink-muted">{state.message}</p>
        <Link to="/proyectos" className="mt-6 inline-block">
          <Button>Volver al catálogo</Button>
        </Link>
      </div>
    );
  }

  if (state.status === 'success') {
    const project = state.data;

    return (
    <article className="pb-16">
      <div className="bg-gradient-to-b from-brand-50 to-surface">
        <div className="container-app grid gap-10 py-10 lg:grid-cols-2 lg:items-center lg:py-14">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <CloudinaryImage
              src={project.imageUrl}
              alt={project.title}
              aspectRatio="square"
              loading="eager"
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">{formatDifficulty(project.difficulty)}</Badge>
              <Badge tone="neutral">{formatDuration(project.durationMinutes)}</Badge>
              {project.featured && <Badge tone="accent">Destacado</Badge>}
            </div>

            <h1 className="mt-4 font-display text-4xl text-ink">{project.title}</h1>
            <p className="mt-4 text-lg text-ink-muted">{project.shortDescription}</p>

            <p className="mt-6 text-3xl font-bold text-brand-800">
              {formatPrice(project.price, project.currency)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <AddToCartButton project={project} size="lg" />
              <a href={`mailto:${env.contactEmail}?subject=Consulta: ${project.title}`}>
                <Button variant="outline" size="lg">
                  Consultar
                </Button>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-app mt-12 grid gap-12 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="font-display text-2xl text-ink">Descripción</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">{project.description}</p>

          <h2 className="mt-12 font-display text-2xl text-ink">Pasos del proyecto</h2>
          <ol className="mt-6 space-y-8">
            {project.steps.map((step) => (
              <li
                key={step.order}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-elevated p-5 sm:flex-row"
              >
                <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                  <CloudinaryImage src={step.imageUrl} alt={step.title} aspectRatio="video" />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-700">Paso {step.order}</span>
                  <h3 className="mt-1 font-display text-lg text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside>
          <div className="sticky top-24 rounded-2xl border border-border bg-surface-elevated p-6">
            <h2 className="font-display text-xl text-ink">Materiales</h2>
            <ul className="mt-4 space-y-3">
              {project.materials.map((material) => (
                <li key={material.name} className="flex justify-between gap-2 text-sm">
                  <span className="text-ink">
                    {material.name}
                    {material.optional && (
                      <span className="ml-1 text-xs text-ink-muted">(opcional)</span>
                    )}
                  </span>
                  <span className="shrink-0 font-medium text-ink-muted">{material.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {project.galleryUrls.length > 1 && (
        <section className="container-app mt-16">
          <h2 className="font-display text-2xl text-ink">Galería</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.galleryUrls.map((url, index) => (
              <div key={`${url}-${index}`} className="overflow-hidden rounded-2xl">
                <CloudinaryImage src={url} alt={`${project.title} ${index + 1}`} aspectRatio="video" />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
    );
  }

  return null;
}
