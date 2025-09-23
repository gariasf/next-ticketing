'use client';

import { useParams, usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  invitationsPath,
  membershipsPathFor,
  organizationsPath,
} from '@/paths';

export function OrganizationBreadcrumbs() {
  const params = useParams<{ organizationId: string }>();
  const pathName = usePathname();

  const title = {
    memberships: 'Memberships' as const,
    invitations: 'Invitations' as const,
  }[pathName.split('/').at(-1) as 'memberships' | 'invitations'];

  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: 'Organizations', href: organizationsPath() },
        {
          title,
          dropdown: [
            {
              title: 'Memberships',
              href: membershipsPathFor(params.organizationId),
            },
            {
              title: 'Invitations',
              href: invitationsPath(params.organizationId),
            },
          ],
        },
      ]}
    />
  );
}
