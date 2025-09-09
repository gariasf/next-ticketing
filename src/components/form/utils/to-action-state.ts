import z, { ZodError } from 'zod';

export type ActionState<T = unknown> = {
  status?: 'SUCCESS' | 'ERROR';
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
  data?: T;
};

export const EMPTY_ACTION_STATE: ActionState<undefined> = {
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export function fromErrorToActionState<T = unknown>(
  error: unknown,
  formData?: FormData
): ActionState<T> {
  if (error instanceof ZodError) {
    return {
      status: 'ERROR',
      message: '',
      fieldErrors: z.flattenError(error).fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: 'ERROR',
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    return {
      status: 'ERROR',
      message: 'An unknown error occurred',
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
}

export function toActionState<T = unknown>(
  status: ActionState['status'],
  message: string,
  formData?: FormData,
  data?: T
): ActionState<T> {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
    data,
  };
}
