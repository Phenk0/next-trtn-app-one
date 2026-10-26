"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Prisma } from "@/generated/prisma/client";
import { TicketStatus } from "@/generated/prisma/enums";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const updateTicketStatus = async (id: string, status: TicketStatus) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({ where: { id } });

      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized");
      }
    }

    await prisma.ticket.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return toActionState(
        "ERROR",
        "This ticket no longer exists. It may have been deleted.",
      );
    }

    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath);

  return toActionState("SUCCESS", "Ticket status updated");
};
export { updateTicketStatus };
