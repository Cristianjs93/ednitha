import type { DifficultyLevel } from '@/types/difficulty';

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

export function formatPrice(amount: number, currency: 'COP' | 'USD'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${String(minutes)} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (remainder === 0) {
    return `${String(hours)} h`;
  }
  return `${String(hours)} h ${String(remainder)} min`;
}

export function formatDifficulty(level: DifficultyLevel): string {
  return DIFFICULTY_LABELS[level];
}
