'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';
import { toCentFromDollar } from '@/utils/currency';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(2).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  bounty: z.coerce.number().positive(),
});

export async function upsertTicket(
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) {
  try {
    const data = upsertTicketSchema.parse(Object.fromEntries(formData));

    const dbData = {
      ...data,
      bounty: toCentFromDollar(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        id: id || '',
      },
      create: dbData,
      update: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookieByKey('toast', 'Ticket updated');
    redirect(ticketsPath());
  }

  return toActionState('SUCCESS', 'Ticket created');
}
