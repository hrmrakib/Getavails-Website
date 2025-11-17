"use client";

import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "./CommonItem";
import {
  LayoutDashboard,
  BanknoteArrowUp,
  Medal,
  FolderKanban,
  MessageCircleMore,
} from "lucide-react";
import { usePathname } from "next/navigation";

const OrganizerSidebar = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      <SidebarMenu className='px-4 space-y-2'>
        <NavItem
          href='/dashboard/organizer'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/dashboard" || pathname === "/dashboard"}
        />

        <NavItem
          href='/dashboard/organizer/agent-offer'
          icon={BanknoteArrowUp}
          label='Agent Offer'
          active={
            pathname === "/dashboard/agent-offer" ||
            pathname.startsWith("/dashboard/agent-offer/")
          }
        />

        <NavItem
          href='/dashboard/organizer/venue-management'
          icon={Medal}
          label='Venue Management'
          active={
            pathname === "/dashboard/venue-management" ||
            pathname.startsWith("/dashboard/venue-management/")
          }
        />

        <NavItem
          href='/dashboard/organizer/events'
          icon={FolderKanban}
          label='Events'
          active={
            pathname === "/dashboard/events" ||
            pathname.startsWith("/dashboard/events/")
          }
        />

        <NavItem
          href='/dashboard/organizer/earn-ticket-info'
          icon={FolderKanban}
          label='Earn / Ticket Info. '
          active={
            pathname === "/dashboard/earn-ticket-info" ||
            pathname.startsWith("/dashboard/earn-ticket-info/")
          }
        />

        <NavItem
          href='/dashboard/organizer/message'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/organizer/message" ||
            pathname.startsWith("/dashboard/organizer/message/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default OrganizerSidebar;
