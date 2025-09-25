import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { AttachmentEntity } from '@prisma/client';
import { s3 } from '@/lib/aws';
import { prisma } from '@/lib/prisma';
import * as attachmentData from '../data';
import { AttachmentSubject } from '../types';
import { generateS3Key } from '../utils/generate-s3-key';
import { getOrganizationIdByAttachment } from '../utils/helpers';

type CreateAttachmentsArgs = {
  subject: AttachmentSubject;
  entity: AttachmentEntity;
  entityId: string;
  files: File[];
};

export async function createAttachments({
  subject,
  entity,
  entityId,
  files,
}: CreateAttachmentsArgs) {
  const attachments = [];
  const uploadedKeys: string[] = [];
  let attachment;

  try {
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      attachment = await attachmentData.createAttachment({
        name: file.name,
        entity,
        entityId,
      });

      const organizationId = getOrganizationIdByAttachment(entity, subject);

      const key = generateS3Key({
        organizationId,
        entityId,
        entity,
        fileName: file.name,
        attachmentId: attachment.id,
      });

      attachments.push(attachment);
      uploadedKeys.push(key);

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            entityId,
            entity,
            fileName: file.name,
            attachmentId: attachment.id,
          }),
          Body: buffer,
          ContentType: file.type,
        })
      );
    }
  } catch (error) {
    if (attachment) {
      // Rollback S3 uploads
      await Promise.all(
        uploadedKeys.map(
          (key) =>
            s3
              .send(
                new DeleteObjectCommand({
                  Key: key,
                  Bucket: process.env.AWS_BUCKET_NAME,
                })
              )
              .catch(() => null) // Don’t crash during rollback
        )
      );

      // Rollback DB entries
      await Promise.all(
        attachments.map((a) =>
          prisma.attachment.delete({ where: { id: a.id } }).catch(() => null)
        )
      );
    }

    throw error;
  }

  return attachments;
}
