import { prisma } from "@/lib/prisma";

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

  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  const t1 = performance.now();
  console.log(`DB SEED: Completed in ${t1 - t0}ms`);
};
seed();
