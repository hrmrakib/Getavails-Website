"use client";

import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "./CommonItem";
import {
  LayoutDashboard,
  MessageCircleMore,
  NotebookPen,
  Palette,
} from "lucide-react";
import { usePathname } from "next/navigation";

const AgentSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarMenu className='px-4 space-y-2'>
        <NavItem
          href='/dashboard/agent'
          icon={LayoutDashboard}
          label='Overview '
          active={pathname === "/dashboard/agent"}
        />

        <NavItem
          href='/dashboard/agent/artists-management'
          icon={Palette}
          label='Artists Management'
          active={
            pathname === "/dashboard/agent/artists-management" ||
            pathname.startsWith("/dashboard/agent/artists-management/")
          }
        />

        <NavItem
          href='/dashboard/agent/send-customer-offer'
          icon={NotebookPen}
          label='Send Customer Offer'
          active={
            pathname === "/dashboard/agent/send-customer-offer" ||
            pathname.startsWith("/dashboard/agent/send-customer-offer/")
          }
        />

        <NavItem
          href='/dashboard/agent/message'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/agent/message" ||
            pathname.startsWith("/dashboard/agent/message/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default AgentSidebar;
