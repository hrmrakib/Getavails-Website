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
      <SidebarMenu className='px-6 space-y-2'>
        <NavItem
          href='/dashboard/artists'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/dashboard/artists"}
        />

        <NavItem
          href='/dashboard/artists/availability-calendar'
          icon={CalendarDays}
          label='Availability Calendar'
          active={
            pathname === "/earnings" ||
            pathname.startsWith("/dashboard/artists/availability-calendar/")
          }
        />

        <NavItem
          href='/dashboard/artists/find-agent'
          icon={SearchCheck}
          label='Find an Agent'
          active={
            pathname === "//dashboard/artists/find-agent" ||
            pathname.startsWith("/dashboard/artists/find-agent/")
          }
        />

        <NavItem
          href='/dashboard/artists/bookings-requests'
          icon={TicketPercent}
          label='Bookings Requests'
          active={
            pathname === "/blog-management" ||
            pathname.startsWith("/blog-management/")
          }
        />

        <NavItem
          href='/dashboard/artists/message'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/artists/message" ||
            pathname.startsWith("/dashboard/artists/message/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default ArtistSidebar;
