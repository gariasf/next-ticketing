'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ACCEPTED_FILE_FORMATS } from '@/features/attachment/constants';
import { createComment } from '../actions/create-comment';
import { CommentWithMetadata } from '../types';

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment?: CommentWithMetadata) => void;
};

export function CommentCreateForm({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) {
  const boundCreateComment = async (
    prevState: ActionState<CommentWithMetadata | undefined>,
    formData: FormData
  ): Promise<ActionState<CommentWithMetadata | undefined>> => {
    const result = await createComment(ticketId, prevState, formData);
    return result as ActionState<CommentWithMetadata | undefined>;
  };

  const [actionState, action] = useActionState(
    boundCreateComment,
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (
    actionState: ActionState<CommentWithMetadata | undefined>
  ) => {
    onCreateComment?.(actionState.data);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="What's on your mind ..." />
      <FieldError actionState={actionState} name="content" />

      <Input
        name="files"
        id="files"
        type="file"
        multiple
        accept={ACCEPTED_FILE_FORMATS.join(',')}
      />
      <FieldError actionState={actionState} name="files" />

      <SubmitButton label="Comment" />
    </Form>
  );
}
