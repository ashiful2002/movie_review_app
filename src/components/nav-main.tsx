"use client";

import { ArrowLeft, Film, type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items }: { items: any }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-500"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to MMDB</span>
          <Film className="h-4 w-4" />
        </Link>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: any) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {/* <SidebarMenuButton tooltip={item.title} className="mt-3">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton> */}
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem: any) => (
                    <SidebarMenuSubItem key={subItem.title} className="py-2">
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                      >
                        <Link
                          href={subItem.url}
                          className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-yellow-400/10 hover:text-yellow-400"
                        >
                          {subItem.icon && (
                            <subItem.icon className=" h-4 w-4" />
                          )}
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
