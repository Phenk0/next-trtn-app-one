"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { setSessionCookie } from "@/features/auth/utils/session-cookie";
import { verifyPasswordHash } from "@/features/password/utils/hash-and-verify";
import { createSession } from "@/lib/lucia";
import { ticketsPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { generateRandomToken } from "@/utils/crypto";

const signInSchema = z.object({
  email: z.email("Please enter a valid email address.").max(191),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(191),
});

const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return toActionState("ERROR", "Incorrect email or password.", formData);
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password.", formData);
    }

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Welcome back!");
  redirect(ticketsPath);
};

export { signIn };
