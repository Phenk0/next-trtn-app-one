"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({ where: { id: ticketId } });

  revalidatePath(ticketsPath);
  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath);
};

export { deleteTicket };
