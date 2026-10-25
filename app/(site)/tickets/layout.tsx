import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

type AuthenticatedLayoutProp = {
  children: React.ReactNode;
};

export default async function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProp) {
  await getAuthOrRedirect();

  return <>{children}</>;
}
