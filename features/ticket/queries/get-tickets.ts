import { ParsedSearchParams } from "@/features/ticket/search-params-cache";
import { prisma } from "@/lib/prisma";

const getTickets = async (
  userId?: string | undefined,
  searchParams?: ParsedSearchParams,
) => {
  const params = searchParams ? await searchParams : undefined;

  return prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: params?.search ?? undefined,
        mode: "insensitive",
      },
    },
    orderBy: {
      ...(params?.sort === "newest" && { createdAt: "desc" }),
      ...(params?.sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: { select: { username: true } },
    },
  });
};

export { getTickets };
