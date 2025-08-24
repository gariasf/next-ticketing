'use client';

import { Ticket, TicketStatus } from '@prisma/client';
import { LucideTrash } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateTicketStatus } from '../actions/update-ticket-status';
import { TICKET_STATUS_LABELS } from '../constants';

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

export function TicketMoreMenu({ ticket, trigger }: TicketMoreMenuProps) {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash />
      <span>Delete Ticket</span>
    </DropdownMenuItem>
  );

  async function handleUpdateTicketStatus(status: string) {
    const result = await updateTicketStatus(ticket.id, status as TicketStatus);

    if (result.status === 'ERROR') {
      toast.error(result.message);
    } else if (result.status === 'SUCCESS') {
      toast.success(result.message);
    }
  }

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKET_STATUS_LABELS) as TicketStatus[]).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
