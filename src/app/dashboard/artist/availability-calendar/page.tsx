"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectedDate {
  date: number;
  month: number;
  year: number;
}

interface TimeSlot {
  from: string;
  to: string;
  repeat: boolean;
}

export default function AvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // March 2025
  const [selectedDates, setSelectedDates] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7,
  ]);
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>({
    date: 1,
    month: 2,
    year: 2025,
  });
  const [timeSlot, setTimeSlot] = useState<TimeSlot>({
    from: "",
    to: "",
    repeat: false,
  });
  const [showAvailabilityInfo, setShowAvailabilityInfo] = useState(true);

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

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPreviousMonthDays = (date: Date) => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 0);
    return prevMonth.getDate();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    const isSelected = selectedDates.includes(day);

    if (isSelected) {
      setSelectedDates((prev) => prev.filter((d) => d !== day));
      if (selectedDate?.date === day) {
        setSelectedDate(null);
        setShowAvailabilityInfo(false);
      }
    } else {
      setSelectedDates((prev) => [...prev, day]);
    }

    setSelectedDate({
      date: day,
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    });
    setShowAvailabilityInfo(true);
  };

  const handleApply = () => {
    console.log("Applied availability:", {
      selectedDates,
      timeSlot,
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
    });
    // Here you would typically save the availability data
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const prevMonthDays = getPreviousMonthDays(currentDate);
    const days = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${prevMonthDays - i}`}
          className='h-10 w-10 flex items-center justify-center text-gray-400 text-sm'
        >
          {prevMonthDays - i}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDates.includes(day);
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={cn(
            "h-10 w-10 flex items-center justify-center text-sm font-medium rounded-full transition-colors",
            isSelected
              ? "bg-red-500 text-white hover:bg-red-600"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {day}
        </button>
      );
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className='h-10 w-10 flex items-center justify-center text-gray-400 text-sm'
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className='bg-white rounded-lg  max-w-4xl w-full mx-auto overflow-hidden'>
      <div className='flex flex-col lg:flex-row'>
        {/* Main Calendar Section */}
        <div className='flex-1 p-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-xl font-semibold text-gray-900'>
              Availability Calendar
            </h1>
            <button className='p-1 hover:bg-gray-100 rounded-full'>
              <X className='h-5 w-5 text-gray-500' />
            </button>
          </div>

          {/* Month Navigation */}
          <div className='flex items-center justify-between mb-6'>
            <button
              onClick={() => navigateMonth("prev")}
              className='p-2 hover:bg-gray-100 rounded-full'
            >
              <ChevronLeft className='h-5 w-5 text-gray-600' />
            </button>
            <h2 className='text-lg font-medium text-gray-900'>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth("next")}
              className='p-2 hover:bg-gray-100 rounded-full'
            >
              <ChevronRight className='h-5 w-5 text-gray-600' />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className='mb-8'>
            {/* Day Headers */}
            <div className='grid grid-cols-7 gap-1 mb-2'>
              {dayNames.map((day) => (
                <div
                  key={day}
                  className='h-10 flex items-center justify-center text-xs font-medium text-gray-500'
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className='grid grid-cols-7 gap-1'>{renderCalendarDays()}</div>
          </div>

          {/* Time Selection */}
          <div className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  From
                </label>
                <div className='relative'>
                  <Input
                    type='time'
                    placeholder='Available from'
                    value={timeSlot.from}
                    onChange={(e) =>
                      setTimeSlot((prev) => ({ ...prev, from: e.target.value }))
                    }
                    className='pl-10'
                  />
                  <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  To
                </label>
                <div className='relative'>
                  <Input
                    type='time'
                    placeholder='Available till'
                    value={timeSlot.to}
                    onChange={(e) =>
                      setTimeSlot((prev) => ({ ...prev, to: e.target.value }))
                    }
                    className='pl-10'
                  />
                  <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                </div>
              </div>
            </div>

            {/* Repeat Checkbox */}
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='repeat'
                checked={timeSlot.repeat}
                onCheckedChange={(checked) =>
                  setTimeSlot((prev) => ({
                    ...prev,
                    repeat: checked as boolean,
                  }))
                }
              />
              <label
                htmlFor='repeat'
                className='text-sm text-gray-600 cursor-pointer'
              >
                Repeat this for all days of the week.
              </label>
            </div>

            {/* Apply Button */}
            <Button
              onClick={handleApply}
              className='w-full bg-[#235789] hover:bg-[#235789] text-white py-3 rounded-lg font-medium'
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Availability Information Panel */}
        {showAvailabilityInfo && selectedDate && (
          <div className='lg:w-80 bg-transparent p-6 border-l border-gray-200'>
            <div className='bg-white rounded-lg p-4 shadow-sm'>
              <h3 className='font-medium text-gray-900 mb-2'>
                Availability Information
              </h3>
              <div className='text-sm text-gray-600'>
                <div className='font-medium mb-1'>
                  {selectedDate.date}, {monthNames[selectedDate.month]},{" "}
                  {selectedDate.year}
                </div>
                <div>Available from 9:00 AM to 2:30 PM</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
