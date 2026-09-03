import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTicket } from "@/features/ticket/actions/create-ticket";

function TicketCreateForm() {
  return (
    <form action={createTicket} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        aria-label="Input title"
        required
      />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        aria-label="Input content"
        required
      />

      <Button type="submit">Create</Button>
    </form>
  );
}

export { TicketCreateForm };
