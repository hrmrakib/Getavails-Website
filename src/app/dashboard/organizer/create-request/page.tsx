"use client";

import { useState } from "react";
import CreateEventForm from "@/components/dashboard/organizer/createRequest/CreateEventForm";
import EventTabs from "@/components/dashboard/organizer/createRequest/EventTabs";
import EventsList from "@/components/dashboard/organizer/createRequest/EventList";

export type Event = {
  id: string;
  agent: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  amountRange: string;
  status: "pending" | "completed";
  documents?: string[];
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("create");
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      agent: "XYZ",
      artist: "The Rolling Stones",
      venue: "Madison Square Garden",
      location: "New York, NY",
      date: "2024-12-20",
      time: "19:00",
      amountRange: "$50,000 - $75,000",
      status: "completed",
    },
    {
      id: "2",
      agent: "XYZ",
      artist: "Adele",
      venue: "O2 Arena",
      location: "London, UK",
      date: "2024-12-25",
      time: "20:00",
      amountRange: "$100,000 - $150,000",
      status: "pending",
    },
    {
      id: "3",
      agent: "ABC",
      artist: "Ed Sheeran",
      venue: "Emirates Stadium",
      location: "London, UK",
      date: "2024-12-28",
      time: "18:30",
      amountRange: "$75,000 - $100,000",
      status: "completed",
    },
    {
      id: "4",
      agent: "XYZ",
      artist: "Taylor Swift",
      venue: "Wembley Stadium",
      location: "London, UK",
      date: "2025-01-10",
      time: "19:30",
      amountRange: "$200,000 - $300,000",
      status: "pending",
    },
    {
      id: "5",
      agent: "DEF",
      artist: "The Weeknd",
      venue: "Crypto.com Arena",
      location: "Los Angeles, CA",
      date: "2025-01-15",
      time: "20:00",
      amountRange: "$120,000 - $180,000",
      status: "completed",
    },
  ]);

  const handleCreateEvent = (newEvent: Omit<Event, "id" | "status">) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
      status: "pending",
    };
    setEvents([...events, event]);
    setActiveTab("total");
  };

  const getFilteredEvents = () => {
    switch (activeTab) {
      case "pending":
        return events.filter((e) => e.status === "pending");
      case "completed":
        return events.filter((e) => e.status === "completed");
      case "total":
        return events;
      default:
        return [];
    }
  };

  const pendingCount = events.filter((e) => e.status === "pending").length;
  const completedCount = events.filter((e) => e.status === "completed").length;

  return (
    <main className='min-h-screen bg-background'>
      <div className='max-w-4xl mx-auto px-4 py-6 md:py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-8'>
            Events Manager
          </h1>

          {/* Tabs */}
          <EventTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            totalCount={events.length}
            pendingCount={pendingCount}
            completedCount={completedCount}
          />
        </div>

        {/* Content */}
        <div className='mt-8'>
          {activeTab === "create" ? (
            <CreateEventForm onSubmit={handleCreateEvent} />
          ) : (
            <EventsList events={getFilteredEvents()} tab={activeTab} />
          )}
        </div>
      </div>
    </main>
  );
}
