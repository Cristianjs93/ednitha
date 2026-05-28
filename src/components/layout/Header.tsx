import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '@/data/constants/navigation';
import { env } from '@/utils/env';
import { isNavLinkActive, navLinkClassName } from '@/utils/navigation';
import { CartIconLink } from '@/components/cart/CartIconLink';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, search } = useLocation();

  const renderNavLink = (link: (typeof NAV_LINKS)[number], onNavigate?: () => void) => (
    <NavLink
      key={link.id}
      to={link.to}
      className={() => navLinkClassName(isNavLinkActive(link.id, pathname, search))}
      onClick={onNavigate}
    >
      {link.label}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface-elevated/90 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">
            E
          </span>
          <span className="font-display text-lg font-semibold text-ink">{env.appName}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => renderNavLink(link))}
        </nav>

        <div className="flex items-center gap-2">
          <CartIconLink />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menú</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-border bg-surface-elevated px-4 py-4 md:hidden"
          aria-label="Móvil"
        >
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>{renderNavLink(link, () => setMenuOpen(false))}</li>
            ))}
            <li>
              <NavLink
                to="/carrito"
                className={() => navLinkClassName(pathname === '/carrito')}
                onClick={() => setMenuOpen(false)}
              >
                Carrito
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
