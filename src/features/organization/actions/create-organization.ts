'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(191),
});

export const createOrganization = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect({
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const data = createOrganizationSchema.parse({
      name: formData.get('name'),
    });

    const [, organization] = await prisma.$transaction([
      prisma.membership.updateMany({
        where: {
          userId: user.id,
        },
        data: {
          isActive: false,
        },
      }),
      prisma.organization.create({
        data: {
          ...data,
          memberships: {
            create: {
              userId: user.id,
              isActive: true,
              membershipRole: 'ADMIN',
            },
          },
        },
      }),
    ]);

    await inngest.send({
      name: 'app/organization.created',
      data: {
        organizationId: organization.id,
        byEmail: user.email,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookieByKey('toast', 'Organization created');
  redirect(ticketsPath());
};
