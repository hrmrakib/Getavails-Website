"use client";

import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "./CommonItem";
import { LayoutDashboard, Map, MessageCircleMore, Palette } from "lucide-react";
import { usePathname } from "next/navigation";
import { RoleRedirect } from "@/utils/makePrivate";

const AgentSidebar = () => {
  const pathname = usePathname();

  return (
    <RoleRedirect allowedRole='TOUR_MANAGER'>
      <>
        <SidebarMenu className='px-4 space-y-2'>
          <NavItem
            href='/dashboard/tour-manager'
            icon={LayoutDashboard}
            label='Calendar'
            active={pathname === "/dashboard/tour-manager"}
          />

          <NavItem
            href='/dashboard/tour-manager/create-request'
            icon={Palette}
            label='Create Request'
            active={
              pathname === "/dashboard/tour-manager/create-request" ||
              pathname.startsWith("/dashboard/tour-manager/create-request/")
            }
          />

          <NavItem
            href='/dashboard/tour-manager/message'
            icon={MessageCircleMore}
            label='Message'
            active={
              pathname === "/dashboard/tour-manager/message" ||
              pathname.startsWith("/dashboard/tour-manager/message/")
            }
          />

          <NavItem
            href='/dashboard/tour-manager/chatbot'
            icon={MessageCircleMore}
            label='Chatbot'
            active={
              pathname === "/dashboard/tour-manager/chatbot" ||
              pathname.startsWith("/dashboard/tour-manager/chatbot/")
            }
          />
          <NavItem
            href='/dashboard/tour-manager/map'
            icon={Map}
            label='Map'
            active={
              pathname === "/dashboard/tour-manager/map" ||
              pathname.startsWith("/dashboard/tour-manager/map/")
            }
          />
        </SidebarMenu>
      </>
    </RoleRedirect>
  );
};

export default AgentSidebar;
