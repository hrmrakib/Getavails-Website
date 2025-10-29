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
  Headset,
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
            pathname === "/dashboard/user-management" ||
            pathname.startsWith("/dashboard/user-management") ||
            pathname === "/dashboard/agent" ||
            pathname === "/dashboard/artists" ||
            pathname === "/dashboard/venue" ||
            pathname === "/dashboard/buyer"
          }
        >
          <SubNavItem
            href='/dashboard/user'
            label='User'
            active={pathname === "/dashboard/user"}
          />
          <SubNavItem
            href='/dashboard/agent'
            label='Agent'
            active={pathname === "/dashboard/agent"}
          />

          <SubNavItem
            href='/dashboard/artists'
            label='Artists'
            active={pathname === "/dashboard/artists"}
          />

          <SubNavItem
            href='/dashboard/venue'
            label='Venue'
            active={pathname === "/dashboard/venue"}
          />

          <SubNavItem
            href='/dashboard/buyer'
            label='Buyer'
            active={pathname === "/dashboard/buyer"}
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
          href='/dashboard/support'
          icon={Headset}
          label='Support'
          active={
            pathname === "/dashboard/support" ||
            pathname.startsWith("/dashboard/support/")
          }
        />
      </SidebarMenu>
    </>
  );
};

export default AdminSidebar;
