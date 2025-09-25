'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { filesSchema } from '@/features/attachment/schema/files';
import * as attachmentService from '@/features/attachment/service';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import * as commentData from '@/features/comment/data';
import { ticketPathFor } from '@/paths';

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
  files: filesSchema,
});

export async function createComment<T = unknown>(
  ticketId: string,
  _actionState: ActionState<T>,
  formData: FormData
) {
  const { user } = await getAuthOrRedirect();

  let comment;

  try {
    const { content, files } = createCommentSchema.parse({
      content: formData.get('content'),
      files: formData.getAll('files'),
    });

    comment = comment = await commentData.createComment({
      userId: user.id,
      ticketId,
      content,
    });

    await attachmentService.createAttachments({
      subject: comment,
      entity: 'COMMENT',
      entityId: comment.id,
      files,
    });
  } catch (error) {
    return fromErrorToActionState<T>(error);
  }

  revalidatePath(ticketPathFor(ticketId));

  return toActionState<T>('SUCCESS', 'Comment created', undefined, {
    ...comment,
    isOwner: true,
  } as T);
}
