import { prisma } from "@/lib/prisma";

const getTickets = async () =>
  await prisma.ticket.findMany({ orderBy: { createdAt: "desc" } });

export { getTickets };
