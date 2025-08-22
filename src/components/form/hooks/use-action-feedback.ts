import { useEffect, useRef } from 'react';
import { ActionState } from '../utils/to-action-state';

type OnArgs = {
  actionState: ActionState;
};

interface UseActionFeedbackOptions {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
}

export function useActionFeedback(
  actionState: ActionState,
  options: UseActionFeedbackOptions
) {
  const prevTimestamp = useRef<number | null>(actionState.timestamp);

  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdate) return;

    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState });
    } else if (actionState.status === 'ERROR') {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [isUpdate, actionState, options]);
}
