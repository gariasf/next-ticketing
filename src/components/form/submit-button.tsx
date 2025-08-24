'use client';

import clsx from 'clsx';
import { LucideLoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  label: string;
  icon?: React.ReactElement;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
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
      {pending && (
        <LucideLoaderCircle
          className={clsx('animate-spin', {
            'mr-2': !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? <span>{icon}</span> : null}
    </Button>
  );
}
