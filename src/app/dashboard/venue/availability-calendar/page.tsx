"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
import { useAvailabilityDateMutation } from "@/redux/features/artist/artistAPI";
import { toast } from "sonner";
import { RoleRedirect } from "@/utils/makePrivate";

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<string[]>([]); // store ISO format
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
  const [timeSlot, setTimeSlot] = useState<TimeSlot>({
    from: "",
    to: "",
    repeat: false,
  });
  const [showAvailabilityInfo, setShowAvailabilityInfo] = useState(false);

  const { data: availability } = useGetProfileQuery("");
  const [availabilityDateMutation] = useAvailabilityDateMutation();

  console.log(availability?.data);

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

  // 🧩 Load backend ISO dates
  useEffect(() => {
    if (availability?.data?.availability) {
      // ensure all items are valid ISO strings
      const formatted = availability.data.availability.map((d: string) =>
        new Date(d).toISOString()
      );
      setSelectedDates(formatted);
    }
  }, [availability]);

  // Utility Functions
  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const getPreviousMonthDays = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() - 1, 0).getDate();

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  // 🧠 Handle date click (toggle ISO date)
  const handleDateClick = (day: number) => {
    const selectedISO = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      0,
      0,
      0
    ).toISOString();

    const isSelected = selectedDates.includes(selectedISO);
    const updated = isSelected
      ? selectedDates.filter((d) => d !== selectedISO)
      : [...selectedDates, selectedISO];

    setSelectedDates(updated);
    setSelectedDate({
      date: day,
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    });
    setShowAvailabilityInfo(true);
  };

  const handleAvailability = async () => {
    // ✅ Step 1: Check for missing date
    if (selectedDates.length === 0) {
      alert("⚠️ Please select at least one date before applying.");
      return;
    }

    // ✅ Step 2: Check for missing time fields
    if (!timeSlot.from || !timeSlot.to) {
      alert("⚠️ Please select both 'From' and 'To' time before applying.");
      return;
    }

    // ✅ Step 3: Validate time order
    if (timeSlot.from >= timeSlot.to) {
      alert("⚠️ 'From' time must be earlier than 'To' time.");
      return;
    }

    try {
      console.log("🕒 Sending to backend:", {
        availability: selectedDates,
        time: timeSlot,
      });

      const { data } = await availabilityDateMutation({
        availability: selectedDates,
        timeSlot,
      });

      toast("✅ Availability successfully updated!");
      console.log("✅ Response:", data);
    } catch (error) {
      console.error("❌ Error sending availability:", error);
      alert("❌ Failed to update availability. Please try again.");
    }
  };

  // 🎨 Calendar UI
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
      const iso = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
        0,
        0,
        0
      ).toISOString();

      const isSelected = selectedDates.includes(iso);

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
    <RoleRedirect allowedRole='VENUE'>
      <div className='bg-white rounded-lg max-w-4xl w-full mx-auto overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          {/* Calendar Section */}
          <div className='flex-1 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h1 className='text-xl font-semibold text-gray-900'>
                Availability Calendar
              </h1>
              {/* <button className='p-1 hover:bg-gray-100 rounded-full'>
              <X className='h-5 w-5 text-gray-500' />
            </button> */}
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
              <div className='grid grid-cols-7 gap-1'>
                {renderCalendarDays()}
              </div>
            </div>

            {/* Time & Apply */}
            <div className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    From
                  </label>
                  <div className='relative'>
                    <Input
                      type='time'
                      value={timeSlot.from}
                      onChange={(e) =>
                        setTimeSlot((prev) => ({
                          ...prev,
                          from: e.target.value,
                        }))
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

              <Button
                onClick={handleAvailability}
                className='w-full bg-[#235789] hover:bg-[#1e4a70] text-white py-3 rounded-lg font-medium'
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Info Panel */}
          {showAvailabilityInfo && selectedDate && (
            <div className='lg:w-80 bg-transparent p-6 border-l border-gray-200'>
              <div className='bg-white rounded-lg p-4 shadow-sm'>
                <h3 className='font-medium text-gray-900 mb-2'>
                  Availability Information
                </h3>
                <div className='text-sm text-gray-600'>
                  <div className='font-medium mb-1'>
                    {selectedDate.date} {monthNames[selectedDate.month]}{" "}
                    {selectedDate.year}
                  </div>
                  <div>
                    {timeSlot.from && timeSlot.to
                      ? `Available from ${timeSlot.from} to ${timeSlot.to}`
                      : "Available from 9:00 AM to 2:30 PM"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleRedirect>
  );
}
