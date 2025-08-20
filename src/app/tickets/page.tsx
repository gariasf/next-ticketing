import { Heading } from '@/components/heading';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTickets } from '@/features/ticket/queries/get-tickets';

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="TicketsPage"
        description="All your tickets in one place"
      />
      <div className="flex-1 flex flex-col items-center gap-4">
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} />
        ))}
      </div>
    </div>
  );
}
