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
  id: string;
  eventName: string;
  dateTime: string;
  artist: string;
  agency: string;
  status: "confirmed" | "pending" | "cancelled";
  revenue: number;
}

interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    eventName: "DJ Nova Live",
    dateTime: "Aug 25, 9:00 PM",
    artist: "DJ Nova",
    agency: "TalentX Agency",
    status: "confirmed",
    revenue: 15400,
  },
  {
    id: "2",
    eventName: "DJ Nova Live",
    dateTime: "Aug 25, 9:00 PM",
    artist: "DJ Nova",
    agency: "TalentX Agency",
    status: "confirmed",
    revenue: 12400,
  },
  {
    id: "3",
    eventName: "DJ Nova Live",
    dateTime: "Aug 25, 9:00 PM",
    artist: "DJ Nova",
    agency: "TalentX Agency",
    status: "confirmed",
    revenue: 12400,
  },
  {
    id: "4",
    eventName: "DJ Nova Live",
    dateTime: "Aug 25, 9:00 PM",
    artist: "DJ Nova",
    agency: "TalentX Agency",
    status: "confirmed",
    revenue: 12400,
  },
  {
    id: "5",
    eventName: "DJ Nova Live",
    dateTime: "Aug 25, 9:00 PM",
    artist: "DJ Nova",
    agency: "TalentX Agency",
    status: "confirmed",
    revenue: 12400,
  },
  {
    id: "6",
    eventName: "DJ Nova Live",
    dateTime: "Aug 25, 9:00 PM",
    artist: "DJ Nova",
    agency: "TalentX Agency",
    status: "confirmed",
    revenue: 12400,
  },
];

const contactInfo: Contact = {
  name: "Sarah Williams",
  role: "Rock Music Guitarist",
  phone: "(212) 658-3916",
  email: "name@gmail.com",
  avatar: "/client.png",
};

export default function ConfirmBooking() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (bookingId: string) => {
    setBookings(bookings.filter((booking) => booking.id !== bookingId));
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleMessageBuyer = () => {};

  const SidebarContent = () => (
    <Card className='border border-gray-200 bg-white'>
      <CardContent className='p-6'>
        <div className='mb-6 flex flex-col items-center justify-center'>
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
                className='pl-10 max-w-md lg: rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
          </div>

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
    <div className='min-h-screen bg-transparent p-4 lg:p-6'>
      <div className='container mx-auto'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-[#1E1E1E] lg:text-3xl'>
            Confirm Booking
          </h1>

          <div className='flex items-center gap-2 lg:hidden'>
            <Drawer
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              direction='right'
            >
              <DrawerTrigger asChild>
                <Button variant='ghost' size='icon'>
                  {/* <Menu className='h-5 w-5' /> */}
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
            <div className='grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {bookings.map((booking) => (
                <Card
                  key={booking.id}
                  className='overflow-hidden border border-gray-200 bg-white'
                >
                  <CardContent className='p-6'>
                    <h3 className='mb-4 text-xl font-semibold text-[#1E1E1E]'>
                      {booking.eventName}
                    </h3>

                    <div className='space-y-3 text-sm'>
                      <div className='flex items-start gap-2'>
                        <span className='text-[#1E1E1E]'>•</span>
                        <div>
                          <span className='font-medium text-[#1E1E1E]'>
                            Date & Time:
                          </span>{" "}
                          <span className='text-[#1E1E1E]'>
                            {booking.dateTime}
                          </span>
                        </div>
                      </div>

                      <div className='flex items-start gap-2'>
                        <span className='text-[#1E1E1E]'>•</span>
                        <div>
                          <span className='font-medium text-[#1E1E1E]'>
                            Artist / Agent:
                          </span>{" "}
                          <span className='text-[#1E1E1E]'>
                            {booking.artist} (via {booking.agency})
                          </span>
                        </div>
                      </div>

                      <div className='flex items-start gap-2'>
                        <span className='text-[#1E1E1E]'>•</span>
                        <div className='flex items-center gap-2'>
                          <span className='font-medium text-[#1E1E1E]'>
                            Status:
                          </span>
                          <div className='flex items-center gap-1'>
                            <span>✅ </span>
                            <span className='text-[#1E1E1E] capitalize'>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='flex items-start gap-2'>
                        <span className='text-[#1E1E1E]'>•</span>
                        <div>
                          <span className='font-medium text-[#1E1E1E]'>
                            Revenue:
                          </span>{" "}
                          <span className='text-[#1E1E1E]'>
                            ${booking.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 space-y-2'>
                      <Button
                        variant='secondary'
                        className='w-full h-[35px] bg-[#DFEBF7] text-[#235789] hover:bg-blue-100'
                        onClick={() => handleViewDetails(booking)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant='outline'
                        className='w-full border-[#C1292E] text-[#C1292E] hover:bg-red-50 bg-transparent'
                        onClick={() => handleDelete(booking.id)}
                      >
                        Delete
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
