"use client";

import { LucideTrash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useConfirmDialog } from "@/components/confirm-dialog";
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
import { deleteTicket } from "@/features/ticket/actions/delete-ticket";
import { updateTicketStatus } from "@/features/ticket/actions/update-ticket-status";
import { Ticket, TicketStatus } from "@/generated/prisma/client";

type TicketMoreMenuProps = { ticket: Ticket; trigger: React.ReactElement };

export function TicketMoreMenu({ ticket, trigger }: TicketMoreMenuProps) {
  const pathname = usePathname();
  const [deleteButton, deleteDialog] = useConfirmDialog({
    confirmAction: deleteTicket.bind(null, ticket.id, pathname),
    trigger: (
      <DropdownMenuItem variant="destructive" aria-label="Delete ticket">
        <LucideTrash />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
    isDestructive: true,
    title: "Delete ticket",
    description: "Are you sure you want to delete this ticket?",
  });

  const handleUpdateTicketStatus = async (value: TicketStatus) => {
    const promiseUpdate = updateTicketStatus(ticket.id, value).then(
      (result) => {
        if (result.status === "ERROR") {
          return Promise.reject(new Error(result.message));
        }
        return result;
      },
    );

    await toast
      .promise(promiseUpdate, {
        loading: "Updating ticket status…",
        success: (result) => result.message,
        error: (error) =>
          error instanceof Error
            ? error.message
            : "Failed to update ticket status.",
      })
      .catch(() => undefined);
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
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger render={trigger}></DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="left">
          {ticketStatusRadioGroup}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>{deleteButton}</DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
