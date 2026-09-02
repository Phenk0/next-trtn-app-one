import { getTickets } from "../queries/get-tickets";
import { TicketsItem } from "./tickets-item";

async function TicketsList() {
  const tickets = await getTickets();

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <TicketsItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

export { TicketsList };
