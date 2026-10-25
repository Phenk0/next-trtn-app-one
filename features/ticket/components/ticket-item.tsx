import { clsx } from "clsx";
import {
  LucideEdit,
  LucideMoreVertical,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/constants";
import { TicketMoreMenu } from "@/features/ticket/components/ticket-more-menu";
import { Prisma } from "@/generated/prisma/client";
import { ticketEditPath, ticketPath } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { toCurrencyFromCents } from "@/utils/currency";

type TicketCardProps = {
  //// generic ticket type:
  // ticket: | Awaited<ReturnType<typeof getTickets>>[number];
  //         | Awaited<ReturnType<typeof getTicket>>;
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { username: true } } };
  }>;
  isDetail?: boolean;
};

export function TicketItem({ ticket, isDetail }: TicketCardProps) {
  const detailButton = (
    <Link
      prefetch
      href={ticketPath(ticket.id)}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <LucideSquareArrowOutUpRight />
    </Link>
  );

  const editButton = (
    <Link
      prefetch
      href={ticketEditPath(ticket.id)}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
    >
      <LucideEdit />
    </Link>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button size="icon" variant="outline" aria-label="More menu">
          <LucideMoreVertical />
        </Button>
      }
    />
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {ticket.deadline} by {ticket.user.username}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {!isDetail ? (
          <>
            {detailButton}
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {editButton}
            {moreMenu}
          </>
        )}
      </div>
    </div>
  );
}
