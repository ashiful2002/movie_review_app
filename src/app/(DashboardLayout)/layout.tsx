import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/services/authentication";
import { User } from "@/types";

export default async function Page({
  customer,
  admin,
  provider,
}: {
  customer: ReactNode;
  admin: ReactNode;
  provider: ReactNode;
}) {
  const user: User | null = await getUser();
  const userRole = user?.role;
  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      {userRole === "ADMIN" && admin}
      {userRole === "CUSTOMER" && customer}
      {userRole === "PROVIDER" && provider}
    </SidebarProvider>
  );
}
