import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "@/features/auth/queries/get-auth";
import { User } from "@/generated/prisma/client";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    };
    fetchUser();
  }, [pathName]);

  return { user, isFetched };
};

export { useAuth };
