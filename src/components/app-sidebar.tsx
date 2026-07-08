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
        title: "Dashboard",
        url: "/dashboard",
      },
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
const users_nav: NavItem[] = [
  {
    title: "Users Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
      {
        title: "Subscriptions",
        url: "/dashboard/subscriptions",
      },
    ],
  },
];

const admin_nav: NavItem[] = [
  {
    title: "Admin",
    url: "/dashboard",
    icon: UserIcon,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },

      {
        title: "Add Movie",
        url: "/dashboard/add-movie",
      },
      {
        title: "Genre",
        url: "/dashboard/genre",
      },
    ],
  },
];
const super_admin_nav: NavItem[] = [
  {
    title: "SuperAdmin",
    url: "/dashboard",
    icon: UserIcon,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },

      {
        title: "Manage Admin",
        url: "/dashboard/manage-admin",
      },
      {
        title: "Add Movie",
        url: "/dashboard/add-movie",
      },
      {
        title: "Manage Movies",
        url: "/dashboard/manage-movie",
      },
      {
        title: "Genres",
        url: "/dashboard/genres",
      },
      {
        title: "Add Genre",
        url: "/dashboard/add-genre",
      },
    ],
  },
];

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  let navItems: NavItem[] = [];

  if (user?.role === "ADMIN") {
    navItems = admin_nav;
  } else if (user?.role === "USER") {
    navItems = users_nav;
  } else if (user?.role === "SUPER_ADMIN") {
    navItems = super_admin_nav;
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
