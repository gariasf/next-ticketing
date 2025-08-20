import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';

export async function TicketList() {
  const tickets = await getTickets();

  return (
    <div className="flex-1 flex flex-col items-center gap-4">
      {tickets.map((ticket) => (
        <TicketItem ticket={ticket} key={ticket.id} />
      ))}
    </div>
  );
}
