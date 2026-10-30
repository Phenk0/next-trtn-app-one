import { ParsedSearchParams } from "@/features/ticket/search-params-cache";
import { prisma } from "@/lib/prisma";

const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const { search, sortKey, sortValue } = await searchParams;

  return prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: search ?? undefined,
        mode: "insensitive",
      },
    },
    orderBy: {
      [sortKey]: sortValue,
    },
    include: {
      user: { select: { username: true } },
    },
  });
};

export { getTickets };
