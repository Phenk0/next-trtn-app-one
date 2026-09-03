const homePath = "/";
const ticketsPath = "/tickets";
const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;

export { homePath, ticketEditPath, ticketPath, ticketsPath };
