"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  User,
  MessageSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingDrawer } from "@/components/dashboard/agent/BookingDrawer";
import { AddArtistModal } from "@/components/dashboard/agent/AddArtistModal";
import { useGetMyArtistsQuery } from "@/redux/features/agent/agentAPI";

interface IArtist {
  id: string;
  role: "ARTIST";
  email: string;
  avatar: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  location: string;
  genre: string;
  availability: string[];
  price: string;
  artist_agents: string[];
  artist_pending_agents: string[];
}

export default function ArtistBooking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<IArtist | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<"requests" | "addArtist" | "">("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: myArtists, isFetching } = useGetMyArtistsQuery({ page, limit });

  console.log(myArtists);

  const totalArtists = myArtists?.meta?.total || 0;
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

  return (
    <div className='min-h-screen bg-background'>
      {/* Search Bar */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-8'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
          <input
            type='text'
            placeholder='Search for artist....'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={() => setActiveTab("requests")}
            className={`relative text-sm font-medium transition-colors border-2 ${
              activeTab === "requests" ? "!border-[#235789]" : "border-gray-300"
            } px-4 py-2 rounded-3xl cursor-pointer ${
              activeTab === "requests"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            New Request{" "}
            <span className='ml-2 inline-block rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-white'>
              {/* {agentRequest?.data?.length || 0} */} 0
            </span>
          </button>
          <button
            onClick={() => setActiveTab("addArtist")}
            className={`relative text-sm font-medium transition-colors border-2 ${
              activeTab === "addArtist"
                ? "!border-[#235789]"
                : "border-gray-300"
            } px-4 py-2 rounded-3xl cursor-pointer ${
              activeTab === "addArtist"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            See New Agent
          </button>
          <button
            onClick={() => setActiveTab("")}
            className={`relative text-sm font-medium transition-colors border-2 ${
              activeTab === "" ? "!border-[#235789]" : "border-gray-300"
            } px-4 py-2 rounded-3xl cursor-pointer ${
              activeTab === ""
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Default
          </button>
        </div>
      </div>

      {/* Artists Table */}
      <div className='bg-card rounded-lg border border-border overflow-hidden'>
        <div className='hidden md:grid md:grid-cols-6 bg-[#235789] text-primary-foreground p-4 font-medium'>
          <div>Artist</div>
          <div>Genre</div>
          <div>Location</div>
          <div>Availability</div>
          <div>Price/Rate</div>
          <div>Actions</div>
        </div>

        {isFetching ? (
          <div className='p-8 text-center text-muted-foreground'>
            Loading...
          </div>
        ) : (
          <div className='divide-y divide-border'>
            {myArtists?.data?.map((artist: IArtist) => (
              <div
                key={artist.id}
                className='p-4 hover:bg-muted/50 transition-colors'
              >
                <div className='hidden md:grid md:grid-cols-6 items-center'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src={artist.avatar || "/placeholder.svg"}
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
                  <div>{artist.genre}</div>
                  <div>{artist.location}</div>
                  <div className='flex items-center gap-2'>
                    {artist.availability[0]?.split("T")[0]}{" "}
                    <button
                      onClick={() => handleBookArtist(artist)}
                      className='cursor-pointer'
                    >
                      <Eye className='h-4 w-4' />
                    </button>
                  </div>
                  <div>{artist.price}</div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleBookArtist(artist)}
                      className='h-8 w-8 text-primary hover:text-primary hover:bg-primary/10'
                    >
                      <User className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-primary hover:text-primary hover:bg-primary/10'
                    >
                      <MessageSquare className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
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

      <AddArtistModal open={showAddModal} onOpenChange={setShowAddModal} />
      <BookingDrawer
        open={showBookingDrawer}
        onOpenChange={setShowBookingDrawer}
        artist={selectedArtist}
      />
    </div>
  );
}
