import Link from "next/link";
import { initialTickts } from "@/data";
import { ticketPathFor } from "@/paths";

const TICKET_ICONS = {
  OPEN: "O",
  IN_PROGRESS: ">",
  DONE: "X"
}

export default function TicketsPage() {
  return (
    <div>
      {initialTickts.map((ticket) => (
        <div key={ticket.id}>
          <div>
            {TICKET_ICONS[ticket.status]}
          </div>
          <h2>{ticket.title}</h2>

          <Link href={ticketPathFor(ticket.id)} className="text-sm underline">
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
