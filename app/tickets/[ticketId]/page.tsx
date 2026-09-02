import { notFound } from "next/navigation";
import { TicketsCard } from "@/features/ticket/components/tickets-card";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketsCard ticket={ticket} isDetail />
    </div>
  );
}
