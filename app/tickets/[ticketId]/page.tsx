import { notFound } from "next/navigation";
import { TicketsItem } from "@/features/ticket/components/tickets-item";
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
      <TicketsItem ticket={ticket} isDetail />
    </div>
  );
}
