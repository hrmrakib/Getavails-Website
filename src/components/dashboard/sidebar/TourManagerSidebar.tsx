"use client";

import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "./CommonItem";
import { LayoutDashboard, Map, MessageCircleMore, Palette } from "lucide-react";
import { usePathname } from "next/navigation";
import { RoleRedirect } from "@/utils/makePrivate";

const TourManagerSidebar = () => {
  const pathname = usePathname();

  return (
    <RoleRedirect allowedRole='TOUR_MANAGER'>
      <>
        <SidebarMenu className='px-4 space-y-2'>
          <NavItem
            href='/dashboard/tour_manager'
            icon={LayoutDashboard}
            label='Calendar'
            active={pathname === "/dashboard/tour_manager"}
          />

          {/* <NavItem
            href='/dashboard/tour_manager/create-request'
            icon={Palette}
            label='Create Request'
            active={
              pathname === "/dashboard/tour_manager/create-request" ||
              pathname.startsWith("/dashboard/tour_manager/create-request/")
            }
          /> */}

          <NavItem
            href='/dashboard/tour_manager/message'
            icon={MessageCircleMore}
            label='Message'
            active={
              pathname === "/dashboard/tour_manager/message" ||
              pathname.startsWith("/dashboard/tour_manager/message/")
            }
          />

          <NavItem
            href='/dashboard/tour_manager/chatbot'
            icon={MessageCircleMore}
            label='Chatbot'
            active={
              pathname === "/dashboard/tour_manager/chatbot" ||
              pathname.startsWith("/dashboard/tour_manager/chatbot/")
            }
          />
          <NavItem
            href='/dashboard/tour_manager/map'
            icon={Map}
            label='Map'
            active={
              pathname === "/dashboard/tour_manager/map" ||
              pathname.startsWith("/dashboard/tour_manager/map/")
            }
          />
        </SidebarMenu>
      </>
    </RoleRedirect>
  );
};

export default TourManagerSidebar;
