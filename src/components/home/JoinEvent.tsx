/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight, Calendar, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import { useGetEventListQuery } from "@/redux/features/user/userAPI";
import { getCurrentUser } from "@/service/authService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
import { toast } from "sonner";

interface IEvent {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  status: string;
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

export default function JoinEvent() {
  const router = useRouter();
  const [user, setUser] = useState<null | any>(null);
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !localStorage.getItem("access_token"),
  });
  const { data: eventList } = useGetEventListQuery({
    page: 1,
    limit: 3,
  });

  useEffect(() => {
    async function getTheUser() {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }
    }

    getTheUser();
  }, []);

  const handleBooking = async (eventId: string) => {
    if (!user) {
      router.push("/login");
      return;
    } else if (!profile?.data?.is_verified) {
      toast.error("Please verify your profile first");
      return;
    } else if (profile?.data?.role !== "user") {
      toast.error("You are not a user, login as a user to book an event");
      return;
    }

    router.push(`/dashboard/user/event/${eventId}`);
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
              className='grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide'
              style={{ scrollBehavior: "smooth" }}
            >
              {eventList?.data?.map((event: IEvent) => (
                <div
                  key={event.id}
                  className='flex-shrink-0 w-full md:w-full snap-start'
                >
                  <div className='border-2 border-slate-300 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow h-full flex flex-col'>
                    {/* Card Header with Category */}
                    <div className='px-6 pt-6 pb-4'>
                      <span className='inline-block px-3 py-1 bg-[#235789] text-white text-xs md:text-sm font-semibold rounded-full'>
                        {event?.status}
                      </span>
                      <p className='text-xs md:text-sm text-muted-foreground mt-2 flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        {event?.created_at?.split("T")[0]},{" "}
                        {event.created_at?.split("T")[1].split("Z")[0]}
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
                          {event.artist_names.join(", ")}
                        </p>
                      </div>

                      {/* Location and Price */}
                      <div className='flex items-center justify-between text-sm md:text-base mb-6 mt-auto'>
                        <div className='flex items-center gap-2 text-muted-foreground'>
                          <MapPin className='w-4 h-4' />
                          <span>{event.location}</span>
                        </div>
                        <span className='font-semibold text-foreground'>
                          {event.ticket_price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleBooking(event.id)}
                        className={`w-full py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                          event?.available_capacity === 0
                            ? "bg-[#881a1a] text-white hover:bg-[#8a0707] cursor-not-allowed"
                            : "bg-[#235789] text-white hover:bg-[#12538f] active:scale-95"
                        }`}
                      >
                        <Ticket className='w-4 h-4' />
                        {event?.available_capacity === 0
                          ? "Booked ✓"
                          : "Buy Ticket Now"}
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
