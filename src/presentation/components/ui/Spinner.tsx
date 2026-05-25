export function Spinner({ label = 'Cargando...' }: { readonly label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" role="status">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-700"
        aria-hidden="true"
      />
      <span className="text-sm text-ink-muted">{label}</span>
    </div>
  );
}
