"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Building,
  Mic,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const roles = [
  {
    id: "agents",
    title: "Agents",
    icon: Users,
    description:
      "Manage your roster, negotiate deals, and track performance, all from one central dashboard.",
    buttonText: "Join as Agent",
  },
  {
    id: "venues",
    title: "Venues",
    icon: Building,
    description:
      "Showcase your space, manage bookings, and connect with artists and event organizers seamlessly.",
    buttonText: "Join as Venue",
  },
  {
    id: "artists",
    title: "Artists",
    icon: Mic,
    description:
      "Build your profile, showcase your talent, and connect with venues and booking agents worldwide.",
    buttonText: "Join as Artist",
  },
  {
    id: "buyers",
    title: "Buyers",
    icon: Handshake,
    description:
      "Discover talent, book artists, and manage your events with powerful search and booking tools.",
    buttonText: "Join as Buyer",
  },
];

export function RoleSelectionSection() {
  const [expandedRole, setExpandedRole] = useState<string>("agents");

  const toggleRole = (roleId: string) => {
    setExpandedRole(expandedRole === roleId ? "" : roleId);
  };

  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-balance'>
            Which Role Are You Joining As?
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-pretty'>
            Lorem ipsum dolor sit amet consectetur. Dignissim maecenas molestie
            arcu sem sit sem.
          </p>
        </div>

        {/* Content Grid */}
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          {/* Left Side - Role Accordion */}
          <div className='space-y-4'>
            {roles.map((role) => {
              const IconComponent = role.icon;
              const isExpanded = expandedRole === role.id;

              return (
                <div
                  key={role.id}
                  className='border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-200 hover:shadow-md'
                >
                  {/* Role Header */}
                  <button
                    onClick={() => toggleRole(role.id)}
                    className='w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='flex-shrink-0'>
                        <IconComponent className='w-6 h-6 text-blue-600' />
                      </div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        {role.title}
                      </h3>
                    </div>
                    <div className='flex-shrink-0'>
                      {isExpanded ? (
                        <ChevronUp className='w-5 h-5 text-gray-400' />
                      ) : (
                        <ChevronDown className='w-5 h-5 text-gray-400' />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className='px-6 pb-6 border-t border-gray-100'>
                      <p className='text-gray-600 mb-4 leading-relaxed'>
                        {role.description}
                      </p>
                      <Button
                        variant='outline'
                        className='border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent'
                      >
                        {role.buttonText}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side - Image */}
          <div className='relative'>
            <div className='aspect-[4/3] relative rounded-lg overflow-hidden'>
              <Image
                src='/role-selection-image.png'
                alt='Music producer working at studio setup with audio equipment'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
