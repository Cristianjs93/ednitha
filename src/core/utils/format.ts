import type { DifficultyLevel } from '@domain/entities/Difficulty';

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

export function formatPrice(amount: number, currency: 'COP' | 'USD'): string {
  return new Intl.NumberFormat('es-co', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (remainder === 0) {
    return `${hours} h`;
  }
  return `${hours} h ${remainder} min`;
}

export function formatDifficulty(level: DifficultyLevel): string {
  return DIFFICULTY_LABELS[level];
}
