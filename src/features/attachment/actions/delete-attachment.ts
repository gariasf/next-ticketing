'use server';

import { revalidatePath } from 'next/cache';
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { AttachmentSubjectDTO } from '@/features/attachment/dto/attachment-subject-dto';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { ticketPathFor } from '@/paths';
import * as attachmentData from '../data';

export const deleteAttachment = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  const attachment = await attachmentData.getAttachment(id);

  let subject;
  switch (attachment?.entity) {
    case 'TICKET':
      subject = AttachmentSubjectDTO.fromTicket(attachment.ticket, user.id);
      break;
    case 'COMMENT':
      subject = AttachmentSubjectDTO.fromComment(attachment.comment, user.id);
      break;
  }

  if (!subject || !attachment) {
    return toActionState('ERROR', 'Subject not found');
  }

  if (!isOwner(user, subject)) {
    return toActionState('ERROR', 'Not authorized');
  }

  try {
    await prisma.attachment.delete({
      where: {
        id,
      },
    });

    await inngest.send({
      name: 'app/attachment.deleted',
      data: {
        entity: attachment.entity,
        organizationId: subject.organizationId,
        entityId: subject.entityId,
        fileName: attachment.name,
        attachmentId: attachment.id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  switch (subject.entity) {
    case 'TICKET':
      revalidatePath(ticketPathFor(subject.ticketId));
      break;
    case 'COMMENT': {
      revalidatePath(ticketPathFor(subject.ticketId));
      break;
    }
  }

  return toActionState('SUCCESS', 'Attachment deleted');
};
