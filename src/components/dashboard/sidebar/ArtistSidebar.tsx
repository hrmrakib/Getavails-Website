"use client";

import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "./CommonItem";
import {
  CalendarDays,
  LayoutDashboard,
  MessageCircleMore,
  SearchCheck,
  TicketPercent,
} from "lucide-react";
import { usePathname } from "next/navigation";

const ArtistSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarMenu className='px-4 space-y-2'>
        <NavItem
          href='/dashboard/artist'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/dashboard/artist"}
        />

        <NavItem
          href='/dashboard/artist/availability-calendar'
          icon={CalendarDays}
          label='Availability Calendar'
          active={
            pathname === "/earnings" ||
            pathname.startsWith("/dashboard/artist/availability-calendar/")
          }
        />

        <NavItem
          href='/dashboard/artist/find-agent'
          icon={SearchCheck}
          label='Find an Agent'
          active={
            pathname === "/dashboard/artist/find-agent" ||
            pathname.startsWith("/dashboard/artist/find-agent/")
          }
        />

        <NavItem
          href='/dashboard/artist/bookings-requests'
          icon={TicketPercent}
          label='Bookings Requests'
          active={
            pathname === "/blog-management" ||
            pathname.startsWith("/blog-management/")
          }
        />

        <NavItem
          href='/dashboard/artist/message'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/artist/message" ||
            pathname.startsWith("/dashboard/artist/message/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default ArtistSidebar;
