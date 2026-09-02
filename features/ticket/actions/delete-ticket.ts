"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({ where: { id: ticketId } });

  revalidatePath(ticketsPath);
  redirect(ticketsPath);
};

export { deleteTicket };
