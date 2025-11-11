"use client";
import * as Icons from "lucide-react";
import itemsData from "../data/sidebarItems.json";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { FC, SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathName = usePathname();
  return (
    <Sidebar side="right" collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel> پنل مدیریت</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsData.map((item) => {
                const Icon = Icons[item.icon as keyof typeof Icons] as FC<
                  SVGProps<SVGSVGElement>
                >;
                const isActive = pathName === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="py-6"
                      asChild
                      isActive={isActive}
                    >
                      <Link href={item.url} className="flex items-center gap-2">
                        <Icon className="w-10 h-10" />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
            ‍
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
