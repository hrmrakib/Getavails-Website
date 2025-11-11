"use client";

import React, { useState } from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { ExpandableNavItem, NavItem, SubNavItem } from "./CommonItem";
import {
  LayoutDashboard,
  Users,
  BookAlert,
  CalendarArrowUp,
  MessageCircleMore,
} from "lucide-react";
import { usePathname } from "next/navigation";

const UserSidebar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(true);
  const pathname = usePathname();

  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  return (
    <>
      <SidebarMenu className='px-4 space-y-2'>
        {/* <NavItem
          href='/dashboard/user'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/"}
        /> */}

        {/* <ExpandableNavItem
          icon={Users}
          label='Talent Hub'
          isOpen={isUserManagementOpen}
          onToggle={toggleUserManagement}
          active={
            pathname === "/dashboard/user/talent-hub" ||
            pathname.startsWith("/user-management") ||
            pathname === "/artists" ||
            pathname === "/venue"
          }
        >
          <SubNavItem
            href='/dashboard/user/talent-hub/artists'
            label='Artists'
            active={pathname === "/dashboard/user/talent-hub/artists"}
          />
          <SubNavItem
            href='/dashboard/user/talent-hub/venue'
            label='Venue'
            active={pathname === "/dashboard/user/talent-hub/venue"}
          />
        </ExpandableNavItem> */}

        {/* <NavItem
          href='/dashboard/user/bookings-requests'
          icon={BookAlert}
          label='Bookings Requests'
          active={
            pathname === "/dashboard/user/bookings-requests" ||
            pathname.startsWith("/dashboard/user/bookings-requests/")
          }
        /> */}

        <NavItem
          href='/dashboard/user/event-list'
          icon={CalendarArrowUp}
          label='Event List'
          active={
            pathname === "/dashboard/user/event-list" ||  pathname === "/dashboard/user" ||
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

        {/* <NavItem
          href='/dashboard/user/message'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/user/message" ||
            pathname.startsWith("/dashboard/user/message/")
          }
        /> */}
      </SidebarMenu>
    </>
  );
};

export default UserSidebar;
