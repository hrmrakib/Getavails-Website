/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { X, Check, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Booking {
  eventName: string;
  venueName: string;
  location: string;
  date: string;
  totalPrice: string;
}

interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
}

const upcomingEvents: Booking[] = [
  {
    eventName: "DJ Nova Live",
    venueName: "Electric Hall",
    location: "New York, USA",
    date: "Aug 25",
    totalPrice: "$12,400",
  },
  {
    eventName: "Rock Fusion Night",
    venueName: "Sunset Arena",
    location: "Los Angeles, USA",
    date: "Sep 3",
    totalPrice: "$18,900",
  },
  {
    eventName: "Symphony Classics",
    venueName: "Grand Theatre",
    location: "Chicago, USA",
    date: "Oct 12",
    totalPrice: "$9,750",
  },
  {
    eventName: "Hip-Hop Vibes",
    venueName: "Metro Dome",
    location: "Houston, USA",
    date: "Nov 5",
    totalPrice: "$15,200",
  },
  {
    eventName: "Indie Nights",
    venueName: "Luna Club",
    location: "San Francisco, USA",
    date: "Sep 20",
    totalPrice: "$7,600",
  },
  {
    eventName: "Jazz Evening",
    venueName: "Blue Note Hall",
    location: "New Orleans, USA",
    date: "Oct 7",
    totalPrice: "$5,800",
  },
  {
    eventName: "Pop Sensation Tour",
    venueName: "Galaxy Stadium",
    location: "Miami, USA",
    date: "Dec 15",
    totalPrice: "$22,000",
  },
  {
    eventName: "Classical Harmony",
    venueName: "Royal Concert Hall",
    location: "Boston, USA",
    date: "Aug 30",
    totalPrice: "$11,450",
  },
  {
    eventName: "EDM Blast",
    venueName: "Pulse Arena",
    location: "Las Vegas, USA",
    date: "Sep 14",
    totalPrice: "$19,800",
  },
  {
    eventName: "Country Roads Festival",
    venueName: "Oakwood Park",
    location: "Nashville, USA",
    date: "Oct 21",
    totalPrice: "$13,600",
  },
  {
    eventName: "Latin Nights",
    venueName: "Havana Club",
    location: "Miami, USA",
    date: "Nov 9",
    totalPrice: "$10,250",
  },
  {
    eventName: "Metal Madness",
    venueName: "Iron Arena",
    location: "Detroit, USA",
    date: "Sep 28",
    totalPrice: "$16,900",
  },
  {
    eventName: "R&B Grooves",
    venueName: "Soul Theatre",
    location: "Atlanta, USA",
    date: "Dec 2",
    totalPrice: "$8,700",
  },
  {
    eventName: "Festival of Lights",
    venueName: "Central Park",
    location: "New York, USA",
    date: "Dec 31",
    totalPrice: "$25,500",
  },
  {
    eventName: "Acoustic Sessions",
    venueName: "Harmony Hall",
    location: "Seattle, USA",
    date: "Oct 18",
    totalPrice: "$6,300",
  },
];

