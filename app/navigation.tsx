import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { LucideKanban } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="supports-backdrop-filter:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
      <div>
        <Link
          href={homePath}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div>
        <Link
          href={ticketsPath}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
}
