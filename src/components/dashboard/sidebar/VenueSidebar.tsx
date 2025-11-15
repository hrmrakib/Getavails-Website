"use client";

import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "./CommonItem";
import {
  CalendarDays,
  LayoutDashboard,
  MapIcon,
  MessageCircleMore,
} from "lucide-react";
import { usePathname } from "next/navigation";

const VenueSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarMenu className='px-4 space-y-2'>
        <NavItem
          href='/dashboard/venue'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/dashboard/venue"}
        />

        <NavItem
          href='/dashboard/venue/venue-management'
          icon={MapIcon}
          label='Venue Management'
          active={
            pathname === "/dashboard/venue/venue-management" ||
            pathname.startsWith("/dashboard/venue/venue-management/")
          }
        />

        <NavItem
          href='/dashboard/venue/availability-calendar'
          icon={CalendarDays}
          label='Availability Calendar'
          active={
            pathname === "/dashboard/venue/availability-calendar" ||
            pathname.startsWith("/dashboard/venue/availability-calendar/")
          }
        />

        <NavItem
          href='/dashboard/venue/message/'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/venue/message/" ||
            pathname.startsWith("/dashboard/venue/message/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default VenueSidebar;
