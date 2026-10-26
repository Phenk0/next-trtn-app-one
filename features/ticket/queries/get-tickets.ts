import { prisma } from "@/lib/prisma";

const getTickets = (userId?: string | undefined) =>
  prisma.ticket.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: { select: { username: true } },
    },
  });

export { getTickets };
