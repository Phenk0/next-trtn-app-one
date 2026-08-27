import Heading from "@/components/heading";
import { TicketsCard } from "@/feature/components/tickets-card";
import { initialTickets } from "@/lib/data";

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="Your tickets are listed below." />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map((ticket) => (
          <TicketsCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
