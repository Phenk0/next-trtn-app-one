import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/features/auth/actions/sign-out";
import { User } from "@/generated/prisma/client";
import { accountPasswordPath, accountProfilePath } from "@/lib/paths";

type AccountDropdownProps = {
  user: User;
};

const AccountDropdown = ({ user }: AccountDropdownProps) => {
  if (!user) return;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {/*<AvatarImage src={user.image} />*/}
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={
                <Link href={accountProfilePath}>
                  <LucideUser className="mr-2 size-4.5" />
                  <span>Profile</span>
                </Link>
              }
            />
            <DropdownMenuItem
              render={
                <Link href={accountPasswordPath}>
                  <LucideLock className="mr-2 size-4.5" />
                  <span>Password</span>
                </Link>
              }
            />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={
                <form action={signOut}>
                  <LucideLogOut className="mr-2 size-4.5" />
                  <button type="submit">Sign Out</button>
                </form>
              }
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export { AccountDropdown };
