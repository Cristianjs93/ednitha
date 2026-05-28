export interface EmptyStateProps {
  readonly title: string;
  readonly description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface-elevated px-6 py-16 text-center">
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="mt-2 text-sm text-ink-muted">{description}</p>
    </div>
  );
}
