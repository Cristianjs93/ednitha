import { useState, type MouseEvent } from 'react';
import type { Project } from '@domain/entities/Project';
import { Button } from '@presentation/components/ui/Button';
import { useCart } from '@presentation/hooks/useCart';

export interface AddToCartButtonProps {
  readonly project: Project;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly fullWidth?: boolean;
  readonly className?: string;
}

export function AddToCartButton({
  project,
  size = 'md',
  fullWidth = false,
  className = '',
}: AddToCartButtonProps) {
  const { addProject } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    addProject(project);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <Button
      type="button"
      size={size}
      fullWidth={fullWidth}
      variant={added ? 'secondary' : 'primary'}
      className={className}
      onClick={handleClick}
      aria-label={`Agregar ${project.title} al carrito`}
    >
      {added ? '✓ Agregado' : 'Agregar al carrito'}
    </Button>
  );
}
