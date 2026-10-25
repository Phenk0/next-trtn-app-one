"use client";

import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "@/components/form/submit-button";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions/sign-out";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/lib/paths";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  // const { user } = await getAuth();  => makes all pages dynamic
  const { user, isFetched } = useAuth();

  if (!isFetched) return;

  const navItems = !user ? (
    <>
      <Link href={ticketsPath} className={cn(buttonVariants())}>
        Tickets
      </Link>
      <form action={signOut}>
        <SubmitButton
          label="Sign Out"
          icon={<LucideLogOut className="h-8 w-8" />}
          variant="outline"
        />
      </form>
    </>
  ) : (
    <>
      <Link
        href={signUpPath}
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        Sign Up
      </Link>
      <Link href={signInPath} className={cn(buttonVariants())}>
        Sign In
      </Link>
    </>
  );

  return (
    <nav className="supports-backdrop-filter:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between items-center animate-header-from-top">
      <div className="flex items-center gap-x-2">
        <Link
          href={homePath}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
}
