import { initialTickets } from "@/lib/data";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return (
      <h2 className="text-6xl text-center">Ticket #{ticketId} not found</h2>
    );
  }

  return (
    <div className="m-5">
      <h3 className="text-6xl text-center">{ticket.title}</h3>
      <p className="text-3xl">{ticket.content}</p>
      <p
        className={ticket.status === "OPEN" ? "text-green-400" : "text-red-400"}
      >
        Status: {ticket.status}
      </p>
    </div>
  );
}
