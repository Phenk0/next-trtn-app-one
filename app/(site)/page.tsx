import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets created by you and others"
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
}
