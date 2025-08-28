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
      {/* Left side - Content */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 xl:p-16'>
        <div className='w-full max-w-lg space-y-8'>
          {/* Main heading */}
          <div className='space-y-4'>
            <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight text-balance'>
              Smarter Talent Booking,{" "}
              <span className='block'>All in One Place</span>
            </h1>
            <p className='text-lg lg:text-xl text-gray-600 leading-relaxed text-pretty'>
              The all-in-one platform for agents, artists, venues, and buyers to
              search, book, and grow - smarter and faster.
            </p>
          </div>

          {/* Start Exploring button */}
          <div>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium'
            >
              Start Exploring
              <ArrowRightIcon className='ml-2 h-5 w-5' />
            </Button>
          </div>

          {/* Search form */}
          <div className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4'>
            {/* Search for Artists dropdown */}
            <div className='space-y-2'>
              <Select>
                <SelectTrigger className='w-full h-12 text-gray-500 border-0 bg-gray-50 rounded-lg'>
                  <SelectValue placeholder='Search for Artists' />
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
                  className='h-12 pl-10 border-0 bg-gray-50 rounded-lg text-gray-700 placeholder:text-gray-500'
                />
              </div>
              <div className='relative'>
                <CalendarIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  placeholder='Select Date Range'
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className='h-12 pl-10 border-0 bg-gray-50 rounded-lg text-gray-700 placeholder:text-gray-500'
                />
              </div>
            </div>

            {/* Search button */}
            <Button
              onClick={handleSearch}
              className='w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium'
            >
              <SearchIcon className='mr-2 h-5 w-5' />
              Search Availability
            </Button>
          </div>
        </div>
      </div>

      {/* Right side - Concert image */}
      <div className='w-full lg:w-1/2 relative min-h-[400px] lg:min-h-screen'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat rounded-l-3xl lg:rounded-l-none'
          style={{
            backgroundImage: "url('/hero-concert.png')",
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-l-3xl lg:rounded-l-none' />
      </div>
    </div>
  );
}
