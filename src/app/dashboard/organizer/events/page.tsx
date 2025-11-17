"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export interface Event {
  id: string;
  title: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  totalSpent: number;
  status: "ongoing" | "completed";
  description?: string;
  ticketPrice?: number;
  capacity?: number;
  time?: string;
  image?: string;
}

const INITIAL_EVENTS: Event[] = [
  {
    id: "1",
    title: "DJ Nova Live",
    artist: "Arijit Sing",
    venue: "Electric Hall",
    location: "New York, USA",
    date: "Aug 25",
    totalSpent: 12400,
    status: "ongoing",
    description: "An electrifying live performance by DJ Nova",
    ticketPrice: 50,
    capacity: 500,
    time: "8:00 PM",
  },
];

export default function Home() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [activeTab, setActiveTab] = useState<
    "event-list" | "completed" | "add-event"
  >("event-list");
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    description: "",
    ticketPrice: "",
    capacity: "",
    image: "" as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ongoingEvents = events.filter((e) => e.status === "ongoing");
  const completedEvents = events.filter((e) => e.status === "completed");

  const handleStartEvent = (id: string) => {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, status: "ongoing" } : e))
    );
  };

  const handleEndEvent = (id: string) => {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, status: "completed" } : e))
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublishEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.artist || !formData.venue) {
      alert("Please fill in all required fields");
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      artist: formData.artist,
      venue: formData.venue,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      totalSpent:
        parseFloat(formData.ticketPrice) * parseInt(formData.capacity || "1"),
      status: "ongoing",
      description: formData.description,
      ticketPrice: parseFloat(formData.ticketPrice),
      capacity: parseInt(formData.capacity),
      image: formData.image || undefined,
    };

    setEvents([...events, newEvent]);

    setFormData({
      title: "",
      artist: "",
      venue: "",
      location: "",
      date: "",
      time: "",
      description: "",
      ticketPrice: "",
      capacity: "",
      image: null,
    });
    setActiveTab("event-list");
  };

  const displayEvents =
    activeTab === "event-list" ? ongoingEvents : completedEvents;

  return (
    <main className='min-h-screen bg-gray-50'>
      <div className='mx-auto container'>
        <div className='sticky top-0 z-40 bg-transparent'>
          <div className='px-4 py-6 sm:px-6 md:px-8'>
            <div className='flex gap-8'>
              <button
                onClick={() => setActiveTab("event-list")}
                className={`px-0 py-2 font-medium text-base transition-colors ${
                  activeTab === "event-list"
                    ? "text-[#235789] border-b-2 border-[#235789]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Event List
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-0 py-2 font-medium text-base transition-colors ${
                  activeTab === "completed"
                    ? "text-[#235789] border-b-2 border-[#235789]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Completed
              </button>

              <button
                onClick={() => setActiveTab("add-event")}
                className={`w-full px-4 py-2 ${
                  activeTab === "add-event"
                    ? "bg-[#235789] "
                    : "bg-white shadow-md"
                } text-black font-medium rounded-lg hover:bg-[#235789] hover:text-white transition-colors sm:w-auto`}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>

        <div className='px-4 py-8 sm:px-6 md:px-8'>
          {(activeTab === "event-list" || activeTab === "completed") && (
            <div>
              <h2 className='mb-6 text-2xl font-bold text-gray-900'>
                {activeTab === "event-list"
                  ? "Ongoing Events"
                  : "Completed Events"}
              </h2>

              {displayEvents.length === 0 ? (
                <div className='rounded-lg border border-gray-200 bg-white p-8 text-center'>
                  <p className='text-gray-500'>
                    No {activeTab === "event-list" ? "ongoing" : "completed"}{" "}
                    events
                  </p>
                </div>
              ) : (
                <div className='grid gap-4 sm:grid-cols-2'>
                  {displayEvents.map((event) => (
                    <div
                      key={event.id}
                      className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow'
                    >
                      <h3 className='mb-4 text-lg font-bold text-gray-900'>
                        {event.title}
                      </h3>
                      <ul className='mb-6 space-y-2 text-sm text-gray-700'>
                        <li>• Artist: {event.artist}</li>
                        <li>• Venue: {event.venue}</li>
                        <li>• Location: {event.location}</li>
                        <li>• Date: {event.date}</li>
                        <li>
                          • Total spent: ${event.totalSpent.toLocaleString()}
                        </li>
                      </ul>
                      <button
                        onClick={() =>
                          activeTab === "event-list"
                            ? handleEndEvent(event.id)
                            : handleStartEvent(event.id)
                        }
                        className='w-full rounded-lg bg-gray-200 py-2 font-medium text-gray-900 hover:bg-gray-300 transition-colors'
                      >
                        {activeTab === "event-list"
                          ? "End Event"
                          : "Start Event"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "add-event" && (
            <div className='max-w-2xl mx-auto'>
              <h2 className='mb-8 text-2xl font-bold text-gray-900'>
                Add New Event
              </h2>

              <form onSubmit={handlePublishEvent} className='space-y-6'>
                <div className='rounded-lg border-2 border-dashed border-gray-300 p-8'>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />
                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='w-full'
                  >
                    {formData.image ? (
                      <div className='space-y-4'>
                        <Image
                          src={formData.image || "/placeholder.svg"}
                          alt='Preview'
                          className='mx-auto h-40 w-full object-cover rounded'
                        />
                        <p className='text-sm text-[#235789] hover:text-blue-700'>
                          Change Picture
                        </p>
                      </div>
                    ) : (
                      <div className='space-y-2'>
                        <div className='mx-auto h-32 w-full bg-blue-100 rounded flex items-center justify-center'></div>
                        <p className='text-center text-gray-600'>Add Picture</p>
                      </div>
                    )}
                  </button>
                </div>

                <div className='space-y-4'>
                  <input
                    type='text'
                    name='title'
                    placeholder='Event Title'
                    value={formData.title}
                    onChange={handleFormChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    required
                  />

                  <textarea
                    name='description'
                    placeholder='Event Description'
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={3}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none'
                  />

                  <input
                    type='text'
                    name='location'
                    placeholder='Enter Location'
                    value={formData.location}
                    onChange={handleFormChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                  />

                  <input
                    type='number'
                    name='ticketPrice'
                    placeholder='Ticket Price'
                    value={formData.ticketPrice}
                    onChange={handleFormChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                  />

                  <input
                    type='number'
                    name='capacity'
                    placeholder='Capacity'
                    value={formData.capacity}
                    onChange={handleFormChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                  />

                  <input
                    type='date'
                    name='date'
                    value={formData.date}
                    onChange={handleFormChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                  />

                  <input
                    type='time'
                    name='time'
                    value={formData.time}
                    onChange={handleFormChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                  />

                  <input
                    type='text'
                    name='artist'
                    placeholder='Artist Name'
                    value={formData.artist}
                    onChange={handleFormChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    required
                  />

                  <input
                    type='text'
                    name='venue'
                    placeholder='Venue'
                    value={formData.venue}
                    onChange={handleFormChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='w-full rounded-lg bg-[#235789] py-3 font-bold text-white hover:bg-blue-700 transition-colors'
                >
                  Publish Now
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
