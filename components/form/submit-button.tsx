"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement;
  variant?:
    "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "icon" | "sm" | "lg";
};

function SubmitButton({ label, icon, variant, size }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const iconStyles = label && icon ? "h-[1.4em] w-[1.4em]" : "";
  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending && (
        <span className={iconStyles}>
          <LucideLoaderCircle className="animate-spin" />
        </span>
      )}
      {label}

      {pending ? null : icon && <span className={iconStyles}>{icon}</span>}
    </Button>
  );
}

export { SubmitButton };
