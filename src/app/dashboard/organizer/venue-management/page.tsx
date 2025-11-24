"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
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
import { useGetAllVenueQuery } from "@/redux/features/organizer/organizerAPI";
import OfferRequest from "@/components/dashboard/organizer/agentOffer/OfferAgentRequest";
import VenueConfirmedRequest from "@/components/dashboard/organizer/venueManage/VenueConfirmedRequest";
import { RoleRedirect } from "@/utils/makePrivate";

interface IVenue {
  id: string;
  role: "VENUE";
  email: string;
  avatar: string;
  name: string;
  location: string;
  subscription_name: string | null;
  availability: string[];
  price: string | null;
  venue_type: string;
  capacity: number;
}

export default function VenueManagement() {
  const [activeTab, setActiveTab] = useState<
    "new" | "confirmed" | "offer-request"
  >("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<IVenue | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: agentOffer, isFetching } = useGetAllVenueQuery({
    page,
    limit,
    search: searchQuery,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  const totalArtists = agentOffer?.meta?.total || 0;
  const totalPages = Math.ceil(totalArtists / limit);

  const handleBookArtist = (artist: IVenue) => {
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

  // if (!agentOffer?.data?.length)
  //   return (
  //     <p className='text-center text-muted-foreground py-6'>No data found.</p>
  //   );

  return (
    <RoleRedirect allowedRole='ORGANIZER'>
      <div className='min-h-screen bg-background'>
        {/* Search Bar */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-8'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setActiveTab("new")}
              className={`relative text-sm font-medium transition-colors border-2 ${
                activeTab === "new" ? "!border-[#235789]" : "border-gray-300"
              } px-4 py-2 rounded-3xl cursor-pointer ${
                activeTab === "new"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              New
            </button>

            <button
              onClick={() => setActiveTab("confirmed")}
              className={`relative text-sm font-medium transition-colors border-2 ${
                activeTab === "confirmed"
                  ? "!border-[#235789]"
                  : "border-gray-300"
              } px-4 py-2 rounded-3xl cursor-pointer ${
                activeTab === "confirmed"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setActiveTab("offer-request")}
              className={`relative text-sm font-medium transition-colors border-2 ${
                activeTab === "offer-request"
                  ? "!border-[#235789]"
                  : "border-gray-300"
              } px-4 py-2 rounded-3xl cursor-pointer ${
                activeTab === "offer-request"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Offer Request
            </button>
          </div>

          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for artist....'
              className='w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>
        </div>

        {/* Artists Table */}
        <main>
          {activeTab === "new" && (
            <>
              <div className='bg-card rounded-lg border border-border overflow-hidden'>
                {!agentOffer?.data?.length ? (
                  <p className='text-center text-muted-foreground py-6 lg:py-20'>
                    No data found.
                  </p>
                ) : (
                  <div className='hidden md:grid md:grid-cols-6 bg-[#235789] text-primary-foreground p-4 font-medium'>
                    <div>Artist</div>
                    <div>Email</div>
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
                    {agentOffer?.data?.map((artist: IVenue) => (
                      <div
                        key={artist.id}
                        className='p-4 hover:bg-muted/50 transition-colors'
                      >
                        <div className='hidden md:grid md:grid-cols-6 items-center'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='h-8 w-8'>
                              <AvatarImage
                                src={
                                  process.env.NEXT_PUBLIC_API_URL +
                                  artist.avatar
                                }
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
                          <div>{artist?.email || "N/A"}</div>
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
                            <Link
                              href={`/dashboard/Organizer/message/`}
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
            </>
          )}

          {activeTab === "confirmed" && (
            <VenueConfirmedRequest searchQuery={searchQuery} />
          )}
          {activeTab === "offer-request" && (
            <OfferRequest searchQuery={searchQuery} />
          )}
        </main>

        <AddArtistModal open={showAddModal} onOpenChange={setShowAddModal} />

        <BookingDrawer
          open={showBookingDrawer}
          onOpenChange={setShowBookingDrawer}
          artist={selectedArtist}
        />
      </div>
    </RoleRedirect>
  );
}
