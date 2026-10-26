"use client";

import { useState } from "react";
import { SidebarItem } from "@/components/sidebar/components/sidebar-item";
import { navItems } from "@/components/sidebar/constants";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { user, isFetched } = useAuth();

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
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              // isActive={activeIndex === index}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
