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

const deleteTicket = async (ticketId: string, pathname: string) => {
  try {
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
