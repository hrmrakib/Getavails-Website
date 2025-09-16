/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomDayPickerProps {
  mode: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
}

export function CustomDayPicker({
  mode,
  selected,
  onSelect,
  className,
}: CustomDayPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to be last (6)
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onSelect?.(newDate);
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date.toDateString() === selected.toDateString();
  };

  const isToday = (day: number) => {
    const today = new Date();
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date.toDateString() === today.toDateString();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className={cn("p-3 bg-white border rounded-md", className)}>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <Button
          variant='ghost'
          size='icon'
          className='h-7 w-7'
          onClick={() => navigateMonth("prev")}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <div className='text-sm font-medium'>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='h-7 w-7'
          onClick={() => navigateMonth("next")}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      {/* Day names */}
      <div className='grid grid-cols-7 gap-1 mb-2'>
        {dayNames.map((day) => (
          <div
            key={day}
            className='text-center text-xs font-medium text-gray-500 p-2'
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className='grid grid-cols-7 gap-1'>
        {/* Empty cells for days before month starts */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className='h-9 w-9' />
        ))}

        {/* Days of the month */}
        {days.map((day) => (
          <Button
            key={day}
            variant='ghost'
            size='sm'
            className={cn(
              "h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground",
              isSelected(day) &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              isToday(day) &&
                !isSelected(day) &&
                "bg-accent text-accent-foreground"
            )}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}
