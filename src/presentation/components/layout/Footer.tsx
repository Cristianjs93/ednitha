import { Link } from 'react-router-dom';
import { env } from '@core/config/env';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-stone-900 text-stone-300">
      <div className="container-app grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-white">{env.appName}</p>
          <p className="mt-2 text-sm text-stone-400">{env.appTagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">Explorar</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/proyectos" className="hover:text-white">
                Todos los proyectos
              </Link>
            </li>
            <li>
              <Link to="/proyectos?featured=true" className="hover:text-white">
                Destacados
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">Contacto</p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${env.contactEmail}`} className="hover:text-white">
              {env.contactEmail}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container-app py-6 text-center text-xs text-stone-500">
          © {year} {env.appName}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
