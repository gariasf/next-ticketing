import { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useActionFeedback } from './hooks/use-action-feedback';
import { ActionState } from './utils/to-action-state';

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
} & PropsWithChildren;

export function Form({
  children,
  action,
  actionState,
  onSuccess,
  onError,
}: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      const message = actionState.message;

      if (message) {
        toast.success(message);
      }

      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      const message = actionState.message;

      if (message) {
        toast.error(message);
      }

      onError?.(actionState);
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}
