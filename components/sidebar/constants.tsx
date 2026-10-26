import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";
import { NavItem } from "@/components/sidebar/types";
import { accountProfilePath, homePath, ticketsPath } from "@/lib/paths";

const navItems: NavItem[] = [
  { title: "All Tickets", href: homePath, icon: LucideLibrary },
  { title: "My Tickets", href: ticketsPath, icon: LucideBook },
  {
    title: "Account",
    href: accountProfilePath,
    icon: LucideCircleUser,
    separator: true,
  },
];

const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
export { closedClassName, navItems };
