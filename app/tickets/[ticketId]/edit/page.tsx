import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type EditPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function EditPage({ params }: EditPageProps) {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-105 animate-fade-in-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
}
