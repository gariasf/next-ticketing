import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
    emailVerified: true,
  },
  {
    username: 'user',
    email: 'hello@gariasf.com',
    emailVerified: false,
  },
];

const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the content of ticket 1.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    title: 'Ticket 2',
    content:
      'This is the content of ticket 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 399,
  },
  {
    title: 'Ticket 3',
    content:
      'This is the content of ticket 3. It has medium length content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 599,
  },
  {
    title: 'Ticket 4',
    content:
      'This is the content of ticket 4 with a very long content that exceeds the maximum length allowed for a ticket. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 299,
  },
];

const comments = [
  { content: 'First comment from DB.' },
  {
    content:
      'Second comment from DB. This one is longer than the first one. And maybe one newline\n after the first line.',
  },
  {
    content:
      'Third comment from DB. This one is longer than the first two. This one has multiple new lines\n\n\n and maybe one more at the end.\n\n It has a very long content that exceeds the maximum length allowed for a comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('DB Seed: Started...');

  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.membership.deleteMany();

  const passwordHash = await hash('geheimnis-geheimnos');

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  const dbOrganization = await prisma.organization.create({
    data: {
      name: 'Organization 1',
    },
  });

  await prisma.membership.createMany({
    data: [
      {
        userId: dbUsers[0].id,
        organizationId: dbOrganization.id,
        isActive: true,
        membershipRole: "ADMIN",
      },
      {
        userId: dbUsers[1].id,
        organizationId: dbOrganization.id,
        isActive: false,
        membershipRole: "MEMBER",
      },
    ],
  });

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });
  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      ticketId: dbTickets[0].id,
      userId: dbUsers[1].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished in ${t1 - t0}ms`);
};

seed();
