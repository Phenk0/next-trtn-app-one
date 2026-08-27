import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/lib/paths";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  return (
    <nav className="supports-backdrop-filter:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between items-center">
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
        <Link href={ticketsPath} className={cn(buttonVariants())}>
          Tickets
        </Link>
      </div>
    </nav>
  );
}
