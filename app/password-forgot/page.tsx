import Link from "next/link";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { homePath } from "@/lib/paths";

export default function PasswordForgotPage() {
  return (
    <div className="m-4 flex flex-col h-[calc(100vh-2rem)] items-center justify-center">
      <Heading title="Forgot password?" description="GOOD!" />
      <Button
        variant="outline"
        nativeButton={false}
        className="m-2"
        render={<Link href={homePath}>Go Home</Link>}
      />
    </div>
  );
}
