import { useEffect, useRef } from 'react';
import { ActionState } from '../utils/to-action-state';

type OnArgs<T> = {
  actionState: ActionState<T>;
};

interface UseActionFeedbackOptions<T> {
  onSuccess?: (onArgs: OnArgs<T>) => void;
  onError?: (onArgs: OnArgs<T>) => void;
}

export function useActionFeedback<T>(
  actionState: ActionState<T> | undefined,
  options: UseActionFeedbackOptions<T>
) {
  const prevTimestamp = useRef(actionState?.timestamp);
  const isUpdate = prevTimestamp.current !== actionState?.timestamp;

  useEffect(() => {
    if (!isUpdate) return;
    if (!actionState) return;

    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState });
    } else if (actionState.status === 'ERROR') {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [isUpdate, actionState, options]);
}
