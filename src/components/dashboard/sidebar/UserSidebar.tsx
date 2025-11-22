"use client";

import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "./CommonItem";
import { CalendarArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

const UserSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarMenu className='px-4 space-y-2'>
        <NavItem
          href='/dashboard/user/'
          icon={CalendarArrowUp}
          label='Event List'
          active={
            pathname === "/dashboard/user/event-list" ||
            pathname === "/dashboard/user" ||
            pathname.startsWith("/dashboard/user/event-list/")
          }
        />

        <NavItem
          href='/dashboard/user/upcoming-events'
          icon={CalendarArrowUp}
          label='Upcoming Events'
          active={
            pathname === "/dashboard/user/upcoming-events" ||
            pathname.startsWith("/dashboard/user/upcoming-events")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default UserSidebar;
