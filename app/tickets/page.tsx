import TicketsCard from "@/app/tickets/card";
import { Separator } from "@/components/ui/separator";
import { initialTickets } from "@/lib/data";

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
        <p className="text-sm text-muted-foreground">
          Your tickets are listed below.
        </p>
      </div>

      <Separator />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map((ticket) => (
          <TicketsCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
