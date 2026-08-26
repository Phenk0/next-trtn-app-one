type TicketType = {
  id: string;
  title: string;
  content: string;
  status: "OPEN" | "DONE" | "IN_PROGRESS";
};
const initialTickets: TicketType[] = [
  {
    id: "1",
    title: "Ticket 1",
    content: "Description 1",
    status: "DONE", // as const,
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "Description Description Description 2",
    status: "OPEN",
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "Description 3",
    status: "IN_PROGRESS",
  },
];

export { initialTickets };
