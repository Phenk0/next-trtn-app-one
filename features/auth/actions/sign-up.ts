"use server";

import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { setSessionCookie } from "@/features/auth/utils/session-cookie";
import { hashPassword } from "@/features/password/utils/hash-and-verify";
import { Prisma } from "@/generated/prisma/client";
import { createSession } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { generateRandomToken } from "@/utils/crypto";

const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters.")
      .max(30, "Username must be at most 30 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can contain only letters, numbers, and underscores.",
      ),
    email: z
      .email("Please enter a valid email address.")
      .trim()
      .max(191, "Email must be at most 191 characters.")
      .transform((email) => email.toLowerCase()),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters.")
      .max(128, "Password must be at most 128 characters."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR" as const,
        "Either email or username is already in use.",
        formData,
      );
    }
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Sign up successful.");
};
export { signUp };
