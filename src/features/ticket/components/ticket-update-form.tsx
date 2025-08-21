import { Ticket } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateTicket } from '../actions/update-ticket';

type TicketUpdateFormProps = {
  ticket: Ticket;
};

export function TicketUpdateForm({ ticket }: TicketUpdateFormProps) {
  return (
    <form action={updateTicket} className="flex flex-col gap-y-2">
      <input type="hidden" name="id" defaultValue={ticket.id} />
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />

      <Button type="submit">Update</Button>
    </form>
  );
}
