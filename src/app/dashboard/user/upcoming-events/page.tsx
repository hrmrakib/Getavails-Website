"use client";

import Image from "next/image";
import { ArrowRight, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useGetUpcomingEventsQuery,
  useTicketPurchaseMutation,
} from "@/redux/features/user/userAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoleRedirect } from "@/utils/makePrivate";

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
  booked_tickets: string[];
}

export default function Home() {
  const [bookedTickets, setBookedTickets] = useState<IEvent | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: eventList } = useGetUpcomingEventsQuery({
    page: 1,
    limit,
    search,
  });
  const [open, setOpen] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [ticketPurchaseMutation, { isLoading }] = useTicketPurchaseMutation();
  const router = useRouter();

  const formatDate = (date: string) => {
    const eventDate = new Date(date);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(eventDate);
  };

  const handleBuyMoreTickets = () => {
    router.push(`/dashboard/user/`);
  };

  const handleBookedTicket = (event: IEvent) => {
    setBookedTickets(event);
    setOpen(true);
  };

  return (
    <RoleRedirect allowedRole='USER'>
      <main className='min-h-screen bg-background py-8 px-4 md:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-12'>
            Live Concert Events
          </h1>

          {eventList?.data?.length === 0 && (
            <div className='flex items-center justify-center h-40'>
              <div className='flex items-center space-x-2'>
                No Upcoming Events Found
              </div>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {eventList?.data?.map((event: IEvent) => (
              <div
                key={event?.id}
                className='flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300'
              >
                {/* Header Badge and DateTime */}
                <div className='p-4 pb-2'>
                  <div className='inline-block bg-[#E9EEF3] text-[#000000CC] px-3 py-1.5 rounded-sm text-sm font-medium mb-2'>
                    Live Concert
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    {formatDate(event?.start_date) +
                      " - " +
                      formatDate(event?.end_date)}
                  </p>
                </div>

                {/* Event Image */}
                <div className='relative w-full h-48 rounded-md'>
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + event?.images[0]}
                    alt={event.title}
                    fill
                    className='object-cover rounded-md px-5'
                  />
                </div>

                {/* Content */}
                <div className='flex-1 flex flex-col p-4'>
                  {/* Title and Price */}
                  <div className='flex items-start justify-between gap-2 mb-2'>
                    <h2 className='text-lg font-bold text-foreground flex-1'>
                      {event.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className='text-muted-foreground text-sm mb-4 flex-1'>
                    {event?.description}
                  </p>

                  {/* Location */}
                  <div className='flex items-center justify-between gap-2 mb-4'>
                    <div className='flex items-center gap-2'>
                      <MapPin className='w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-muted-foreground'>
                        {event.location}
                      </span>
                    </div>
                    <p className='text-[#235789] font-semibold text-sm whitespace-nowrap'>
                      $ {event?.ticket_price}
                    </p>
                  </div>

                  {/* Artist */}
                  <div className='mb-6'>
                    <p className='text-sm font-semibold text-foreground mb-1'>
                      Artist
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {event?.artist_names?.join(", ")}
                    </p>
                  </div>

                  {/* Button */}
                  <div className='mt-auto'>
                    <Button
                      onClick={() => handleBookedTicket(event)}
                      className='w-full justify-center bg-[#E9EEF3] text-[#000000CC] hover:bg-[#E9EEF3] hover:text-[#000000CC]'
                      variant='default'
                    >
                      See Booked Tickets
                      <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                  </div>

                  {/* Dialog Content */}
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Live Concert</DialogTitle>
                        {/* <DialogDescription>
                        {formatDate(event?.start_date) +
                          " - " +
                          formatDate(event?.end_date)}
                      </DialogDescription> */}
                      </DialogHeader>
                      <div className='grid gap-4'>
                        <div className='grid gap-3'>
                          <h2>Your Ticket Details</h2>

                          <div>
                            <ul>
                              {bookedTickets?.booked_tickets?.map(
                                (ticket: string, index: number) => (
                                  <li className='mb-2' key={ticket}>
                                    {index + 1}: {ticket}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <DialogFooter className='flex items-center gap-2 lg:gap-6'>
                        <Button
                          type='submit'
                          disabled={
                            Math.floor(ticketQuantity) > event?.capacity ||
                            Math.floor(ticketQuantity) < 1
                          }
                          className='disabled:bg-[#E9EEF3] disabled:text-[#000000CC] disabled:cursor-not-allowed'
                          onClick={() => handleBuyMoreTickets()}
                        >
                          Buy More Tickets
                        </Button>

                        <DialogClose asChild>
                          <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </RoleRedirect>
  );
}
