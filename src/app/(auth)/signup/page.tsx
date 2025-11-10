"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  Mic,
  Building,
  Handshake,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const journeys = [
  {
    id: "buyer",
    title: "Talent Buyer Journey:",
    icon: Handshake,
    details: [
      "Search artists by genre, location, and budget",
      "Compare availability and pricing options",
      "Streamline booking and contract processes",
      "Manage multiple events and relationships",
    ],
    buttonText: "Join as Talent Buyer",
  },
  {
    id: "agent",
    title: "Agent Journey:",
    icon: User,
    details: [
      "Manage multiple artist calendars",
      "Negotiate on their behalf",
      "Draft contracts and communicate with venues",
      "Get visibility into bookings & revenue",
    ],
    buttonText: "Join as Agent",
  },
  {
    id: "artist",
    title: "Artist Journey:",
    icon: Mic,
    details: [
      "Create and manage your professional profile",
      "Set availability and tour preferences",
      "Receive and respond to booking offers",
      "Track performance history and earnings",
    ],
    buttonText: "Join as Artist",
  },
  {
    id: "venue",
    title: "Venue Journey:",
    icon: Building,
    details: [
      "List your venue with detailed specifications",
      "Browse and book available artists",
      "Manage event calendars and logistics",
      "Handle contracts and payment processing",
    ],
    buttonText: "Join as Venue",
  },
  {
    id: "organizer",
    title: "Organizer Journey:",
    icon: Building2,
    details: [
      "List your venue with detailed specifications",
      "Browse and book available artists",
      "Manage event calendars and logistics",
      "Handle contracts and payment processing",
    ],
    buttonText: "Join as Organizer",
  },
];

export default function SignUpPage() {
  const [expandedJourney, setExpandedJourney] = useState("agent");
  const [selectRole, setSelectRole] = useState("artist");
  const toggleJourney = (journeyId: string) => {
    setExpandedJourney(expandedJourney === journeyId ? "" : journeyId);
  };
  const router = useRouter();

  const handleSelectRole = (role: string) => {
    setSelectRole(role);

    setTimeout(() => {
      router.push(`/signup/${role}`);
    }, 1500);
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left side - Concert image (hidden on mobile) */}
      <div className='hidden lg:flex lg:w-1/2 relative'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: "url('/login.png')",
          }}
        />
        <div className='absolute inset-0 bg-black/20' />
      </div>

      {/* Right side - Sign up form */}
      <div className='w-full lg:w-1/2 lg:flex items-center justify-center p-6 lg:p-12'>
        {/* <div className='w-full max-w-md'> */}
        <div className='w-full lg:w-1/2 space-y-4'>
          {journeys.map((journey) => {
            const Icon = journey.icon;
            const isExpanded = expandedJourney === journey.id;

            return (
              <div
                key={journey.id}
                className={`${
                  selectRole === journey.id
                    ? "border-2 border-[#235789]"
                    : "border border-gray-200"
                }  rounded-lg overflow-hidden`}
              >
                <button
                  onClick={() => toggleJourney(journey.id)}
                  className='w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <Icon className='h-6 w-6 text-[#235789]' />
                    <h3 className='text-lg font-semibold text-[#235789]'>
                      {journey.title}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className='h-5 w-5 text-[#6B7280]' />
                  ) : (
                    <ChevronDown className='h-5 w-5 text-[#6B7280]' />
                  )}
                </button>

                {isExpanded && (
                  <div className='px-6 pb-6'>
                    <ul className='space-y-3 mb-6'>
                      {journey.details.map((detail, index) => (
                        <li key={index} className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 bg-[#6B7280] rounded-full mt-2 flex-shrink-0' />
                          <span className='text-[#6B7280]'>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant='outline'
                      onClick={() => handleSelectRole(journey.id)}
                      className={`${
                        selectRole === journey.id
                          ? "border-2 border-[#235789]"
                          : "border border-gray-200"
                      } text-[#235789] border-[#235789] hover:bg-blue-50 bg-transparent`}
                    >
                      {journey.buttonText}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
