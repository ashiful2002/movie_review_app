"use client";

import * as React from "react";
import { LayoutDashboard, User, UserIcon } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserRole } from "@/types";



type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  items: {
    title: string;
    url: string;
  }[];
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: UserRole;
  } | null;
};

const navMain: NavItem[] = [
  {
    title: "Providers Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Add Meal",
        url: "/dashboard/add-meal",
      },
      {
        title: "My meals",
        url: "/dashboard/my-meals",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
];
const providers_dashboard: NavItem[] = [
  {
    title: "Providers Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Add Meal",
        url: "/dashboard/add-meal",
      },
      {
        title: "My meals",
        url: "/dashboard/my-meals",
      },
    ],
  },
];

const admin_nav: NavItem[] = [
  {
    title: "Admin Dashboard",
    url: "#",
    icon: UserIcon,
    isActive: true,
    items: [
      {
        title: "Manage Users",
        url: "/dashboard/users",
      },
      {
        title: "My meals",
        url: "/dashboard/",
      },
    ],
  },
];
const customer_nav: NavItem[] = [
  {
    title: "Customer Dashboard",
    url: "#",
    icon: User,
    isActive: true,
    items: [
      {
        title: "cart",
        url: "/cart",
      },
    ],
  },
];

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  let navItems: NavItem[] = [];

  if (user?.role === "ADMIN") {
    navItems = admin_nav;
  } else if (user?.role === "PROVIDER") {
    navItems = providers_dashboard;
  } else if (user?.role === "CUSTOMER") {
    navItems = customer_nav;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
