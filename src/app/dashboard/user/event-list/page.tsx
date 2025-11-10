"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetEventListQuery } from "@/redux/features/user/eventListAPI";

interface ConcertEvent {
  id: number;
  type: string;
  dateTime: string;
  image: string;
  title: string;
  description: string;
  location: string;
  price: string;
  artist: string;
  defaultPurchased?: boolean;
}

const CONCERT_EVENTS: ConcertEvent[] = [
  {
    id: 1,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
  {
    id: 2,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
    defaultPurchased: true,
  },
  {
    id: 3,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
  {
    id: 4,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
  {
    id: 5,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
  {
    id: 6,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
];

interface IEvent {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED" | string; // assuming these are possible status values
  title: string;
  description: string;
  images: string[];
  location: string;
  ticket_price: number;
  start_date: string;
  end_date: string;
  artist_names: string[];
  organizer_id: string;
  capacity: number;
  available_capacity: number;
  can_buy_tickets: boolean;
  organizer: {
    name: string;
    avatar: string;
  };
}

export default function Home() {
  const [purchasedEvents, setPurchasedEvents] = useState<number[]>(
    CONCERT_EVENTS.filter((e) => e.defaultPurchased).map((e) => e.id)
  );
  const { data: eventList } = useGetEventListQuery({});

  console.log(eventList?.data);

  const handlePurchase = (eventId: number) => {
    setPurchasedEvents((prev) => [...prev, eventId]);
  };

  const isPurchased = (eventId: number) => purchasedEvents.includes(eventId);

  return (
    <main className='min-h-screen bg-background py-8 px-4 md:px-6 lg:px-8'>
      <div className='container mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-12'>
          Live Concert Events
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {eventList?.data?.map((event: IEvent) => (
            <div
              key={event?.id}
              className='flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300'
            >
              {/* Header Badge and DateTime */}
              <div className='p-4 pb-2'>
                <div className='inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-2'>
                  {event.type}
                </div>
                <p className='text-muted-foreground text-sm'>
                  {event.dateTime}
                </p>
              </div>

              {/* Event Image */}
              <div className='relative w-full h-48 px-4'>
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className='object-cover rounded'
                />
              </div>

              {/* Content */}
              <div className='flex-1 flex flex-col p-4'>
                {/* Title and Price */}
                <div className='flex items-start justify-between gap-2 mb-2'>
                  <h2 className='text-lg font-bold text-foreground flex-1'>
                    {event.title}
                  </h2>
                  <span className='text-primary font-semibold text-sm whitespace-nowrap'>
                    {event?.ticket_price}
                  </span>
                </div>

                {/* Description */}
                <p className='text-muted-foreground text-sm mb-4 flex-1'>
                  {event.description}
                </p>

                {/* Location */}
                <div className='flex items-start gap-2 mb-4'>
                  <MapPin className='w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5' />
                  <span className='text-sm text-muted-foreground'>
                    {event.location}
                  </span>
                </div>

                {/* Artist */}
                <div className='mb-6'>
                  <p className='text-sm font-semibold text-foreground mb-1'>
                    Artist
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {event.artist}
                  </p>
                </div>

                {/* Button */}
                <div className='mt-auto'>
                  {isPurchased(event.id) ? (
                    <Button
                      disabled
                      variant='outline'
                      className='w-full justify-center bg-transparent'
                    >
                      Already Purchases
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePurchase(event.id)}
                      className='w-full justify-center'
                      variant='default'
                    >
                      Buy Ticket Now
                      <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
