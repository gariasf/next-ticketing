import { Ticket } from '@prisma/client';
import clsx from 'clsx';
import {
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ticketEditPathFor, ticketPathFor } from '@/paths';
import { toCurrencyFromCents } from '@/utils/currency';
import { deleteTicket } from '../actions/delete-ticket';
import { TICKET_ICONS } from '../constants';

interface TicketItemProps {
  ticket: Ticket;
  isDetail?: boolean;
}

export function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketPathFor(ticket.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const editButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketEditPathFor(ticket.id)}>
        <LucidePencil />
      </Link>
    </Button>
  );

  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button size="icon" variant="destructive">
        <LucideTrash />
      </Button>
    </form>
  );

  return (
    <div
      className={clsx('w-full flex gap-2', {
        'max-w-[600px]': !!isDetail,
        'max-w-[480px]': !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx('whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}
