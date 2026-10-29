import { SearchInput } from "@/components/search-input";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import Placeholder from "@/components/placeholder";

type TicketListProps = {
  userId?: string;
  search?: string | string[] | undefined;
};

async function TicketList({ userId, search }: TicketListProps) {
  const searchString = typeof search === "string" ? search : undefined;
  const tickets = await getTickets(userId, searchString);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-105">
        <SearchInput placeholder="Search tickets" />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
}

export { TicketList };
