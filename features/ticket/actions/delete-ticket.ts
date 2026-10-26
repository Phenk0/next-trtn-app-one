"use server";

import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { Prisma } from "@/generated/prisma/client";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";

const deleteTicket = async (ticketId: string, pathname: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (ticketId) {
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
      });

      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized");
      }
    }
    await prisma.ticket.delete({ where: { id: ticketId } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return toActionState(
        "ERROR" as const,
        "This ticket no longer exists. It may have been deleted.",
      );
    }
    return fromErrorToActionState(error);
  }

  if (pathname === ticketsPath) {
    return toActionState("SUCCESS", "Ticket successfully deleted");
  }

  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath);
};

export { deleteTicket };
