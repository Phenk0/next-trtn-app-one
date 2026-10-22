"use client";

import { LucideTrash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { TICKET_STATUS_LABELS } from "@/features/constants";
import { updateTicketStatus } from "@/features/ticket/actions/update-ticket-status";
import { Ticket, TicketStatus } from "@/generated/prisma/client";

type TicketMoreMenuProps = { ticket: Ticket; trigger: React.ReactElement };

export function TicketMoreMenu({ ticket, trigger }: TicketMoreMenuProps) {
  const deleteButton = (
    <DropdownMenuItem variant="destructive">
      <LucideTrash /> Delete
    </DropdownMenuItem>
  );

  const handleUpdateTicketStatus = async (value: TicketStatus) => {
    await toast.promise(
      updateTicketStatus(ticket.id, value).then((result) => {
        if (result.status === "ERROR") {
          throw new Error(result.message);
        }
        return result;
      }),
      {
        loading: "Updating ticket status…",
        success: (result) => result.message,
        error: (error) =>
          error instanceof Error
            ? error.message
            : "Failed to update ticket status.",
      },
    );
    // const result = await updateTicketStatus(ticket.id, value);
    // if (result.status === "ERROR") {
    //   toast.add({
    //     type: "error",
    //     title: result.message,
    //   });
    // } else if (result.status === "SUCCESS") {
    //   toast.add({
    //     type: "success",
    //     title: result.message,
    //   });
    // }
  };

  const ticketStatusRadioGroup = (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Ticket status</DropdownMenuLabel>
      <DropdownMenuRadioGroup
        value={ticket.status}
        onValueChange={handleUpdateTicketStatus}
      >
        {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map(
          (key) => (
            <DropdownMenuRadioItem value={key} key={key}>
              {TICKET_STATUS_LABELS[key]}
            </DropdownMenuRadioItem>
          ),
        )}
      </DropdownMenuRadioGroup>
    </DropdownMenuGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger}></DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="left">
        {ticketStatusRadioGroup}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>{deleteButton}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
