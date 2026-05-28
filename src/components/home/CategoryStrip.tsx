import { Link } from 'react-router-dom';
import type { Category } from '@/types/category';
import type { AsyncState } from '@/hooks/useProjects';
import { Spinner } from '@/components/ui/Spinner';

export interface CategoryStripProps {
  readonly state: AsyncState<readonly Category[]>;
}

export function CategoryStrip({ state }: CategoryStripProps) {
  if (state.status === 'loading') {
    return <Spinner label="Cargando categorías..." />;
  }

  if (state.status === 'error' || state.status !== 'success') {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {state.data.map((category) => (
        <Link
          key={category.id}
          to={`/proyectos?category=${category.slug}`}
          className="rounded-full border border-border bg-surface-elevated px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
