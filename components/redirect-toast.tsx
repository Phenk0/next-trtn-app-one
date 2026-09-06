"use client";

import { useEffect } from "react";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { toast } from "@/components/ui/toast";

const RedirectToast = () => {
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
  }, []);

  return null;
};

export { RedirectToast };
