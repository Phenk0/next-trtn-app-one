import { clsx } from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/constants";
import { Ticket } from "@/generated/prisma/client";
import { ticketPath } from "@/lib/paths";
import { cn } from "@/lib/utils";

type TicketCardProps = {
  //// generic ticket type:
  // ticket: | Awaited<ReturnType<typeof getTickets>>[number];
  //         | Awaited<ReturnType<typeof getTicket>>;
  ticket: Ticket;
  isDetail?: boolean;
};

export function TicketsCard({ ticket, isDetail }: TicketCardProps) {
  const DetailButton = () => (
    <Link
      href={ticketPath(ticket.id)}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <LucideSquareArrowOutUpRight />
    </Link>
  );
  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-105": !isDetail,
        "max-w-145": isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="line-clamp-1">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </CardDescription>
        </CardContent>
      </Card>
      {!isDetail && (
        <div className="flex flex-col gap-y-1">
          <DetailButton />
        </div>
      )}
    </div>
  );
}
