/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Artist {
  id: string;
  name: string;
  genre: string;
  location: string;
  availability: string;
  rate: string;
  avatar: string;
}

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artist: Artist | null;
}

export function BookingModal({
  open,
  onOpenChange,
  artist,
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState(10);
  const [selectedMonth, setSelectedMonth] = useState("Feb");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("Am");
  const [message, setMessage] = useState("");

  if (!artist) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission

    onOpenChange(false);
  };

  // Calendar data for February 2025
  const calendarDays = [
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
    { day: 5, isCurrentMonth: false },
  ];

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between pb-4'>
          <h2 className='text-lg font-semibold'>Book Artist</h2>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onOpenChange(false)}
            className='h-6 w-6 rounded-full'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        <div className='space-y-6'>
          {/* Artist Profile */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-muted rounded-lg'>
            <Avatar className='h-16 w-16'>
              <AvatarImage
                src='/sarah-williams-musician.jpg'
                alt='Sarah Williams'
              />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <div className='flex-1 space-y-2'>
              <h3 className='text-lg font-semibold'>Sarah Williams</h3>
              <p className='text-sm text-muted-foreground'>
                Rock Music Guitarist
              </p>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <MapPin className='h-4 w-4' />
                <span>Location: New York, USA (will free in 5 days)</span>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='outline'>Rate: $600 per event</Badge>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Date Selection */}
            <div className='space-y-3'>
              <h4 className='font-medium'>Select Date</h4>

              {/* Date Display */}
              <div className='flex items-center gap-2 text-sm'>
                <span className='px-2 py-1 bg-muted rounded'>
                  {selectedDate}
                </span>
                <span className='px-2 py-1 bg-muted rounded'>
                  {selectedMonth.padStart(2, "0")}
                </span>
                <span className='px-2 py-1 bg-muted rounded'>
                  {selectedYear}
                </span>
              </div>

              {/* Calendar Navigation */}
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-2'>
                  <Button variant='ghost' size='sm'>
                    Today
                  </Button>
                  <Button variant='ghost' size='sm'>
                    Last selection
                  </Button>
                </div>
                <div className='flex items-center gap-2'>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <ChevronLeft className='h-4 w-4' />
                  </Button>
                  <span className='text-sm font-medium'>Feb</span>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className='grid grid-cols-7 gap-1 text-center text-sm'>
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className='p-2 text-muted-foreground font-medium'
                  >
                    {day}
                  </div>
                ))}
                {calendarDays.map((date, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={() =>
                      date.isCurrentMonth && setSelectedDate(date.day)
                    }
                    className={`p-2 rounded hover:bg-muted transition-colors ${
                      !date.isCurrentMonth
                        ? "text-muted-foreground"
                        : date.day === selectedDate
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {date.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className='space-y-3'>
              <h4 className='font-medium'>Enter Time</h4>
              <div className='flex items-center gap-2'>
                <Input
                  placeholder='Hour'
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className='w-20'
                />
                <span className='text-lg font-bold'>:</span>
                <Input
                  placeholder='Minute'
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(e.target.value)}
                  className='w-20'
                />
                <div className='flex'>
                  <Button
                    type='button'
                    variant={selectedPeriod === "Am" ? "default" : "outline"}
                    size='sm'
                    onClick={() => setSelectedPeriod("Am")}
                    className='rounded-r-none'
                  >
                    Am
                  </Button>
                  <Button
                    type='button'
                    variant={selectedPeriod === "Pm" ? "default" : "outline"}
                    size='sm'
                    onClick={() => setSelectedPeriod("Pm")}
                    className='rounded-l-none'
                  >
                    Pm
                  </Button>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className='space-y-3'>
              <Textarea
                placeholder='Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='min-h-[100px]'
              />
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full bg-primary hover:bg-primary/90'
            >
              Book
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
