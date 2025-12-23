"use client";

import { useState, useMemo } from "react";
import { X, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface IProfile {
  id: string;
  role: "VENUE" | "AGENT";
  email: string;
  avatar: string;
  name: string;
  location: string;
  subscription_name: string | null;
  availability: string[];
  price: string | null;
  artist_agents?: string[];
  artist_pending_agents?: string[];
  genre?: string;
}

export interface IUser extends IProfile {
  role: "VENUE" | "AGENT";
  venue_type?: string; // Specific to VENUE
  capacity?: number; // Specific to VENUE
  gender?: "MALE" | "FEMALE" | "OTHER"; // Specific to AGENT
  experience?: string; // Specific to AGENT
  agent_artists?: string[]; // Specific to AGENT
  agent_pending_artists?: string[]; // Specific to AGENT
}

interface BookingDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artist?: IUser | null | any;
}

export function BookingDrawer({
  open,
  onOpenChange,
  artist,
}: BookingDrawerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const artistAvailableDates = useMemo(() => {
    if (!artist?.availability) return [];
    return artist.availability.map(
      (iso: any) => new Date(iso).toISOString().split("T")[0]
    );
  }, [artist?.availability]);

  if (!artist) return null;

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Date[] = [];
    const currentDate = new Date(startDate);

    while (days.length < 42) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction='right'>
      <DrawerContent className='h-full max-w-md ml-auto mr-0 rounded-l-lg rounded-r-none'>
        <DrawerHeader className='space-y-4 pb-4'>
          <div className='flex items-center justify-between'>
            <DrawerTitle className='text-xl font-bold'>
              {artist.name}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='h-6 w-6'>
                <X className='h-4 w-4' />
              </Button>
            </DrawerClose>
          </div>

          {/* 🎤 Artist Info */}
          <div className='bg-muted/30 rounded-lg p-4 space-y-3'>
            <div className='flex flex-col items-center gap-3'>
              <Avatar className='h-12 w-12'>
                <AvatarImage
                  src={process.env.NEXT_PUBLIC_API_URL + artist.avatar}
                  alt={artist.name}
                />
                <AvatarFallback>
                  {artist.name
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 text-center'>
                <h3 className='font-semibold text-lg'>{artist.name}</h3>
                <p className='text-sm text-muted-foreground'>{artist.genre}</p>
              </div>
            </div>

            <div className='space-y-2 flex flex-col items-center'>
              <div className='flex items-center gap-2 text-sm'>
                <MapPin className='h-4 w-4 text-muted-foreground' />
                <span>{artist.location}</span>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
                <span>{artist.price}</span>
              </div>
            </div>
          </div>
        </DrawerHeader>

        <div className='flex-1 px-6 space-y-6 overflow-y-auto'>
          {/* 📅 Date Selection */}
          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Select Date</Label>

            {/* Calendar Header */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium'>
                  {monthNames[selectedDate.getMonth()]}{" "}
                  {selectedDate.getFullYear()}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setSelectedDate(newDate);
                  }}
                >
                  ←
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setSelectedDate(newDate);
                  }}
                >
                  →
                </Button>
              </div>
            </div>

            {/* 🗓 Calendar Grid */}
            <div className='space-y-2'>
              <div className='grid grid-cols-7 gap-1 text-xs text-muted-foreground'>
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <div key={day} className='p-2 text-center font-medium'>
                    {day}
                  </div>
                ))}
              </div>

              <div className='grid grid-cols-7 gap-1'>
                {calendarDays.map((day, index) => {
                  const isCurrentMonth =
                    day.getMonth() === selectedDate.getMonth();
                  const isoDate = day.toISOString().split("T")[0];
                  const isAvailable = artistAvailableDates.includes(isoDate);
                  const isSelected =
                    day.toDateString() === selectedDate.toDateString();

                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "ghost"}
                      size='sm'
                      disabled={!isAvailable} // ⛔️ Only allow available dates
                      className={`h-8 w-8 p-0 text-xs transition-all duration-150
                        ${!isCurrentMonth ? "text-muted-foreground/40" : ""}
                        ${
                          isAvailable
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "opacity-40 cursor-not-allowed"
                        }
                        ${isSelected ? "ring-2 ring-blue-500" : ""}`}
                      onClick={() => {
                        if (isAvailable) setSelectedDate(day);
                      }}
                    >
                      {day.getDate()}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 🕒 Time Display (auto from availability) */}
          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Available Time</Label>

            {artist.availability && artist.availability.length > 0 ? (
              <div className='space-y-2'>
                {artist.availability.map((iso: any, index: number) => {
                  const start = new Date(iso);
                  const end = new Date(start);
                  end.setHours(end.getHours() + 8); // ⏱ example: 8-hour duration

                  const formatTime = (date: Date) =>
                    date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                  return (
                    <div
                      key={index}
                      className='flex justify-between items-center bg-muted/30 p-2 rounded-md text-sm'
                    >
                      <span>
                        {start.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className='font-medium'>
                        {formatTime(start)} — {formatTime(end)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className='text-muted-foreground text-sm'>
                No available times
              </p>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
