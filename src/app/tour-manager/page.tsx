"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

interface Event {
  id: string;
  title: string;
  location: string;
  zip: string;
  artist: string;
  agent: string;
  venue: string;
  date: Date;
  status?: string;
}

const initialEvents: Event[] = [
  {
    id: "2hvftr1803qufokt18vkb5p90r",
    title: "Holiday 2026 Concert",
    location: "Mexico (South)",
    zip: "98640",
    artist: "John",
    agent: "xyz",
    venue: "xyz",
    date: new Date("2026-01-30"),
    status: "confirmed",
  },
  {
    id: "2hvftr1803qtretufokt18vkb5p90r",
    title: "Holiday 2026 Concert",
    location: "Mexico (South)",
    zip: "98640",
    artist: "John",
    agent: "xyz",
    venue: "xyz",
    date: new Date("2026-01-30"),
    status: "confirmed",
  },
  {
    id: "2hvftr1803quf33okt18vkb5p90r",
    title: "Holiday 2026 Concert",
    location: "Mexico (South)",
    zip: "98640",
    artist: "John",
    agent: "xyz",
    venue: "xyz",
    date: new Date("2026-01-30"),
    status: "confirmed",
  },
  {
    id: "2hvftr1803qurtrfokt18vkb5p90r",
    title: "Holiday 2026 Concert",
    location: "Mexico (South)",
    zip: "98640",
    artist: "John",
    agent: "xyz",
    venue: "xyz",
    date: new Date("2026-02-02"),
    status: "confirmed",
  },
];

type ISODateRange = {
  from?: string;
  to?: string;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();

  const [dateRange, setDateRange] = React.useState<ISODateRange>({
    from: today.toISOString(),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30).toISOString(),
  });

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
    const dates = new Set<number>();
    events.forEach((event) => {
      dates.add(event.date.getTime());
    });
    return Array.from(dates)
      .map((time) => new Date(time))
      .sort((a, b) => a.getTime() - b.getTime());
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate(),
    );
  };

  const handleAddEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
    setSelectedDate(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleAddClick = (date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const dates = getDates();

  return (
    <main className='min-h-screen bg-background'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mt-12'>
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
        <div className='flex-1 m-5 sm:m-0'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-8'>
            <button className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-muted transition-colors'>
              <CalendarIcon className='w-4 h-4' />
              <span className='text-sm font-medium'>Today</span>
            </button>
            <h2 className='text-2xl md:text-3xl font-bold'>
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

              return (
                <div
                  key={date.getTime()}
                  className='flex gap-4 md:gap-8 pb-6 md:pb-8'
                >
                  {/* Date Column */}
                  <div className='flex-shrink-0 pt-4'>
                    <div className='text-3xl md:text-4xl font-bold text-foreground'>
                      {dateNum}
                    </div>
                    <div className='text-xs md:text-sm font-semibold text-muted-foreground mt-1'>
                      {monthName}, {dayOfWeek}
                    </div>
                  </div>

                  {/* Events Column */}
                  <div className='flex-1 space-y-3 min-w-0'>
                    {dateEvents.length > 0 ? (
                      dateEvents.map((event) => (
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
                                  {event.title}
                                </h3>
                                <div className='flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground'>
                                  <span className='whitespace-nowrap'>
                                    {event.location}
                                  </span>
                                  <span className='whitespace-nowrap'>
                                    Zip: {event.zip}
                                  </span>
                                </div>
                              </div>

                              <p className='text-xs md:text-sm text-muted-foreground'>
                                <span className='font-semibold'>Info:</span>{" "}
                                Artist: {event.artist}, Agent: {event.agent},
                                Venue: {event.venue},
                              </p>
                            </div>

                            {/* Delete Button */}
                            {/* <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className='flex-shrink-0 p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity'
                              aria-label='Delete event'
                            >
                              <X className='w-4 h-4' />
                            </button> */}
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
                          className='inline-flex items-center gap-2 px-6 py-2 bg-[#1e5a8f] hover:bg-[#184778] text-white font-semibold rounded-full transition-colors text-sm md:text-base'
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

          {/* Add Event Button (floating) */}
          {/* <button
            onClick={() => {
              setSelectedDate(null);
              setShowModal(true);
            }}
            className='fixed bottom-6 right-6 md:bottom-8 md:right-8 p-4 md:p-5 bg-[#1e5a8f] hover:bg-[#184778] text-white rounded-full shadow-lg transition-all hover:shadow-xl'
            aria-label='Add new event'
          >
            <Plus className='w-6 h-6' />
          </button> */}

          {/* Modal */}
          {/* {showModal && (
            <EventFormModal
              selectedDate={selectedDate}
              onClose={() => {
                setShowModal(false);
                setSelectedDate(null);
              }}
              onSubmit={handleAddEvent}
            />
          )} */}
        </div>
      </div>
    </main>
  );
}

function EventFormModal({
  selectedDate,
  onClose,
  onSubmit,
}: {
  selectedDate: Date | null;
  onClose: () => void;
  onSubmit: (event: Omit<Event, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    zip: "",
    artist: "",
    agent: "",
    venue: "",
    date: selectedDate || new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
      <div className='bg-card rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 md:p-6 border-b border-border'>
          <h2 className='text-lg md:text-xl font-bold'>Add New Event</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-muted rounded-md transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-4 md:p-6 space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Title</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1e5a8f]'
              placeholder='Event title'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Location</label>
            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1e5a8f]'
              placeholder='Location'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Zip Code</label>
            <input
              type='text'
              name='zip'
              value={formData.zip}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1e5a8f]'
              placeholder='Zip code'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Artist</label>
            <input
              type='text'
              name='artist'
              value={formData.artist}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1e5a8f]'
              placeholder='Artist name'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Agent</label>
            <input
              type='text'
              name='agent'
              value={formData.agent}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1e5a8f]'
              placeholder='Agent'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Venue</label>
            <input
              type='text'
              name='venue'
              value={formData.venue}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1e5a8f]'
              placeholder='Venue'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Date</label>
            <input
              type='date'
              name='date'
              value={formData.date.toISOString().split("T")[0]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  date: new Date(e.target.value),
                }))
              }
              required
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#1e5a8f]'
            />
          </div>

          {/* Buttons */}
          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors font-medium'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 px-4 py-2 bg-[#1e5a8f] hover:bg-[#184778] text-white rounded-md transition-colors font-medium'
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
