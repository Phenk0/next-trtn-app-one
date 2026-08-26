import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ticketPath } from "@/lib/paths";
import { cn } from "@/lib/utils";

type TicketCardProps = {
  ticket: {
    id: string;
    title: string;
    content: string;
    status: "OPEN" | "IN_PROGRESS" | "DONE";
  };
};

const TICKET_ICONS = {
  OPEN: <LucidePencil />,
  DONE: <LucideCircleCheck />,
  IN_PROGRESS: <LucideFileText />,
};

export default function TicketsCard({ ticket }: TicketCardProps) {
  return (
    <Card className="w-full max-w-105">
      <CardHeader>
        <CardTitle className="flex gap-2">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className="line-clamp-1">{ticket.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 whitespace-break-spaces">
          {ticket.content}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={ticketPath(ticket.id)}
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
