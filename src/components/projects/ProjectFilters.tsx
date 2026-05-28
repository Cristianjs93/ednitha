import type { Category } from '@/types/category';
import { DIFFICULTY_LEVELS } from '@/types/difficulty';
import { formatDifficulty } from '@/utils/format';

export interface ProjectFiltersState {
  readonly categorySlug: string;
  readonly difficulty: string;
  readonly search: string;
}

export interface ProjectFiltersProps {
  readonly categories: readonly Category[];
  readonly filters: ProjectFiltersState;
  readonly onChange: (filters: ProjectFiltersState) => void;
}

export function ProjectFilters({ categories, filters, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-elevated p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <label className="flex min-w-[200px] flex-1 flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Buscar
        </span>
        <input
          type="search"
          value={filters.search}
          placeholder="Nombre, etiqueta..."
          className="rounded-xl border border-border px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </label>

      <label className="flex min-w-[160px] flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Categoría
        </span>
        <select
          value={filters.categorySlug}
          className="rounded-xl border border-border px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
          onChange={(e) => onChange({ ...filters, categorySlug: e.target.value })}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-w-[160px] flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Dificultad
        </span>
        <select
          value={filters.difficulty}
          className="rounded-xl border border-border px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
          onChange={(e) => onChange({ ...filters, difficulty: e.target.value })}
        >
          <option value="">Todas</option>
          {DIFFICULTY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {formatDifficulty(level)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
