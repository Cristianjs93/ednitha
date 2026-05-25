import type { ReactNode } from 'react';

type BadgeTone = 'brand' | 'neutral' | 'accent';

export interface BadgeProps {
  readonly children: ReactNode;
  readonly tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  brand: 'bg-brand-100 text-brand-800',
  neutral: 'bg-stone-100 text-stone-700',
  accent: 'bg-amber-100 text-amber-900',
};

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
