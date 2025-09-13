"use client";

import React, { useState } from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { ExpandableNavItem, NavItem, SubNavItem } from "./CommonItem";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const AgentSidebar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(true);
  const pathname = usePathname();
  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };
  return (
    <>
      <SidebarMenu className='px-6 space-y-2'>
        <NavItem
          href='/dashboard/agent'
          icon={LayoutDashboard}
          label='Overview'
          active={pathname === "/dashboard/agent"}
        />

        <ExpandableNavItem
          icon={Users}
          label='User Management'
          isOpen={isUserManagementOpen}
          onToggle={toggleUserManagement}
          active={
            pathname === "/user-management" ||
            pathname.startsWith("/user-management") ||
            pathname === "/agent" ||
            pathname === "/artists" ||
            pathname === "/venue"
          }
        >
          <SubNavItem
            href='/agent'
            label='Agent'
            active={pathname === "/agent"}
          />
          <SubNavItem
            href='/artists'
            label='Artists'
            active={pathname === "/artists"}
          />
          <SubNavItem
            href='/venue'
            label='Venue'
            active={pathname === "/venue"}
          />
        </ExpandableNavItem>

        <NavItem
          href='/earnings'
          icon={Settings}
          label='Earnings'
          active={pathname === "/earnings" || pathname.startsWith("/earnings/")}
        />

        <NavItem
          href='/subscriptions'
          icon={Settings}
          label='Subscriptions'
          active={
            pathname === "/subscriptions" ||
            pathname.startsWith("/subscriptions/")
          }
        />

        <NavItem
          href='/blog-management'
          icon={Settings}
          label='Blog Management'
          active={
            pathname === "/blog-management" ||
            pathname.startsWith("/blog-management/")
          }
        />

        <NavItem
          href='/support'
          icon={Settings}
          label='Support'
          active={pathname === "/support" || pathname.startsWith("/support/")}
        />
      </SidebarMenu>
    </>
  );
};

export default AgentSidebar;