const contactInfo: Contact = {
  name: "Sarah Williams",
  role: "Rock Music Guitarist",
  phone: "(212) 658-3916",
  email: "name@gmail.com",
  avatar: "/client.png",
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Booking[]>(upcomingEvents);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (bookingId: string) => {
    // setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleMessageBuyer = () => {
    console.log("Message buyer clicked");
  };

  const SidebarContent = () => (
    <Card className='border border-gray-200 bg-white'>
      <CardContent className='p-6'>
        <div className='mb-6 flex flex-col items-center justify-center'>
          <h3 className='text-lg font-semibold text-[#1E1E1E] mb-4'>
            DJ Nova Live
          </h3>

          <div className='space-y-3 text-base text-center'>
            <div className='flex items-center justify-center gap-2'>
              <span className='text-[#1E1E1E]'>•</span>
              <div>
                <span className='font-medium text-[#1E1E1E]'>Date & Time:</span>{" "}
                <span className='text-[#1E1E1E]'>Aug 25, 9:00 PM</span>
              </div>
            </div>

            <div className='flex items-center justify-center gap-2'>
              <span className='text-[#1E1E1E]'>•</span>
              <div>
                <span className='font-medium text-[#1E1E1E]'>
                  Artist / Agent:
                </span>{" "}
                <span className='text-[#1E1E1E]'>
                  DJ Nova (via TalentX Agency)
                </span>
              </div>
            </div>

            <div className='flex items-center justify-center gap-2'>
              <span className='text-[#1E1E1E]'>•</span>
              <div className='flex items-center gap-2'>
                <span className='font-medium text-[#1E1E1E]'>Status:</span>
                <div className='flex items-center gap-1'>
                  <Check className='h-4 w-4 text-green-600' />
                  <span className='text-[#1E1E1E]'>Confirmed</span>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-center gap-2'>
              <span className='text-[#1E1E1E]'>•</span>
              <div>
                <span className='font-medium text-[#1E1E1E]'>Revenue:</span>{" "}
                <span className='text-[#1E1E1E]'>$12,400</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-100 pt-6'>
          <div className='flex flex-col items-center text-center'>
            <Avatar className='h-20 w-20 mb-4'>
              <AvatarImage
                src={contactInfo.avatar || "/placeholder.svg"}
                alt={contactInfo.name}
              />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>

            <h4 className='text-xl font-semibold text-[#1E1E1E] mb-1'>
              {contactInfo.name}
            </h4>
            <p className='text-sm text-[#6B7280] mb-4'>{contactInfo.role}</p>

            <div className='text-sm text-[#6B7280] mb-6 space-y-1'>
              <p>
                Contact: {contactInfo.phone}, Email: {contactInfo.email}
              </p>
            </div>

            <Button
              className='w-full h-11 bg-[#DEEBF7] text-[#235789]'
              variant='secondary'
              onClick={handleMessageBuyer}
            >
              Message Buyer
            </Button>

            <Button
              variant='outline'
              className='w-full h-11 mt-4 border-[#C1292E] text-[#C1292E] hover:bg-red-50 bg-transparent'
              onClick={() => handleDelete("sidebar")}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='min-h-screen bg-transparent'>
      <div className='container mx-auto'>
        <div className='mb-6 flex items-center justify-between'>
          {/* Artist Lists Header */}
          <div className='flex items-center justify-between  mb-6'>
            <h2 className='text-lg font-semibold text-[#1C1C1C] mb-4'>
              Venue lists
            </h2>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Search for artist...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 max-w-md lg: rounded-md border border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='flex items-center gap-2 lg:hidden'>
            <Drawer
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              direction='right'
            >
              <DrawerTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </DrawerTrigger>
              <DrawerContent className='w-80 sm:w-96'>
                <DrawerHeader className='flex flex-row items-center justify-between'>
                  <DrawerTitle></DrawerTitle>
                  <DrawerClose asChild>
                    <Button variant='ghost' size='icon'>
                      <X className='h-5 w-5' />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>
                <div className='p-4 pt-0'>
                  <SidebarContent />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className='flex flex-col gap-6 lg:flex-row'>
          <div className='flex-1'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {events.map((event) => (
                <Card
                  key={event.eventName}
                  className='overflow-hidden border border-gray-200 bg-white'
                >
                  <CardContent className='p-6'>
                    <h3 className='mb-4 text-xl font-semibold text-[#1E1E1E]'>
                      {event.eventName}
                    </h3>

                    <div className='space-y-3 text-sm'>
                      <div className='flex items-start gap-2'>
                        <span className='text-[#1E1E1E]'>•</span>
                        <div>
                          <span className='font-medium text-[#1E1E1E]'>
                            Venue:
                          </span>{" "}
                          <span className='text-[#1E1E1E]'>
                            {event.venueName}
                          </span>
                        </div>
                      </div>

                      <div className='flex items-start gap-2'>
                        <span className='text-[#1E1E1E]'>•</span>
                        <div className='flex items-center gap-2'>
                          <span className='font-medium text-[#1E1E1E]'>
                            Location:
                          </span>
                          <div className='flex items-center gap-1'>
                            <span className='text-[#1E1E1E] capitalize'>
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='flex items-start gap-2'>
                        <span className='text-[#1E1E1E]'>•</span>
                        <div>
                          <span className='font-medium text-[#1E1E1E]'>
                            Date:
                          </span>{" "}
                          <span className='text-[#1E1E1E]'>
                            {event.date.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className='flex items-start gap-2'>
                        <span className='text-[#1E1E1E]'>•</span>
                        <div>
                          <span className='font-medium text-[#1E1E1E]'>
                            Total Spend:
                          </span>{" "}
                          <span className='text-[#1E1E1E]'>
                            {event.totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 space-y-2'>
                      <Button
                        variant='secondary'
                        className='w-full h-[35px] bg-[#DFEBF7] text-[#235789] hover:bg-blue-100'
                        onClick={() => handleViewDetails(event)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
