import { Suspense } from "react";
import Heading from "@/components/heading";
import { Spinner } from "@/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";
import { TicketsList } from "@/features/ticket/components/tickets-list";

export default function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="Your tickets are listed below." />

      <Card className="w-full max-w-105 self-center">
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>A new ticket will be created.</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketCreateForm />
        </CardContent>
      </Card>

      <Suspense fallback={<Spinner />}>
        <TicketsList />
      </Suspense>
    </div>
  );
}
