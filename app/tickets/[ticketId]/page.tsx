import Link from "next/link";
import Placeholder from "@/components/placeholder";
import { buttonVariants } from "@/components/ui/button";
import { TicketsCard } from "@/feature/components/tickets-card";
import { initialTickets } from "@/lib/data";
import { ticketsPath } from "@/lib/paths";
import { cn } from "@/lib/utils";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return (
      <Placeholder
        label={`Ticket #${ticketId} not found`}
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

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketsCard ticket={ticket} isDetail />
    </div>
  );
}
