import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/lib/paths";

export default function SignInPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account."
        className="w-full max-w-105 animate-fade-in-from-top"
        content={<SignInForm />}
        footer={
          <>
            <Link href={signUpPath} className="text-sm text-muted-foreground">
              No account yet?
            </Link>

            <Link
              href={passwordForgotPath}
              className="text-sm text-muted-foreground"
            >
              Forgot password?
            </Link>
          </>
        }
      />
    </div>
  );
}
