'use client';

import { LucideLoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';

type SubmitButtonProps = {
  label: string;
  icon?: React.ReactElement;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
};

export function SubmitButton({
  label,
  icon,
  variant = 'default',
  size = 'default',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : icon ? (
        <>{icon}</>
      ) : null}
      {label}
    </Button>
  );
}
