import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the content of ticket 1.',
    status: 'DONE' as const,
  },
  {
    title: 'Ticket 2',
    content:
      'This is the content of ticket 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'OPEN' as const,
  },
  {
    title: 'Ticket 3',
    content:
      'This is the content of ticket 3. It has medium length content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'IN_PROGRESS' as const,
  },
  {
    title: 'Ticket 4',
    content:
      'This is the content of ticket 4 with a very long content that exceeds the maximum length allowed for a ticket. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'OPEN' as const,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('DB Seed: Started...');
  await prisma.ticket.deleteMany();
  await prisma.ticket.createMany({
    data: tickets,
  });
  const t1 = performance.now();
  console.log(`DB Seed: Finished in ${t1 - t0}ms`);
};

seed();
