import { cloneElement, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  action: (payload: FormData) => void;
  trigger: React.ReactElement;
};

export function useConfirmDialog({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. Make sure you understand the consequences.',
  action,
  trigger,
}: UseConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setOpen((prevState) => !prevState),
  } as React.DOMAttributes<HTMLElement>);
  const dialog = (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={action}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
}
