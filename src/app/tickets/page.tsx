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
    <div className="flex-1 flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8">
        <h2 className="text-3xl font-bold tracking-tight">TicketsPage</h2>
        <p className="text-sm text-muted-foreground">All your tickets in one place</p>
      </div>
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickts.map((ticket) => (
          <div key={ticket.id} className="w-full max-w-[420px] p-4 border border-slate-100 rounded">
            <div>
              {TICKET_ICONS[ticket.status]}
            </div>
            <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
            <p className="text-sm text-slate-400 truncate">{ticket.content}</p>
            <Link href={ticketPathFor(ticket.id)} className="text-sm underline">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
