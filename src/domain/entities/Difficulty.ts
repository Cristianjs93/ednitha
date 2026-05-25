export const DIFFICULTY_LEVELS = ['principiante', 'intermedio', 'avanzado'] as const;

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];

export function isDifficultyLevel(value: string): value is DifficultyLevel {
  return (DIFFICULTY_LEVELS as readonly string[]).includes(value);
}
