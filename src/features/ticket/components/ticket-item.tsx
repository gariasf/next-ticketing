
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card";
import { ticketPathFor } from "@/paths";
import { TICKET_ICONS } from "../constants";
import { Ticket } from "../types";

interface TicketItemProps {
  ticket: Ticket;
}

export function TicketItem({ ticket }: TicketItemProps) {
  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link href={ticketPathFor(ticket.id)} >
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  return (
   <div className="w-full max-w-[500px] flex gap-2">
    <Card key={ticket.id} className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-x-2">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className="truncate">{ticket.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="line-clamp-3 whitespace-break-spaces">
          {ticket.content}
        </span>
      </CardContent>

    </Card>
    <div className="flex flex-col gap-y-1">
      {detailButton}
    </div>
   </div>
  );
}
