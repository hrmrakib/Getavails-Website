"use client";

import Image from "next/image";
import { ArrowRight, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetASingleEventQuery,
  useTicketPurchaseMutation,
} from "@/redux/features/user/userAPI";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RoleRedirect } from "@/utils/makePrivate";

interface Event {
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

export default function Home() {
  const [open, setOpen] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [ticketPurchaseMutation, { isLoading }] = useTicketPurchaseMutation();
  const id = useParams().id;

  const { data: event, isLoading: isEventLoading } =
    useGetASingleEventQuery(id);

  console.log(event?.data);

  const formatDate = (date?: string) => {
    if (!date) return "Invalid date";

    const dt = new Date(date);

    if (isNaN(dt.getTime())) return "Invalid date";

    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(dt);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10); // Convert string to number
    if (!isNaN(value)) {
      setTicketQuantity(value); // Only set valid numbers
    }
  };

  const handleTicketPurchase = async () => {
    const data = {
      event_id: id,
      quantity: ticketQuantity,
    };

    console.log(data);

    try {
      const res = await ticketPurchaseMutation(data).unwrap();
      console.log("res => ", res?.data?.url);

      if (res?.data?.url) {
        window.open(res?.data?.url, "_blank");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up. Please try again.");
    }
  };

  return (
    <RoleRedirect allowedRole='USER'>
      <main className='min-h-screen bg-background py-8 px-4 md:px-6 lg:px-8'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-12'>
              Live Concert Events
            </h1>

            <Link
              href='/dashboard/user/upcoming-events'
              className='bg-[#E9EEF3] text-[#000000CC] px-3 py-1.5 rounded-sm text-sm font-medium'
            >
              See all events
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300'>
              {/* Header Badge and DateTime */}
              <div className='p-4 pb-2'>
                <div className='inline-block bg-[#E9EEF3] text-[#000000CC] px-3 py-1.5 rounded-sm text-sm font-medium mb-2'>
                  Live Concert
                </div>
                <p className='text-muted-foreground text-sm'>
                  {/* {formatDate(event?.data?.start_date) +
                  " - " +
                  formatDate(event?.data?.end_date)} */}
                </p>
              </div>

              {/* Event Image */}
              <div className='relative w-full h-48 rounded-md'>
                {event?.data?.images[0] && !isEventLoading && (
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL + event?.data?.images[0]
                    }
                    alt={event?.data?.title}
                    fill
                    className='object-cover rounded-md px-5'
                  />
                )}
              </div>

              {/* Content */}
              <div className='flex-1 flex flex-col p-4'>
                {/* Title and Price */}
                <div className='flex items-start justify-between gap-2 mb-2'>
                  <h2 className='text-lg font-bold text-foreground flex-1'>
                    {event?.data?.title}
                  </h2>
                </div>

                {/* Description */}
                <p className='text-muted-foreground text-sm mb-4 flex-1'>
                  {event?.data?.description}
                </p>

                {/* Location */}
                <div className='flex items-center justify-between gap-2 mb-4'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5' />
                    <span className='text-sm text-muted-foreground'>
                      {event?.data?.location}
                    </span>
                  </div>
                  <p className='text-[#235789] font-semibold text-sm whitespace-nowrap'>
                    $ {event?.data?.ticket_price}
                  </p>
                </div>

                {/* Artist */}
                <div className='mb-6'>
                  <p className='text-sm font-semibold text-foreground mb-1'>
                    Artist
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {event?.data?.artist_names?.join(", ")}
                  </p>
                </div>

                {/* Button */}
                <div className='mt-auto'>
                  {event?.data?.can_buy_tickets ? (
                    <Button
                      onClick={() => setOpen(true)}
                      className='w-full justify-center bg-[#E9EEF3] text-[#000000CC] hover:bg-[#E9EEF3] hover:text-[#000000CC]'
                      variant='default'
                    >
                      Buy Ticket Now
                      <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant='outline'
                      className='w-full justify-center bg-[#E9EEF3] text-[#000000CC] hover:bg-[#E9EEF3] hover:text-[#000000CC]'
                    >
                      Already Purchased
                    </Button>
                  )}
                </div>

                {/* Dialog Content */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Live Concert</DialogTitle>
                      <DialogDescription>
                        {`${formatDate(event?.data?.start_date)} - ${formatDate(
                          event?.data?.end_date
                        )}`}
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4'>
                      <div className='grid gap-3'>
                        <Label htmlFor='quantity'>
                          Your Ticket Quantity for Purchase{" "}
                          <span className='text-red-600'>*</span>
                        </Label>
                        <Input
                          id='quantity'
                          type='number'
                          name='quantity'
                          min={1}
                          max={event?.capacity}
                          defaultValue={1}
                          value={ticketQuantity}
                          onChange={handleQuantityChange}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant='outline'>Cancel</Button>
                      </DialogClose>
                      <Button
                        type='submit'
                        disabled={
                          Math.floor(ticketQuantity) > event?.capacity ||
                          Math.floor(ticketQuantity) < 1
                        }
                        className='disabled:bg-[#E9EEF3] disabled:text-[#000000CC] disabled:cursor-not-allowed'
                        onClick={() => handleTicketPurchase()}
                      >
                        Pay Now{" "}
                        {isLoading && (
                          <Loader2 className='w-4 h-4 ml-2 animate-spin' />
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </main>
    </RoleRedirect>
  );
}
