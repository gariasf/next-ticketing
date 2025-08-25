import { Prisma } from '@prisma/client';
import clsx from 'clsx';
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
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
import { TICKET_ICONS } from '../constants';
import { TicketMoreMenu } from './ticket-more-menu';

interface TicketItemProps {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
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

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical />
        </Button>
      }
    />
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
          <p className="text-sm text-muted-foreground">
            {ticket.deadline} by {ticket.user.username}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
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
