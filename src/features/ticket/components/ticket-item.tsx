import clsx from 'clsx';
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Comments } from '@/features/comment/components/comments';
import { CommentWithMetadata } from '@/features/comment/types';
import { ticketEditPathFor, ticketPathFor } from '@/paths';
import { toCurrencyFromCents } from '@/utils/currency';
import { TICKET_ICONS } from '../constants';
import { TicketWithMetadata } from '../types';
import { TicketMoreMenu } from './ticket-more-menu';

interface TicketItemProps {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  comments?: CommentWithMetadata[];
}

export function TicketItem({ ticket, isDetail, comments }: TicketItemProps) {
  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketPathFor(ticket.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const editButton = ticket.isOwner ? (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketEditPathFor(ticket.id)}>
        <LucidePencil />
      </Link>
    </Button>
  ) : null;

  const moreMenu = ticket.isOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx('w-full flex flex-col gap-y-4', {
        'max-w-[600px]': !!isDetail,
        'max-w-[480px]': !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full">
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
        <div className="flex flex-col gap-y-1 ">
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
      {isDetail ? (
        <Suspense
          fallback={
            <div className="flex flex-col gap-y-4  gap-x-2">
              <Skeleton className="h-[250px] w-full" />
              <Skeleton className="h-[80px] ml-8" />
              <Skeleton className="h-[80px] ml-8" />
            </div>
          }
        >
          <Comments ticketId={ticket.id} comments={comments} />
        </Suspense>
      ) : null}
    </div>
  );
}
