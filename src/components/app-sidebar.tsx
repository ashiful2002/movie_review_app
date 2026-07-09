"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Plus,
  UtensilsCrossed,
  Clapperboard,
  Film,
  Tags,
  Tag,
  User,
  Users,
  Shield,
  ShieldCheck,
  Star,
  CreditCard,
} from "lucide-react";
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
    icon?: React.ComponentType<{ className?: string }>;
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
    title: "",
    url: "#",
    icon: UtensilsCrossed,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Add Meal",
        url: "/dashboard/add-meal",
        icon: Plus,
      },
      {
        title: "My Meals",
        url: "/dashboard/my-meals",
        icon: UtensilsCrossed,
      },
    ],
  },
];
const users_nav: NavItem[] = [
  {
    title: "User",
    url: "#",
    icon: User,
    isActive: true,
    items: [
      {
        title: "User Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
        icon: User,
      },
      {
        title: "My Reviews",
        url: "/dashboard/reviews",
        icon: Star,
      },
      {
        title: "Subscriptions",
        url: "/dashboard/subscriptions",
        icon: CreditCard,
      },
    ],
  },
];

const admin_nav: NavItem[] = [
  {
    title: "Admin",
    url: "/dashboard",
    icon: Shield,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Add Movie",
        url: "/dashboard/add-movie",
        icon: Plus,
      },
      {
        title: "Genres",
        url: "/dashboard/genre",
        icon: Tags,
      },
    ],
  },
];

const super_admin_nav: NavItem[] = [
  {
    title: "Super Admin",
    url: "/dashboard",
    icon: ShieldCheck,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Manage Admin",
        url: "/dashboard/manage-admin",
        icon: Users,
      },
      {
        title: "Add Movie",
        url: "/dashboard/add-movie",
        icon: Plus,
      },
      {
        title: "Manage Movies",
        url: "/dashboard/manage-movie",
        icon: Film,
      },
      {
        title: "Genres",
        url: "/dashboard/genres",
        icon: Tags,
      },
      {
        title: "Add Genre",
        url: "/dashboard/add-genre",
        icon: Tag,
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
