import { initialTickts } from '@/data';
import { Ticket } from '../types';

export async function getTickets(): Promise<Ticket[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return new Promise((resolve) => {
    resolve(initialTickts);
  });
}
