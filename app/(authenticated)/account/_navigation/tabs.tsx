"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountPasswordPath, accountProfilePath } from "@/lib/paths";

const AccountTabs = () => {
  const pathname = usePathname();
  const curPage = pathname.split("/").pop();
  return (
    <Tabs value={curPage}>
      <TabsList>
        <TabsTrigger
          value={"profile"}
          nativeButton={false}
          render={<Link href={accountProfilePath}></Link>}
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="password"
          nativeButton={false}
          render={<Link href={accountPasswordPath}></Link>}
        >
          Password
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export { AccountTabs };
