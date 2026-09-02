import { prisma } from "@/lib/prisma";

const tickets = [
  {
    title: "Ticket 1",
    content: "Description 1 from the database.",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "Description Description Description 2 from the database.",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "Description 3 from the database.",
    status: "IN_PROGRESS" as const,
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
