import { hashPassword } from "@/features/password/utils/hash-and-verify";
import { prisma } from "@/lib/prisma";

const users = [
  {
    username: "Roman",
    email: "user1@us.er",
  },
  {
    username: "RomanParkhomenko",
    email: "roman.s.parkhomenko@gmail.com",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "Description 1 from the database.",
    status: "DONE" as const,
    bounty: 0,
    deadline: "2026-09-08",
  },
  {
    title: "Ticket 2",
    content: "Description Description Description 2 from the database.",
    status: "OPEN" as const,
    bounty: 0,
    deadline: "2026-09-08",
  },
  {
    title: "Ticket 3",
    content: "Description 3 from the database.",
    status: "IN_PROGRESS" as const,
    bounty: 0,
    deadline: "2026-09-08",
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB SEED: Started");

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hashPassword("1234");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });
  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({ ...ticket, userId: dbUsers[0].id })),
  });

  const t1 = performance.now();
  console.log(`DB SEED: Completed in ${t1 - t0}ms`);
};
seed();
