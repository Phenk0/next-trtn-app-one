"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { TicketStatus } from "@/generated/prisma/enums";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        status: "ERROR" as const,
        message: "This ticket no longer exists. It may have been deleted.",
      };
    }

    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath);

  return toActionState("SUCCESS", "Ticket status updated");
};
export { updateTicketStatus };
