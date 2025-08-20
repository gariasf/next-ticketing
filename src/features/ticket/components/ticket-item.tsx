import clsx from 'clsx';
import { LucideSquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ticketPathFor } from '@/paths';
import { TICKET_ICONS } from '../constants';
import { Ticket } from '../types';

interface TicketItemProps {
  ticket: Ticket;
  isDetail?: boolean;
}

export function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link href={ticketPathFor(ticket.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  return (
    <div
      className={clsx('w-full flex gap-2', {
        'max-w-[580px]': !isDetail,
        'max-w-[480px]': !!isDetail,
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
      </Card>
      {isDetail ? null : (
        <div className="flex flex-col gap-y-1">{detailButton}</div>
      )}
    </div>
  );
}
