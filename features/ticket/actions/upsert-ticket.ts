"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { ticketPath, ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const upsertTicketSchema = z.object({
  title: z.string().min(3).max(191),
  content: z.string().min(10).max(1024),
});

const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: data,
      update: data,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath);
  if (id) redirect(ticketPath(id));

  return toActionState("SUCCESS", "Ticket created");
};

export { upsertTicket };
