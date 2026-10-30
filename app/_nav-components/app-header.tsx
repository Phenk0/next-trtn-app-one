"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { AccountDropdown } from "@/app/_nav-components/account-dropdown";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/lib/paths";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  const { user, isFetched } = useAuth();

  if (!isFetched) return null;

  const navItems = user ? (
    <AccountDropdown user={user} />
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
          <LucideKanban className="size-4.5" />
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
