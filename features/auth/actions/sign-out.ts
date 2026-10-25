"use server";

import { redirect } from "next/navigation";
import { getAuth } from "@/features/auth/queries/get-auth";
import { deleteSessionCookie } from "@/features/auth/utils/session-cookie";
import { invalidateSession } from "@/lib/lucia";
import { signInPath } from "@/lib/paths";

const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect("/");
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath);
};

export { signOut };
