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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingDrawer } from "@/components/dashboard/agent/BookingDrawer";
import { AddArtistModal } from "@/components/dashboard/agent/AddArtistModal";
import { usePathname } from "next/navigation";

interface Artist {
  id: string;
  name: string;
  genre: string;
  location: string;
  availability: "Free Now" | "Within 1 week" | "Booked";
  rate: string;
  avatar: string;
}

const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Sarah Williams",
    genre: "Rock Music Guitarist",
    location: "New York, USA",
    availability: "Free Now",
    rate: "$600 per event",
    avatar: "/client.png",
  },
  {
    id: "2",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "3",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "4",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "5",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "6",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Free Now",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "7",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "8",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Booked",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "9",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Free Now",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "10",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "11",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Booked",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
  {
    id: "12",
    name: "Kate Morrison",
    genre: "Rock Music",
    location: "NY, USA",
    availability: "Booked",
    rate: "$580 per event",
    avatar: "/placeholder-m2lgd.png",
  },
];

export default function ArtistBooking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);
  const pathname = usePathname();

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Free Now":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Within 1 week":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Booked":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleBookArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setShowBookingDrawer(true);
  };

  console.log(pathname.split("/")[1]);

  return (
    <div className='min-h-screen bg-background'>
      {/* Search Bar */}
      <div className='py-4 lg:pb-7'>
        <div className='relative max-w-md ml-auto'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder='Search for artist....'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-10 h-12 bg-muted border-border'
          />
        </div>
      </div>

      {/* Artists Table */}
      <div className=''>
        <div className='bg-card rounded-lg border border-border overflow-hidden'>
          {/* Desktop Table Header */}
          <div className='hidden md:grid md:grid-cols-6 bg-[#235789] text-primary-foreground p-4 font-medium'>
            <div>Artist</div>
            <div>Genre</div>
            <div>Location</div>
            <div>Availability</div>
            <div>Price/Rate</div>
            <div>Actions</div>
          </div>

          {/* Artists List */}
          <div className='divide-y divide-border'>
            {mockArtists.map((artist) => (
              <div
                key={artist.id}
                className='p-4 hover:bg-muted/50 transition-colors'
              >
                {/* Mobile Layout */}
                <div className='md:hidden space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10'>
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
                    <div className='flex-1'>
                      <h3 className='font-medium'>{artist.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {artist.genre}
                      </p>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div>
                      <span className='text-muted-foreground'>Location:</span>
                      <p>{artist.location}</p>
                    </div>
                    <div>
                      <span className='text-muted-foreground'>Rate:</span>
                      <p>{artist.rate}</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Badge
                      className={getAvailabilityColor(artist.availability)}
                    >
                      {artist.availability}
                    </Badge>
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

                {/* Desktop Layout */}
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
                  <div>
                    <Badge
                      className={getAvailabilityColor(artist.availability)}
                    >
                      {artist.availability}
                    </Badge>
                  </div>
                  <div>{artist.rate}</div>
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
        </div>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center gap-2 p-6'>
        <Button variant='ghost' size='sm' className='flex items-center gap-1'>
          <ChevronLeft className='h-4 w-4' />
          Previous
        </Button>
        <div className='flex items-center gap-1'>
          <Button variant='ghost' size='sm'>
            1
          </Button>
          <Button variant='ghost' size='sm'>
            2
          </Button>
          <Button variant='default' size='sm'>
            3
          </Button>
          <span className='px-2'>...</span>
          <Button variant='ghost' size='sm'>
            10
          </Button>
        </div>
        <Button variant='ghost' size='sm' className='flex items-center gap-1'>
          Next
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      {/* Floating Add Button */}
      <Button
        onClick={() => setShowAddModal(true)}
        className='fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-secondary hover:bg-secondary/90'
        size='icon'
      >
        <Plus className='h-6 w-6' />
      </Button>

      {/* Modals/Drawers */}
      <AddArtistModal open={showAddModal} onOpenChange={setShowAddModal} />
      <BookingDrawer
        open={showBookingDrawer}
        onOpenChange={setShowBookingDrawer}
        artist={selectedArtist}
      />
    </div>
  );
}
