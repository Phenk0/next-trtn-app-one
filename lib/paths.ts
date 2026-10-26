const homePath = "/";
const ticketsPath = "/tickets";
const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;

const signUpPath = "/sign-up";
const signInPath = "/sign-in";
const passwordForgotPath = "/password-forgot";

const accountProfilePath = "/account/profile";
const accountPasswordPath = "/account/password";

export {
  accountPasswordPath,
  accountProfilePath,
  homePath,
  passwordForgotPath,
  signInPath,
  signUpPath,
  ticketEditPath,
  ticketPath,
  ticketsPath,
};
