"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ticketPath, ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const upsertTicket = async (id: string | undefined, formData: FormData) => {
  // TODO: Add validation (maybe via Zod)
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.upsert({
    where: { id: id || "" },
    create: data,
    update: data,
  });

  revalidatePath(ticketsPath);
  if (id) redirect(ticketPath(id));
};

export { upsertTicket };
