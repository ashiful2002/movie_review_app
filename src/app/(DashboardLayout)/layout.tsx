import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUser } from "@/services/authentication";
import React from "react";

export default async function Page({
  customer,
  admin,
  provider,
}: {
  customer: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
}) {
  const user = await getUser();
  const userRole = user?.role;
  return (
    <SidebarProvider>
      <AppSidebar />

      {userRole === "ADMIN" && admin}
      {userRole === "CUSTOMER" && customer}
      {userRole === "PROVIDER" && provider}
    </SidebarProvider>
  );
}
