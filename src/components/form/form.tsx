import { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useActionFeedback } from './hooks/use-action-feedback';
import { ActionState } from './utils/to-action-state';

type FormProps<T = unknown> = {
  action: (payload: FormData) => void;
  actionState: ActionState<T>;
  onSuccess?: (actionState: ActionState<T>) => void;
  onError?: (actionState: ActionState<T>) => void;
} & PropsWithChildren;

export function Form<T>({
  children,
  action,
  actionState,
  onSuccess,
  onError,
}: FormProps<T>) {
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
