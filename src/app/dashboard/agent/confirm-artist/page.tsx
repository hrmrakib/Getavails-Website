"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Clock } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  genre: string;
  location: string;
  priceRange: string;
  status: "Awaiting Response" | "Confirmed" | "Rejected";
}

const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Kate Morrison",
    avatar: "/client.png",
    genre: "Rock Music",
    location: "Edinburgh (Scotland)",
    priceRange: "$4,000",
    status: "Awaiting Response",
  },
  {
    id: "2",
    name: "Kate Morrison",
    avatar: "/client.png",
    genre: "Rock Music",
    location: "Edinburgh (Scotland)",
    priceRange: "$4,000",
    status: "Awaiting Response",
  },
  {
    id: "3",
    name: "Kate Morrison",
    avatar: "/client.png",
    genre: "Rock Music",
    location: "Edinburgh (Scotland)",
    priceRange: "$4,000",
    status: "Awaiting Response",
  },
  {
    id: "4",
    name: "Kate Morrison",
    avatar: "/client.png",
    genre: "Rock Music",
    location: "Edinburgh (Scotland)",
    priceRange: "$4,000",
    status: "Awaiting Response",
  },
  {
    id: "5",
    name: "Kate Morrison",
    avatar: "/client.png",
    genre: "Rock Music",
    location: "Edinburgh (Scotland)",
    priceRange: "$4,000",
    status: "Awaiting Response",
  },
  {
    id: "6",
    name: "Kate Morrison",
    avatar: "/client.png",
    genre: "Rock Music",
    location: "Edinburgh (Scotland)",
    priceRange: "$4,000",
    status: "Awaiting Response",
  },
];

export default function ConfirmArtistPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useState(mockArtists);

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccept = (artistId: string) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.id === artistId
          ? { ...artist, status: "Confirmed" as const }
          : artist
      )
    );
  };

  const handleReject = (artistId: string) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.id === artistId
          ? { ...artist, status: "Rejected" as const }
          : artist
      )
    );
  };

  const handleMessage = (artistId: string) => {
    console.log("[v0] Message artist:", artistId);
    // Message functionality would be implemented here
  };

  return (
    <div className='min-h-screen bg-transparent'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4'>
        <h1 className='text-2xl font-semibold text-gray-900'>
          Confirm Artist list
        </h1>
        <div className='relative max-w-md w-full sm:w-auto'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          <Input
            placeholder='Search for artist...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 h-12 bg-white'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm'
          >
            {/* Artist Header */}
            <div className='flex items-center gap-3 mb-4'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={artist.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {artist.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-semibold text-gray-900'>{artist.name}</h3>
                <p className='text-sm text-gray-600'>{artist.genre}</p>
              </div>
            </div>

            {/* Artist Details */}
            <div className='space-y-2 mb-4'>
              <div className='flex items-start gap-2'>
                <span className='text-sm lg:text-base font-medium text-[#1E1E1E]'>
                  •
                </span>
                <span className='text-sm lg:text-base text-[#1E1E1E]'>
                  Location: {artist.location}
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-sm lg:text-base font-medium text-[#1E1E1E]'>
                  •
                </span>
                <span className='text-sm lg:text-base text-[#1E1E1E]'>
                  Price Range: {artist.priceRange}
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-sm lg:text-base font-medium text-[#1E1E1E]'>
                  •
                </span>
                <div className='flex items-center gap-1'>
                  <span className='text-sm lg:text-base text-[#1E1E1E]'>
                    Status:
                  </span>
                  <Clock className='h-3 w-3 text-gray-500' />
                  <span className='text-sm lg:text-base text-[#1E1E1E]'>
                    {artist.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-4'>
              <Button
                variant='outline'
                className='w-full bg-[#DFEBF7] text-[#235789] border-blue-200 hover:bg-blue-100 cursor-pointer'
                onClick={() => handleMessage(artist.id)}
              >
                Message Artist
              </Button>
              <div className='flex gap-3'>
                <Button
                  className='flex-1 bg-[#235789] hover:bg-[#237acc] text-white'
                  onClick={() => handleAccept(artist.id)}
                  disabled={artist.status !== "Awaiting Response"}
                >
                  Accept
                </Button>
                <Button
                  variant='outline'
                  className='flex-1 text-[#C80000] border-[#C80000] hover:bg-red-50 bg-transparent'
                  onClick={() => handleReject(artist.id)}
                  disabled={artist.status !== "Awaiting Response"}
                >
                  Reject
                </Button>
              </div>
            </div>

            {/* Status Indicator */}
            {artist.status !== "Awaiting Response" && (
              <div className='mt-3 pt-3 border-t border-gray-100'>
                <span
                  className={`text-sm font-medium ${
                    artist.status === "Confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {artist.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArtists.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500'>
            No artists found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
