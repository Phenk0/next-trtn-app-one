import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import Heading from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { TicketsList } from "@/features/ticket/components/tickets-list";

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="Your tickets are listed below." />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created."
        content={<TicketUpsertForm />}
        className="w-full max-w-105 self-center"
      />

      <Suspense fallback={<Spinner />}>
        <TicketsList />
      </Suspense>
    </div>
  );
}
