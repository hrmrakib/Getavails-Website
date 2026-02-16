"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  useConnectGoogleCalendarMutation,
  useGetGoogleCalendarEventsQuery,
} from "@/redux/features/tourManager/tourManagerAPI";

import { useRouter } from "next/navigation";
import { IGoogleCalendarEvent } from "./events.type";

type ISODateRange = {
  from?: string;
  to?: string;
};

const getEventDate = (event: IGoogleCalendarEvent): Date | null => {
  const dateTime = event.start.dateTime || event.start.date;
  return dateTime ? new Date(dateTime) : null;
};

export default function GoogleCalendarEvent() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();

  const [dateRange, setDateRange] = useState<ISODateRange>(() => {
    const from = new Date();
    const to = addDays(from, 7);

    return {
      from: from.toISOString(),
      to: to.toISOString(),
    };
  });

  const [connectGoogleCalendarMutation] = useConnectGoogleCalendarMutation();
  const { data, isFetching } = useGetGoogleCalendarEventsQuery({
    start_date_time: dateRange?.from,
    end_date_time: dateRange?.to,
    // limit,
    // user_id,
  });

  const events = data?.data ?? [];

  // Convert ISO → Date for Calendar
  const calendarRange: DateRange | undefined = {
    from: dateRange.from ? new Date(dateRange.from) : undefined,
    to: dateRange.to ? new Date(dateRange.to) : undefined,
  };

  const handleSelect = (range?: DateRange) => {
    setDateRange({
      from: range?.from?.toISOString(),
      to: range?.to?.toISOString(),
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  };

  const getDates = () => {
    const map = new Set<number>();

    events.forEach((event: any) => {
      const date = getEventDate(event);
      if (date) {
        map.add(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          ).getTime(),
        );
      }
    });

    return Array.from(map)
      .map((t) => new Date(t))
      .sort((a, b) => a.getTime() - b.getTime());
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event: any) => {
      const eventDate = getEventDate(event);
      if (!eventDate) return false;

      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  const handleAddClick = (date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const dates = getDates();

  const handleConnectGoogleCalendar = async () => {
    try {
      const res = await connectGoogleCalendarMutation({}).unwrap();

      if (res?.success) {
        window.open(res?.data?.url, "_blank");
      }
    } catch (error) {
      console.error("Error connecting to Google Calendar:", error);
    }
  };

  const getStartAndEndTime = (events: IGoogleCalendarEvent[]) => {
    if (!events || events.length === 0) return "";

    let hasAllDayEvent = false;
    let startTimes: Date[] = [];
    let endTimes: Date[] = [];

    events.forEach((event) => {
      // All-day event
      if (event.start.date && !event.start.dateTime) {
        hasAllDayEvent = true;
        return;
      }

      if (event.start.dateTime) {
        startTimes.push(new Date(event.start.dateTime));
      }

      if (event.end.dateTime) {
        endTimes.push(new Date(event.end.dateTime));
      }
    });

    // If all events are all-day
    if (hasAllDayEvent && startTimes.length === 0) {
      return "All day";
    }

    if (startTimes.length === 0 || endTimes.length === 0) {
      return "";
    }

    const start = new Date(Math.min(...startTimes.map((d) => d.getTime())));
    const end = new Date(Math.max(...endTimes.map((d) => d.getTime())));

    const formatTime = (date: Date) =>
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

    return `${formatTime(start)} – ${formatTime(end)}`;
  };

  const LoadingSpinner = () => (
    <div className='w-full flex items-center justify-center py-20'>
      <div className='h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-[#1e5a8f]' />
    </div>
  );

  return (
    <main className='min-h-screen bg-background'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mt-12'>
        {/* Calendar - Left Side */}
        <div>
          <Card className='mx-auto sm:w-[500px] p-0 m-5 sm:m-0'>
            <CardContent className='p-0'>
              <h2 className='text-center text-blue-500'>
                Double click to select range
              </h2>
              <Calendar
                mode='range'
                defaultMonth={calendarRange?.from}
                selected={calendarRange}
                onSelect={handleSelect}
                numberOfMonths={1}
              />
            </CardContent>
          </Card>
        </div>

        {/* Events - Right Side */}
        {/* true for test - get data from profile (is google calaneder connected) */}
        {isFetching ? (
          <LoadingSpinner />
        ) : events.length > 0 ? (
          <div className='flex-1 m-5 sm:m-0'>
            {/* Header */}
            <div className='flex items-center gap-4 mb-8'>
              <button className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-muted transition-colors'>
                <CalendarIcon className='w-4 h-4' />
                <span className='text-sm font-medium'>Today</span>
              </button>
              <h2 className='text-xl md:text-3xl font-bold'>
                {formatDate(today)}
              </h2>
            </div>

            {/* Events Timeline */}
            <div className='space-y-0'>
              {dates.map((date) => {
                const dateEvents = getEventsForDate(date);
                const dateNum = date.getDate().toString().padStart(2, "0");
                const dayOfWeek = getDayOfWeek(date);
                const monthName = getMonthName(date);
                const startandEndTime = getStartAndEndTime(dateEvents);

                return (
                  <div
                    // key={date.getTime()}
                    className='flex gap-4 md:gap-8 pb-6 md:pb-8'
                  >
                    {/* Date Column */}
                    <div className='flex-shrink-0 pt-4'>
                      <div className='text-2xl md:text-3xl font-bold text-foreground'>
                        {dateNum}
                      </div>
                      <div className='text-xs md:text-sm font-semibold text-muted-foreground mt-1'>
                        {monthName}, {dayOfWeek}
                      </div>
                      <div className='text-xs text-muted-foreground mt-1'>
                        {startandEndTime}
                      </div>
                    </div>

                    {/* Events Column */}
                    <div className='flex-1 space-y-3 min-w-0'>
                      {dateEvents.length > 0 ? (
                        dateEvents.map((event: IGoogleCalendarEvent) => (
                          <div
                            key={event.id}
                            className='bg-muted/40 rounded-lg p-4 md:p-6 hover:bg-muted/60 transition-colors group relative'
                          >
                            <div className='flex gap-3 md:gap-4'>
                              {/* Indicator */}
                              <div className='w-5 h-5 md:w-6 md:h-6 bg-[#1e5a8f] rounded-sm mt-1 flex-shrink-0' />

                              {/* Content */}
                              <div className='flex-1 min-w-0'>
                                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2'>
                                  <h3 className='font-semibold text-sm md:text-base text-foreground truncate'>
                                    {event?.summary}
                                  </h3>
                                  <div className='flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground text-wrap'>
                                    <span className='text-wrap'>
                                      {event.location}
                                    </span>
                                  </div>
                                </div>

                                <p
                                  className='text-xs md:text-sm text-muted-foreground'
                                  dangerouslySetInnerHTML={{
                                    __html: event?.description || "",
                                  }}
                                ></p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className='bg-muted/40 rounded-lg p-6 md:p-8 text-center'>
                          <p className='text-muted-foreground mb-4 text-sm md:text-base'>
                            Empty
                          </p>
                          <button
                            onClick={() => handleAddClick(date)}
                            className='inline-flex items-center gap-2 px-6 py-2 bg-[#1e5a8f] hover:bg-[#184778] text-white font-semibold rounded-full transition-colors text-sm md:text-base cursor-pointer!'
                          >
                            <Plus className='w-4 h-4' />
                            Add New
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : data?.meta?.is_connected ? (
          <div className='w-full bg-muted/40 rounded-lg p-6 text-center'>
            <p className='text-muted-foreground mb-4'>Empty</p>
            <button
              onClick={() =>
                window.open(
                  "https://calendar.google.com/calendar/u/0/r/month?pli=1",
                  "_blank",
                )
              }
              className='inline-flex items-center gap-2 px-6 py-2 bg-[#1e5a8f] text-white rounded-full'
            >
              <Plus className='w-4 h-4' />
              Add New
            </button>
          </div>
        ) : (
          <div className='flex-1 m-5 sm:m-0'>
            <div className='flex flex-col items-center justify-center h-full gap-4 border-2 border-dashed border-gray-200 rounded-lg p-6'>
              <button
                onClick={handleConnectGoogleCalendar}
                className='bg-[#1e5a8f] hover:bg-[#184778] text-white font-semibold py-2 px-4 rounded-full cursor-pointer'
              >
                Connect to Google Calendar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
