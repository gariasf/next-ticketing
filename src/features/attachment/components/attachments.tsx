import { CardCompact } from '@/components/card-compact';
import { AttachmentCreateForm } from './attachment-create-form';

type AttachmentsProps = {
  ticketId: string;
  isOwner: boolean;
};

export function Attachments({ ticketId, isOwner }: AttachmentsProps) {
  return (
    <CardCompact
      title="Attachments"
      description="Attached images or PDFs"
      content={
        <>
          {/* TODO: list attachments */}

          {isOwner && <AttachmentCreateForm ticketId={ticketId} />}
        </>
      }
    />
  );
}
