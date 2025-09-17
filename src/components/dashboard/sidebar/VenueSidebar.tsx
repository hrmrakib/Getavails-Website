"use client";

import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "./CommonItem";
import {
  BookAlert,
  BookCheck,
  CalendarDays,
  LayoutDashboard,
  MessageCircleMore,
} from "lucide-react";
import { usePathname } from "next/navigation";

const VenueSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarMenu className='px-6 space-y-2'>
        <NavItem
          href='/dashboard/venue'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/dashboard/venue"}
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
          href='/dashboard/venue/bookings-requests'
          icon={BookAlert}
          label='Bookings Requests'
          active={
            pathname === "/dashboard/venue/subscriptions" ||
            pathname.startsWith("/dashboard/venue/bookings-requests/")
          }
        />

        <NavItem
          href='/dashboard/venue/confirm-booking'
          icon={BookCheck}
          label='Confirm Booking'
          active={
            pathname === "/dashboard/venue/confirm-booking" ||
            pathname.startsWith("/dashboard/venue/confirm-booking/")
          }
        />

        <NavItem
          href='/dashboard/venue/message'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/venue/message" ||
            pathname.startsWith("/dashboard/venue/message/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default VenueSidebar;
