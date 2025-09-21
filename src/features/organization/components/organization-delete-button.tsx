'use client';

import { LucideLoaderCircle, LucideTrash } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteOrganization } from '../actions/delete-organization';

type OrganizationDeleteButtonProps = {
  organizationId: string;
};

export function OrganizationDeleteButton({
  organizationId,
}: OrganizationDeleteButtonProps) {
  const router = useRouter();
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
    onSuccess: () => {
      router.refresh();
    },
    trigger: (isPending) => (
      <Button variant="destructive" size="icon">
        {isPending ? (
          <LucideLoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <LucideTrash className="w-4 h-4" />
        )}
      </Button>
    ),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
}
