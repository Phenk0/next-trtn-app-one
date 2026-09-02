import Link from "next/link";
import Placeholder from "@/components/placeholder";
import { buttonVariants } from "@/components/ui/button";
import { ticketsPath } from "@/lib/paths";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Placeholder
      label={`Ticket not found`}
      color="destructive"
      button={
        <Link
          href={ticketsPath}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Go to Tickets Page
        </Link>
      }
    />
  );
}
