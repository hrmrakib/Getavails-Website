"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircleMore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingDrawer } from "@/components/dashboard/agent/BookingDrawer";
import { AddArtistModal } from "@/components/dashboard/agent/AddArtistModal";
import Link from "next/link";
import { useGetConfirmedVenueQuery } from "@/redux/features/organizer/organizerAPI";

interface Agent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  availability: string[];
}

interface IArtist {
  start_date: string;
  end_date: string;
  booking_location: string;
  agent: Agent;
  id: string;
  role: "ARTIST";
  email: string;
  avatar: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  location: string;
  subscription_name: string | null;
  genre: string;
  availability: string[];
  price: string;
  artist_agents: string[];
  artist_pending_agents: string[];
}

export default function VenueConfirmedRequest({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const [selectedArtist, setSelectedArtist] = useState<IArtist | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: confirmedAgent, isFetching } = useGetConfirmedVenueQuery({
    page,
    limit,
    search: searchQuery,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  const totalArtists = confirmedAgent?.meta?.total || 0;
  const totalPages = Math.ceil(totalArtists / limit);

  const handleBookArtist = (artist: IArtist) => {
    setSelectedArtist(artist);
    setShowBookingDrawer(true);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  if (isFetching)
    return (
      <p className='text-center text-muted-foreground py-6'>Loading ...</p>
    );

  if (!confirmedAgent?.data?.length)
    return (
      <p className='text-center text-muted-foreground py-6'>No data found.</p>
    );

  return (
    <div className='min-h-screen bg-background'>
      {/* Artists Table */}
      <main>
        <div className='bg-card rounded-lg border border-border overflow-hidden'>
          {!confirmedAgent?.data?.length ? (
            <p className='text-center text-muted-foreground py-6 lg:py-20'>
              No data found.
            </p>
          ) : (
            <div className='hidden md:grid md:grid-cols-6 bg-[#235789] text-primary-foreground p-4 font-medium'>
              <div>Artist</div>
              <div>Genre</div>
              <div>Location</div>
              <div>Availability</div>
              <div>Price/Rate</div>
              <div>Actions</div>
            </div>
          )}

          {isFetching ? (
            <div className='p-8 text-center text-muted-foreground'>
              Loading...
            </div>
          ) : (
            <div className='divide-y divide-border'>
              {confirmedAgent?.data?.map((artist: IArtist) => (
                <div
                  key={artist.id}
                  className='p-4 hover:bg-muted/50 transition-colors'
                >
                  <div className='hidden md:grid md:grid-cols-6 items-center'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src={process.env.NEXT_PUBLIC_API_URL + artist.avatar}
                          alt={artist.name}
                        />
                        <AvatarFallback>
                          {artist.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium'>{artist.name}</span>
                    </div>
                    <div>{artist?.genre || "N/A"}</div>
                    <div>{artist?.location || "N/A"}</div>
                    <div className='flex items-center gap-2'>
                      {artist.availability[0]?.split("T")[0]}{" "}
                      <button
                        onClick={() => handleBookArtist(artist)}
                        className='cursor-pointer'
                      >
                        <Eye className='h-4 w-4' />
                      </button>
                    </div>
                    <div>{artist.price || "N/A"}</div>
                    <div className='flex items-center gap-2 lg:gap-4'>
                      <button
                        onClick={() => handleBookArtist(artist)}
                        className='h-8 w-8 flex items-center justify-center text-[#235789] transform transition-colors duration-200 ease-in-out rounded-2xl'
                      >
                        <Eye className='h-5 w-5' />
                      </button>
                      <Link
                        href={`/dashboard/organizer/message/`}
                        className='h-8 w-8 flex items-center justify-center bg-[#235789] text-white hover:bg-[#235789]/80 transform transition-colors duration-200 ease-in-out rounded-2xl'
                      >
                        <MessageCircleMore className='h-4 w-4' />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Pagination */}
      <div className='flex items-center justify-center gap-2 p-6'>
        <Button
          variant='ghost'
          size='sm'
          onClick={handlePrev}
          disabled={page === 1}
          className='flex items-center gap-1'
        >
          <ChevronLeft className='h-4 w-4' /> Previous
        </Button>

        <span className='text-sm text-muted-foreground'>
          Page {page} of {totalPages || 1}
        </span>

        <Button
          variant='ghost'
          size='sm'
          onClick={handleNext}
          disabled={page === totalPages}
          className='flex items-center gap-1'
        >
          Next <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      <AddArtistModal open={showAddModal} onOpenChange={setShowAddModal} />
      <BookingDrawer
        open={showBookingDrawer}
        onOpenChange={setShowBookingDrawer}
        artist={selectedArtist}
      />
    </div>
  );
}
