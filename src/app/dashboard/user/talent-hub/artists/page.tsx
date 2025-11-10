/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import {
  Bell,
  Search,
  User,
  MessageCircle,
  ExternalLink,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { CustomDayPicker } from "@/components/dashboard/buyer/CustomerDayPicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Artist {
  id: number;
  name: string;
  genre: string;
  agent: string;
  location: string;
  availability: string;
  rate: string;
  avatar: string;
  description: string;
  availabilityStatus: "available" | "within-week";
}

const artists: Artist[] = [
  {
    id: 1,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "within-week",
  },
  {
    id: 2,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Free Now",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "available",
  },
  {
    id: 3,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "within-week",
  },
  {
    id: 4,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Free Now",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "available",
  },
  {
    id: 5,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "within-week",
  },
  {
    id: 6,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "within-week",
  },
  {
    id: 7,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Free Now",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "available",
  },
  {
    id: 8,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "within-week",
  },
  {
    id: 9,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "within-week",
  },
  {
    id: 10,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Free Now",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "available",
  },
  {
    id: 11,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Within 1 week",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "within-week",
  },
  {
    id: 12,
    name: "Kate Morrison",
    genre: "Rock Music",
    agent: "Talent X Agency",
    location: "NY, USA",
    availability: "Free Now",
    rate: "$580 per event",
    avatar: "/client.png",
    description: "Rock Music Guitarist",
    availabilityStatus: "available",
  },
];

