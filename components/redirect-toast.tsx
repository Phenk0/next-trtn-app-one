"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { toast } from "@/components/ui/toast";

const RedirectToast = () => {
  const pathname = usePathname();
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");
      if (!message) return;

      toast.add({
        type: "success",
        description: message,
      });
      await deleteCookieByKey("toast");
    };
    showCookieToast();
  }, [pathname]); // to shoe toast on Redirect actions

  return null;
};

export { RedirectToast };
