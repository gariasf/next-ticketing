import { AttachmentEntity } from '@prisma/client';
import { CardCompact } from '@/components/card-compact';
import { getAttachments } from '../queries/get-attachments';
import { AttachmentCreateForm } from './attachment-create-form';
import { AttachmentDeleteButton } from './attachment-delete-button';
import { AttachmentList } from './attachment-list';

type AttachmentsProps = {
  entityId: string;
  entity: AttachmentEntity;
  isOwner: boolean;
};

export async function Attachments({
  entityId,
  entity,
  isOwner,
}: AttachmentsProps) {
  const attachments = await getAttachments(entityId, entity);

  return (
    <CardCompact
      title="Attachments"
      description="Attached images or PDFs"
      content={
        <>
          <div>
            <AttachmentList
              attachments={attachments}
              buttons={(attachmentId: string) => [
                ...(isOwner
                  ? [<AttachmentDeleteButton key="0" id={attachmentId} />]
                  : []),
              ]}
            />
          </div>
          {isOwner && (
            <AttachmentCreateForm entityId={entityId} entity={entity} />
          )}
        </>
      }
    />
  );
}
