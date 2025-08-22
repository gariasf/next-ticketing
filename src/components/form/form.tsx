import { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useActionFeedback } from './hooks/use-action-feedback';
import { ActionState } from './utils/to-action-state';

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
} & PropsWithChildren;

export function Form({ children, action, actionState }: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      const message = actionState.message;

      if (message) {
        toast.success(message);
      }
    },
    onError: ({ actionState }) => {
      const message = actionState.message;

      if (message) {
        toast.error(message);
      }
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}
