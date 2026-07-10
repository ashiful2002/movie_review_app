import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/services/authentication";
import { User } from "@/types";

export default async function Page({
  user,
  admin,
  superAdmin,
}: {
  user: ReactNode;
  admin: ReactNode;
  superAdmin: ReactNode;
}) {
  const currentUser: User | any = await getUser();
  const userRole = currentUser?.role;
  return (
    <SidebarProvider>
      <AppSidebar user={currentUser} />

      <main className="flex flex-1 flex-col">
        {/* HEADER */}
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
          <h1 className="ml-2 font-semibold">Dashboard</h1>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-4">
          {userRole === "SUPER_ADMIN" && superAdmin}
          {userRole === "ADMIN" && admin}
          {userRole === "USER" && user}
        </div>
      </main>
    </SidebarProvider>
  );
}
