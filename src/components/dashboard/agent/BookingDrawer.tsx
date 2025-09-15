"use client";

import { useState } from "react";
import { X, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Artist {
  id: string;
  name: string;
  genre: string;
  location: string;
  availability: "Free Now" | "Within 1 week" | "Booked";
  rate: string;
  avatar: string;
}

interface BookingDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artist: Artist | null;
}

export function BookingDrawer({
  open,
  onOpenChange,
  artist,
}: BookingDrawerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>("10");
  const [selectedMinute, setSelectedMinute] = useState<string>("00");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("AM");
  const [message, setMessage] = useState<string>("");

  if (!artist) return null;

  const handleBooking = () => {
    // Handle booking logic here
    console.log("Booking artist:", artist.name);
    console.log("Date:", selectedDate);
    console.log("Time:", `${selectedHour}:${selectedMinute} ${selectedPeriod}`);
    console.log("Message:", message);
    onOpenChange(false);
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    while (days.length < 42) {
      // 6 weeks * 7 days
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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Free Now":
        return "bg-green-100 text-green-800";
      case "Within 1 week":
        return "bg-yellow-100 text-yellow-800";
      case "Booked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction='right'>
      <DrawerContent className='h-full max-w-md ml-auto mr-0 rounded-l-lg rounded-r-none'>
        <DrawerHeader className='space-y-4 pb-4'>
          <div className='flex items-center justify-between'>
            <DrawerTitle className='text-xl font-bold'></DrawerTitle>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='h-6 w-6'>
                <X className='h-4 w-4' />
              </Button>
            </DrawerClose>
          </div>

          {/* Artist Info */}
          <div className='bg-muted/30 rounded-lg p-4 space-y-3'>
            <div className='flex flex-col items-center gap-3'>
              <Avatar className='h-12 w-12'>
                <AvatarImage
                  src={artist.avatar || "/placeholder.svg"}
                  alt={artist.name}
                />
                <AvatarFallback>
                  {artist.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <h3 className='font-semibold text-lg'>{artist.name}</h3>
                <p className='text-sm text-muted-foreground'>{artist.genre}</p>
              </div>
            </div>

            <div className='space-y-2 flex flex-col items-center'>
              <div className='flex items-center gap-2 text-sm'>
                <MapPin className='h-4 w-4 text-muted-foreground' />
                <span>{artist.location}</span>
                <span className='text-muted-foreground'>
                  (will free in 5 days)
                </span>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
                <span>{artist.rate}</span>
              </div>
            </div>
          </div>
        </DrawerHeader>

        <div className='flex-1 px-6 space-y-6 overflow-y-auto'>
          {/* Date Selection */}
          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Select Date</Label>

            {/* Date Display and Navigation */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium'>
                  {String(selectedDate.getDate()).padStart(2, "0")}
                </span>
                <span className='text-sm font-medium'>
                  {String(selectedDate.getMonth() + 1).padStart(2, "0")}
                </span>
                <span className='text-sm font-medium'>
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
                <span className='text-sm font-medium min-w-12 text-center'>
                  {monthNames[selectedDate.getMonth()]}
                </span>
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

            {/* Calendar Grid */}
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
                  const isSelected =
                    day.toDateString() === selectedDate.toDateString();
                  const isToday =
                    day.toDateString() === new Date().toDateString();

                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "ghost"}
                      size='sm'
                      className={`h-8 w-8 p-0 text-xs ${
                        !isCurrentMonth ? "text-muted-foreground/50" : ""
                      } ${isToday ? "bg-blue-50 text-blue-600" : ""}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      {day.getDate()}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className='flex items-center gap-2 text-sm'>
              <Button variant='ghost' size='sm'>
                Today
              </Button>
              <Button variant='ghost' size='sm'>
                Last selection
              </Button>
            </div>
          </div>

          {/* Time Selection */}
          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Enter Time</Label>
            <div className='flex items-center gap-2'>
              <Select value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger className='w-20'>
                  <SelectValue placeholder='Hour' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={String(i + 1).padStart(2, "0")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className='text-lg font-semibold'>:</span>

              <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger className='w-20'>
                  <SelectValue placeholder='Min' />
                </SelectTrigger>
                <SelectContent>
                  {["00", "15", "30", "45"].map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className='flex'>
                <Button
                  variant={selectedPeriod === "AM" ? "default" : "outline"}
                  size='sm'
                  className='rounded-r-none'
                  onClick={() => setSelectedPeriod("AM")}
                >
                  AM
                </Button>
                <Button
                  variant={selectedPeriod === "PM" ? "default" : "outline"}
                  size='sm'
                  className='rounded-l-none'
                  onClick={() => setSelectedPeriod("PM")}
                >
                  PM
                </Button>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className='space-y-3'>
            <Label htmlFor='message' className='text-base font-semibold'>
              Message
            </Label>
            <Textarea
              id='message'
              placeholder='Add a message for the artist...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='min-h-20 resize-none'
            />
          </div>
        </div>

        <DrawerFooter className='pt-4'>
          <Button onClick={handleBooking} className='w-full'>
            Book
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
