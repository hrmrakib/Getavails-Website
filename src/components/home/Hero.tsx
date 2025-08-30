"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  MapPinIcon,
  SearchIcon,
  ArrowRightIcon,
} from "lucide-react";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleSearch = () => {
    console.log("[v0] Search triggered:", { searchQuery, location, dateRange });
    // Implement search functionality here
  };

  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      <div className='container mx-auto flex items-center justify-between gap-20'>
        {/* Left side - Content */}
        <div className='w-full lg:w-1/2 flex items-center justify-center'>
          <div className='w-full space-y-8'>
            {/* Main heading */}
            <div className='space-y-4'>
              <h1 className='text-4xl lg:text-5xl xl:text-[48px] font-bold text-[#1E1E1E] leading-tight text-balance mb-8'>
                Smarter Talent Booking, All in One Place
              </h1>
              <p className='max-w-[550px] text-lg lg:text-xl text-[#6B7280] leading-relaxed text-pretty'>
                The all-in-one platform for agents, artists, venues, and buyers
                to search, book, and grow - smarter and faster.
              </p>
            </div>

            {/* Start Exploring button */}
            <div>
              <Button
                size='lg'
                className='bg-[#235789] hover:bg-[#235889d0] text-white !px-8 !py-6 rounded-full text-lg font-medium cursor-pointer'
              >
                Start Exploring
                <ArrowRightIcon className='ml-2 h-5 w-5' />
              </Button>
            </div>

            {/* Search form */}
            <div className='bg-white border border-[#1E1E1ECC] rounded-2xl p-6 shadow-sm space-y-8'>
              {/* Search for Artists dropdown */}
              <div className='space-y-2'>
                <Select>
                  <SelectTrigger className='w-full !h-12 text-[#6B7280] border border-[#1E1E1E33] bg-transparent rounded-3xl'>
                    <SelectValue
                      className='text-base'
                      placeholder='Search for Artists'
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='musicians'>Musicians</SelectItem>
                    <SelectItem value='bands'>Bands</SelectItem>
                    <SelectItem value='djs'>DJs</SelectItem>
                    <SelectItem value='comedians'>Comedians</SelectItem>
                    <SelectItem value='speakers'>Speakers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location and Date inputs */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='relative'>
                  <MapPinIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    placeholder='Select Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className='!h-12 pl-10 text-[#6B7280] border border-[#1E1E1E33] bg-transparent rounded-3xl placeholder:text-[#6B7280]'
                  />
                </div>
                <div className='relative'>
                  <CalendarIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    type='date'
                    placeholder='Select Date Range'
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className='!h-12 pl-10 text-[#6B7280] border border-[#1E1E1E33] bg-transparent rounded-3xl placeholder:text-[#6B7280]'
                  />
                </div>
              </div>

              {/* Search button */}
              <Button
                onClick={handleSearch}
                className='w-full h-12 bg-[#1E1E1E] hover:bg-gray-800 text-white rounded-3xl font-medium cursor-pointer'
              >
                <SearchIcon className='mr-2 h-5 w-5' />
                Search Availability
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Concert image */}
        <div className='w-full lg:w-1/2 relative h-[600px]'>
          <video
            src='/hero.mp4'
            // autoPlay
            // loop
            // muted
            className='w-full min-h-full object-cover rounded-3xl'
          ></video>
        </div>
      </div>
    </div>
  );
}
