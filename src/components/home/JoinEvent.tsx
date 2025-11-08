"use client";

import { useState } from "react";
import { ChevronRight, Calendar, MapPin, Ticket } from "lucide-react";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  image: string;
  description: string;
  artist: string;
  location: string;
  priceRange: string;
  booked: boolean;
}

const EVENTS: Event[] = [
  {
    id: 1,
    title: "Summer Beats 2025",
    category: "Live Concert",
    date: "25 December 2025",
    time: "7:00 PM – 11:00 PM",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X0laOTYTCqokKJi8lrLQku8otwb3tE.png",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    artist:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    priceRange: "৳800 – ৳2500",
    booked: false,
  },
  {
    id: 2,
    title: "Summer Beats 2025",
    category: "Live Concert",
    date: "25 December 2025",
    time: "7:00 PM – 11:00 PM",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X0laOTYTCqokKJi8lrLQku8otwb3tE.png",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    artist:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    priceRange: "৳800 – ৳2500",
    booked: false,
  },
  {
    id: 3,
    title: "Summer Beats 2025",
    category: "Live Concert",
    date: "25 December 2025",
    time: "7:00 PM – 11:00 PM",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X0laOTYTCqokKJi8lrLQku8otwb3tE.png",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    artist:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    priceRange: "৳800 – ৳2500",
    booked: false,
  },
];

export default function JoinEvent() {
  const [events, setEvents] = useState<Event[]>(EVENTS);

  const toggleBooking = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, booked: !event.booked } : event
      )
    );
  };

  return (
    <main className='w-full min-h-screen bg-background'>
      <div className='container mx-auto'>
        {/* Header Section */}
        <section className='w-full py-8 md:py-16 px-4 md:px-8 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#235789] mb-4'>
            Join Event
          </h1>
          <p className='text-base md:text-lg text-muted-foreground max-w-2xl mx-auto'>
            You can see upcoming events and buy tickets / join event easily from
            here
          </p>
        </section>

        {/* Events Section */}
        <section className='w-full px-4 md:px-8 pb-12'>
          <div className='relative'>
            {/* Events Container */}
            <div
              id='events-container'
              className='grid grid-cols-2 md:grid-cols-3 gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide'
              style={{ scrollBehavior: "smooth" }}
            >
              {events.map((event) => (
                <div
                  key={event.id}
                  className='flex-shrink-0 w-full md:w- snap-start'
                >
                  <div className='border-2 border-slate-300 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow h-full flex flex-col'>
                    {/* Card Header with Category */}
                    <div className='px-6 pt-6 pb-4'>
                      <span className='inline-block px-3 py-1 bg-[#235789] text-white text-xs md:text-sm font-semibold rounded-full'>
                        {event.category}
                      </span>
                      <p className='text-xs md:text-sm text-muted-foreground mt-2 flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        {event.date}, {event.time}
                      </p>
                    </div>

                    {/* Image */}
                    <div className='px-6 pb-4'>
                      <Image
                        src={"/blog/1.jpg"}
                        width={400}
                        height={400}
                        alt={event.title}
                        className='w-full h-48 md:h-56 object-cover rounded-lg'
                      />
                    </div>

                    {/* Event Details */}
                    <div className='px-6 pb-4 flex-grow flex flex-col'>
                      <h3 className='text-xl md:text-2xl font-bold text-foreground mb-3'>
                        {event.title}
                      </h3>

                      <p className='text-sm md:text-base text-muted-foreground mb-4 line-clamp-2'>
                        {event.description}
                      </p>

                      {/* Artist Section */}
                      <div className='mb-4'>
                        <h4 className='text-lg font-bold text-foreground mb-2'>
                          Artist
                        </h4>
                        <p className='text-sm md:text-base text-muted-foreground'>
                          {event.artist}
                        </p>
                      </div>

                      {/* Location and Price */}
                      <div className='flex items-center justify-between text-sm md:text-base mb-6 mt-auto'>
                        <div className='flex items-center gap-2 text-muted-foreground'>
                          <MapPin className='w-4 h-4' />
                          <span>{event.location}</span>
                        </div>
                        <span className='font-semibold text-foreground'>
                          {event.priceRange}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleBooking(event.id)}
                        className={`w-full py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                          event.booked
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-[#235789] text-white hover:bg-blue-700 active:scale-95"
                        }`}
                      >
                        <Ticket className='w-4 h-4' />
                        {event.booked ? "Booked ✓" : "Buy Ticket Now"}
                        <ChevronRight className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
