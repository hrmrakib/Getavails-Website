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
        <NavItem
          href='/dashboard/buyer'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/"}
        />

        <ExpandableNavItem
          icon={Users}
          label='Talent Hub'
          isOpen={isUserManagementOpen}
          onToggle={toggleUserManagement}
          active={
            pathname === "/dashboard/buyer/talent-hub" ||
            pathname.startsWith("/user-management") ||
            pathname === "/artists" ||
            pathname === "/venue"
          }
        >
          <SubNavItem
            href='/dashboard/buyer/talent-hub/artists'
            label='Artists'
            active={pathname === "/dashboard/buyer/talent-hub/artists"}
          />
          <SubNavItem
            href='/dashboard/buyer/talent-hub/venue'
            label='Venue'
            active={pathname === "/dashboard/buyer/talent-hub/venue"}
          />
        </ExpandableNavItem>

        <NavItem
          href='/dashboard/buyer/bookings-requests'
          icon={BookAlert}
          label='Bookings Requests'
          active={
            pathname === "/dashboard/buyer/bookings-requests" ||
            pathname.startsWith("/dashboard/buyer/bookings-requests/")
          }
        />

        <NavItem
          href='/dashboard/buyer/upcoming-events'
          icon={CalendarArrowUp}
          label='Upcoming Events'
          active={
            pathname === "/dashboard/buyer/upcoming-events" ||
            pathname.startsWith("/dashboard/buyer/upcoming-events")
          }
        />

        <NavItem
          href='/dashboard/buyer/message'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/buyer/message" ||
            pathname.startsWith("/dashboard/buyer/message/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default UserSidebar;
