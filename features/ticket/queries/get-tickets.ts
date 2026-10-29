import { prisma } from "@/lib/prisma";

const getTickets = (userId?: string | undefined, search?: string) =>
  prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: { select: { username: true } },
    },
  });

export { getTickets };
