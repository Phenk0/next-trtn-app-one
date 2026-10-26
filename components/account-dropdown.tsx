import { LucideLogOut } from "lucide-react";
import { SubmitButton } from "@/components/form/submit-button";
import { signOut } from "@/features/auth/actions/sign-out";
import { User } from "@/generated/prisma/client";

type AccountDropdownProps = {
  user: User;
};

const AccountDropdown = ({ user }: AccountDropdownProps) => {
  if (!user) return;
  return (
    <>
      <form action={signOut}>
        <SubmitButton
          label="Sign Out"
          icon={<LucideLogOut className="size-4.5" />}
          variant="outline"
        />
      </form>
    </>
  );
};
export { AccountDropdown };
