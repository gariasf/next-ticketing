import { Heading } from '@/components/heading';
import { initialTickts } from '@/data';
import { TicketItem } from '@/features/ticket/components/ticket-item';

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="TicketsPage"
        description="All your tickets in one place"
      />
      <div className="flex-1 flex flex-col items-center gap-4">
        {initialTickts.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} />
        ))}
      </div>
    </div>
  );
}
