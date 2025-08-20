import { initialTickts } from '@/data';
import { Ticket } from '../types';

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  const ticket = initialTickts.find((t) => t.id === ticketId);

  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return new Promise((resolve) => {
    resolve(ticket || null);
  });
}
