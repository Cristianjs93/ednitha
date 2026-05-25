import { Link } from 'react-router-dom';
import { env } from '@core/config/env';
import { PLACEHOLDER_IMAGE_URL } from '@core/constants/images';
import { Button } from '@presentation/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-surface to-amber-50">
      <div className="container-app grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-semibold tracking-wide text-brand-700 uppercase">
            {env.appTagline}
          </p>
          <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Crea con tus manos,{' '}
            <span className="text-brand-700 italic">inspírate con Ednitha</span>
          </h1>
          <p className="mt-6 text-lg text-ink-muted">
            Kits de manualidades, tutoriales paso a paso y proyectos listos para regalar o decorar
            tu hogar. Todo en un solo lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/proyectos">
              <Button size="lg">Explorar proyectos</Button>
            </Link>
            <Link to="/proyectos?featured=true">
              <Button variant="outline" size="lg">
                Ver destacados
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 -right-4 h-full w-full rounded-3xl bg-brand-200/60" />
          <img
            src={PLACEHOLDER_IMAGE_URL}
            alt="Proyecto destacado de manualidades"
            className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
