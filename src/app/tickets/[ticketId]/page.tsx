import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickts } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { ticketsPath } from "@/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;

  const ticket = initialTickts.find((t) => t.id === ticketId);

  if (!ticket) {
    return (
     <div className="flex flex-1 justify-center">
       <Placeholder
         label="Ticket not found"
         button={
           <Button asChild variant="outline">
             <Link href={ticketsPath()}>Go to Tickets</Link>
           </Button>
         }
       />
     </div>
    );
  }

  return (
    <div className="flex justify-center">
     <TicketItem ticket={ticket} isDetail={true} />
    </div>
  );
}
