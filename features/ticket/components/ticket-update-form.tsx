import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTicket } from "@/features/ticket/actions/update-ticket";
import { Ticket } from "@/generated/prisma/client";

type TicketUpdateFormProps = {
  ticket: Ticket;
};

function TicketUpdateForm({ ticket }: TicketUpdateFormProps) {
  return (
    <form
      action={updateTicket.bind(null, ticket.id)}
      className="flex flex-col gap-y-2"
    >
      <Input type="hidden" name="id" value={ticket.id} />

      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={ticket.title}
        required
      />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={ticket.content}
        required
      />

      <Button type="submit">Update</Button>
    </form>
  );
}

export { TicketUpdateForm };
