import { redirect } from "next/navigation";
import { getAuth } from "@/features/auth/queries/get-auth";
import { signInPath } from "@/lib/paths";

const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) redirect(signInPath);

  return auth;
};
export { getAuthOrRedirect };
