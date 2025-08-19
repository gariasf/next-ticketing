import Link from "next/link";
import { initialTickts } from "@/data";
import { ticketPathFor } from "@/paths";

export default function TicketsPage() {
  return (
    <div>
      {initialTickts.map((ticket) => (
        <div key={ticket.id}>
          <h2>{ticket.title}</h2>

          <Link href={ticketPathFor(ticket.id)} className="text-sm underline">
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
