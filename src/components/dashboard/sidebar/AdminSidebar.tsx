"use client";

import React, { useState } from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { ExpandableNavItem, NavItem, SubNavItem } from "./CommonItem";
import {
  LayoutDashboard,
  Users,
  BanknoteArrowUp,
  Medal,
  FolderKanban,
  MessageCircleMore,
} from "lucide-react";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(true);
  const pathname = usePathname();
  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  console.log(pathname);

  return (
    <>
      <SidebarMenu className='px-4 space-y-2'>
        <NavItem
          href='/dashboard'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/dashboard" || pathname === "/dashboard"}
        />

        <ExpandableNavItem
          icon={Users}
          label='User Management'
          isOpen={isUserManagementOpen}
          onToggle={toggleUserManagement}
          active={
            pathname === "/dashboard/user-list" ||
            pathname.startsWith("/dashboard/user-list/") ||
            pathname === "/dashboard/agent-list" ||
            pathname === "/dashboard/artist-list" ||
            pathname === "/dashboard/venue-list" ||
            pathname === "/dashboard/buyer-list"
          }
        >
          <SubNavItem
            href='/dashboard/user-list'
            label='User'
            active={pathname === "/dashboard/user-list"}
          />
          <SubNavItem
            href='/dashboard/agent-list'
            label='Agent'
            active={pathname === "/dashboard/agent-list"}
          />

          <SubNavItem
            href='/dashboard/artist-list'
            label='Artists'
            active={pathname === "/dashboard/artist-list"}
          />

          <SubNavItem
            href='/dashboard/venue-list'
            label='Venue'
            active={pathname === "/dashboard/venue-list"}
          />

          <SubNavItem
            href='/dashboard/organizer-list'
            label='Organizer'
            active={pathname === "/dashboard/organizer-list"}
          />
        </ExpandableNavItem>

        <NavItem
          href='/dashboard/earnings'
          icon={BanknoteArrowUp}
          label='Earnings'
          active={
            pathname === "/dashboard/earnings" ||
            pathname.startsWith("/dashboard/earnings/")
          }
        />

        <NavItem
          href='/dashboard/subscriptions'
          icon={Medal}
          label='Subscriptions'
          active={
            pathname === "/dashboard/subscriptions" ||
            pathname.startsWith("/dashboard/subscriptions/")
          }
        />

        <NavItem
          href='/dashboard/blog-management'
          icon={FolderKanban}
          label='Blog Management'
          active={
            pathname === "/dashboard/blog-management" ||
            pathname.startsWith("/dashboard/blog-management/")
          }
        />

        <NavItem
          href='/dashboard/message'
          icon={MessageCircleMore}
          label='Message'
          active={
            pathname === "/dashboard/message" ||
            pathname.startsWith("/dashboard/message/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default AdminSidebar;
