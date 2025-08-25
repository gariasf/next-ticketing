import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';

type TicketListProps = {
  userId?: string;
};

export async function TicketList({ userId }: TicketListProps) {
  const tickets = await getTickets(userId);

  return (
    <div className="flex-1 flex flex-col items-center gap-4">
      {tickets.map((ticket) => (
        <TicketItem ticket={ticket} key={ticket.id} />
      ))}
    </div>
  );
}
