"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarItem } from "@/components/sidebar/components/sidebar-item";
import { navItems } from "@/components/sidebar/constants";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { passwordForgotPath, signInPath, signUpPath } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { getActivePath } from "@/utils/get-active-path";

const Sidebar = () => {
  const { user, isFetched } = useAuth();
  const pathName = usePathname();
  const { activeIndex } = getActivePath(
    pathName,
    navItems.map((item) => item.href),
    [signInPath, signUpPath, passwordForgotPath],
  );

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  if (!isFetched || !user) {
    return <div className="w-17 bg-secondary/20"></div>;
  }
  return (
    <nav
      className={cn(
        "animate-sidebar-from-left",
        "animate-sidebar-from-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-50 w-17" : "w-17",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={activeIndex === index}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