export default function TalentHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("Am");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(3);
  const [dayInput, setDayInput] = useState("10");
  const [monthInput, setMonthInput] = useState("02");
  const [yearInput, setYearInput] = useState("2025");

  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsDrawerOpen(true);
  };

  const handleUserIconClick = (artist: Artist, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click event
    setSelectedArtist(artist);
    setIsDrawerOpen(true);
  };

  const handleBook = () => {
    // Handle booking logic here
    console.log("Booking artist:", selectedArtist?.name);
    console.log("Date:", selectedDate);
    console.log("Time:", `${selectedHour}:${selectedMinute} ${selectedPeriod}`);
    console.log("Message:", message);
    setIsDrawerOpen(false);
  };

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(
    selectedDate?.getDate(),
    selectedDate?.getMonth(),
    selectedDate?.getFullYear()
  );

  return (
    <div className='min-h-screen bg-transparent'>
      {/* Main Content */}
      <main className='p-4 md:p-6'>
        {/* Artist Lists Header */}
        <div className='flex items-center justify-between  mb-6'>
          <h2 className='text-lg font-semibold text-[#1C1C1C] mb-4'>
            Artist lists
          </h2>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Search for artist...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10 max-w-md lg: rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500'
            />
          </div>
        </div>

        {/* Artists Table */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          {/* Table Header */}
          <div className='bg-[#235789] text-white'>
            <div className='grid grid-cols-2 md:grid-cols-7 gap-4 px-4 py-3 text-sm font-medium'>
              <div className='md:col-span-1'>Artist</div>
              <div className='hidden md:block'>Genre</div>
              <div className='hidden md:block'>Agent</div>
              <div className='hidden md:block'>Location</div>
              <div className='hidden md:block'>Availability</div>
              <div className='hidden md:block'>Price/Rate</div>
              <div className='md:col-span-1'>Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className='divide-y divide-gray-200'>
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className='grid grid-cols-2 md:grid-cols-7 gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer'
                onClick={() => handleArtistClick(artist)}
              >
                <div className='flex items-center gap-3 md:col-span-1'>
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
                  <span className='text-sm font-medium text-[#1C1C1C]'>
                    {artist.name}
                  </span>
                </div>
                <div className='hidden md:block text-sm text-[#1C1C1C]'>
                  {artist.genre}
                </div>
                <div className='hidden md:block text-sm text-[#1C1C1C]'>
                  {artist.agent}
                </div>
                <div className='hidden md:block text-sm text-[#1C1C1C]'>
                  {artist.location}
                </div>
                <div className='hidden md:block'>
                  <Badge
                    variant={
                      artist.availabilityStatus === "available"
                        ? "default"
                        : "secondary"
                    }
                    className={
                      artist.availabilityStatus === "available"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {artist.availability}
                  </Badge>
                </div>
                <div className='hidden md:block text-sm text-[#1C1C1C]'>
                  {artist.rate}
                </div>
                <div className='flex items-center gap-2 md:col-span-1'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8'
                    onClick={(e) => handleUserIconClick(artist, e)}
                  >
                    <User className='h-4 w-4' />
                  </Button>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <MessageCircle className='h-4 w-4' />
                  </Button>
                  <Button variant='ghost' size='icon' className='h-8 w-8'>
                    <ExternalLink className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-center gap-2 mt-6'>
          <Button variant='ghost' size='sm'>
            ← Previous
          </Button>
          <Button variant='ghost' size='sm'>
            1
          </Button>
          <Button variant='ghost' size='sm'>
            2
          </Button>
          <Button variant='default' size='sm'>
            3
          </Button>
          <Button variant='ghost' size='sm'>
            ...
          </Button>
          <Button variant='ghost' size='sm'>
            10
          </Button>
          <Button variant='ghost' size='sm'>
            Next →
          </Button>
        </div>
      </main>

      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction='right'
      >
        <DrawerContent className='h-full w-full max-w-md ml-auto rounded-l-lg rounded-r-none'>
          <DrawerHeader className='absolute top-0 right-2 flex items-center justify-between pb-4'>
            <DrawerTitle></DrawerTitle>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon'>
                <X className='h-4 w-4' />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          {selectedArtist && (
            <div className='p-6 space-y-6 overflow-y-auto'>
              {/* Artist Profile */}
              <div className='text-center'>
                <Avatar className='h-20 w-20 mx-auto mb-4'>
                  <AvatarImage src='/admin.png' alt='Sarah Williams' />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <h3 className='text-lg font-semibold text-[#1C1C1C]'>
                  Sarah Williams
                </h3>
                <p className='text-sm text-[#1C1C1C] mb-2'>
                  Rock Music Guitarist
                </p>
                <div className='flex items-center justify-center gap-1 text-sm text-gray-500 mb-2'>
                  <span>📍</span>
                  <span>Location: New York, USA (will free in 5 days)</span>
                </div>
                <div className='flex items-center justify-center gap-1 text-sm text-[#1C1C1C]'>
                  <span>💰</span>
                  <span>Rate: $600 per event</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className='mt-10'>
                <h4 className='text-sm font-medium text-[#1C1C1C] mb-3'>
                  Select Date
                </h4>
                {/* <div className='flex items-center gap-2 mb-4'>
                  <Input
                    type='number'
                    value={dayInput}
                    onChange={(e) => setDayInput(e.target.value)}
                    className='w-16 text-center'
                    min='1'
                    max='31'
                  />
                  <Input
                    type='number'
                    value={monthInput}
                    onChange={(e) => setMonthInput(e.target.value)}
                    className='w-16 text-center'
                    min='1'
                    max='12'
                  />
                  <Input
                    type='number'
                    value={yearInput}
                    onChange={(e) => setYearInput(e.target.value)}
                    className='w-20 text-center'
                    min='2024'
                  />
                  <span className='text-gray-400'>
                    {dayInput} {monthInput} {yearInput}
                  </span>
                </div> */}

                <div className='text-sm text-[#1C1C1C] mb-4 border-b' >
                  {selectedDate?.getDate()} / {selectedDate?.getMonth()} /{" "}
                  {selectedDate?.getFullYear()}
                </div>

                <div className='flex gap-2 mb-4'>
                  <Button variant='outline' size='sm'>
                    Today
                  </Button>
                  <Button variant='outline' size='sm'>
                    Last selection
                  </Button>
                </div>

                <CustomDayPicker
                  mode='single'
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className='w-full'
                />
              </div>

              {/* Time Selection */}
              <div>
                <h4 className='text-sm font-medium text-[#1C1C1C] mb-3'>
                  Enter Time
                </h4>
                <div className='flex items-center gap-2 mb-4'>
                  <Select value={selectedHour} onValueChange={setSelectedHour}>
                    <SelectTrigger className='w-20'>
                      <SelectValue placeholder='Hour' />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem
                          key={i + 1}
                          value={String(i + 1).padStart(2, "0")}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className='text-gray-500'>:</span>
                  <Select
                    value={selectedMinute}
                    onValueChange={setSelectedMinute}
                  >
                    <SelectTrigger className='w-20'>
                      <SelectValue placeholder='Min' />
                    </SelectTrigger>
                    <SelectContent>
                      {["00", "15", "30", "45"].map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className='flex'>
                    <Button
                      variant={selectedPeriod === "Am" ? "default" : "outline"}
                      size='sm'
                      onClick={() => setSelectedPeriod("Am")}
                      className='rounded-r-none'
                    >
                      Am
                    </Button>
                    <Button
                      variant={selectedPeriod === "Pm" ? "default" : "outline"}
                      size='sm'
                      onClick={() => setSelectedPeriod("Pm")}
                      className='rounded-l-none'
                    >
                      Pm
                    </Button>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <Textarea
                  placeholder='Message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='min-h-[80px]'
                />
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBook}
                className='w-full h-11 bg-[#235789] hover:bg-[#2072be]'
              >
                Book
              </Button>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
