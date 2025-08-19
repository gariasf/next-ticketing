import { initialTickts } from "@/data";
type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;

  const ticket = initialTickts.find((t) => t.id === ticketId);

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div>
      <h2>Ticket {ticket.title}</h2>
      <p>{ticket.content}</p>
    </div>
  );
}
