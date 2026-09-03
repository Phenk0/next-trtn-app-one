"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const updateTicket = async (id: string, formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.update({
    where: { id },
    data,
  });

  revalidatePath(ticketsPath);
  redirect(ticketsPath);
};

export { updateTicket };
