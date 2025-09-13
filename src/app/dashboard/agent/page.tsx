"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, TrendingUp } from "lucide-react";
import AgentRevenueChart from "@/components/dashboard/chart/AgentRevenueChart";
import EventChart from "@/components/dashboard/chart/EventChart";

// Sample artist join requests data
const initialArtistRequests = [
  {
    id: 1,
    name: "Natali Craig",
    genre: "Rock Music",
    avatar: "/client.png",
  },
  {
    id: 2,
    name: "Natali Craig",
    genre: "Rock Music",
    avatar: "/client.png",
  },
  {
    id: 3,
    name: "Natali Craig",
    genre: "Rock Music",
    avatar: "/client.png",
  },
  {
    id: 4,
    name: "Natali Craig",
    genre: "Rock Music",
    avatar: "/client.png",
  },
  {
    id: 5,
    name: "Natali Craig",
    genre: "Rock Music",
    avatar: "/client.png",
  },
  {
    id: 6,
    name: "Natali Craig",
    genre: "Rock Music",
    avatar: "/client.png",
  },
];

export default function DashboardPage() {
  const [revenueView, setRevenueView] = useState<"total" | "yearly">("total");
  const [bookingsView, setBookingsView] = useState<"total" | "yearly">(
    "yearly"
  );
  const [artistView, setArtistView] = useState<"total" | "yearly">("total");
  const [artistRequests, setArtistRequests] = useState(initialArtistRequests);

  const handleApproveArtist = (id: number) => {
    setArtistRequests((prev) => prev.filter((artist) => artist.id !== id));
    // In a real app, you would make an API call here
    console.log(`Approved artist with id: ${id}`);
  };

  const handleRejectArtist = (id: number) => {
    setArtistRequests((prev) => prev.filter((artist) => artist.id !== id));
    // In a real app, you would make an API call here
    console.log(`Rejected artist with id: ${id}`);
  };

  // Function to get data based on view type
  const getRevenueData = () => {
    if (revenueView === "total") {
      return { value: "$16,249", change: "+11.02%" };
    } else {
      return { value: "$142,890", change: "+8.24%" };
    }
  };

  const getBookingsData = () => {
    if (bookingsView === "total") {
      return { value: "18,742", change: "+9.15%" };
    } else {
      return { value: "16,249", change: "+11.02%" };
    }
  };

  const getArtistData = () => {
    if (artistView === "total") {
      return { value: "16,249", change: "+5.30%" };
    } else {
      return { value: "14,820", change: "+12.45%" };
    }
  };

  const revenueData = getRevenueData();
  const bookingsData = getBookingsData();
  const artistData = getArtistData();

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6'>
      {/* Main Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8'>
        <div className='lg:col-span-4'>
          <div className='flex gap-6 mb-8'>
            {/* Revenue Card */}
            <Card className='flex-1 border-none shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base font-medium text-[#1E1E1E]'>
                  Revenue
                </CardTitle>
                <div className='flex gap-1 mt-2 bg-gray-100 p-1 rounded-full'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`flex-1 h-8 px-3 text-xs transition-all rounded-full ${
                      revenueView === "total"
                        ? "bg-[#235789] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setRevenueView("total")}
                  >
                    Total
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`flex-1 h-8 px-3 text-xs transition-all rounded-full ${
                      revenueView === "yearly"
                        ? "bg-[#235789] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setRevenueView("yearly")}
                  >
                    Yearly
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold'>{revenueData.value}</div>
                <div className='flex items-center gap-1 text-sm text-green-600 mt-1'>
                  <TrendingUp className='h-3 w-3' />
                  {revenueData.change}
                </div>
              </CardContent>
            </Card>

            {/* Total Bookings Card */}
            <Card className='flex-1 border-none shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base font-medium text-[#1E1E1E]'>
                  Total Bookings (2024)
                </CardTitle>
                <div className='flex gap-1 mt-2 bg-gray-100 p-1 rounded-full'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`flex-1 h-8 px-3 text-xs transition-all rounded-full ${
                      bookingsView === "total"
                        ? "bg-[#235789] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setBookingsView("total")}
                  >
                    Total
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`flex-1 h-8 px-3 text-xs transition-all rounded-full ${
                      bookingsView === "yearly"
                        ? "bg-[#235789] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setBookingsView("yearly")}
                  >
                    Yearly
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold'>{bookingsData.value}</div>
                <div className='flex items-center gap-1 text-sm text-green-600 mt-1'>
                  <TrendingUp className='h-3 w-3' />
                  {bookingsData.change}
                </div>
              </CardContent>
            </Card>

            {/* Total Artist Management Card */}
            <Card className='flex-1 border-none shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base font-medium text-[#1E1E1E]'>
                  Total Artist Management
                </CardTitle>
                <div className='flex gap-1 mt-2 bg-gray-100 p-1 rounded-full'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`flex-1 h-8 px-3 text-xs transition-all rounded-full ${
                      artistView === "total"
                        ? "bg-[#235789] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setArtistView("total")}
                  >
                    Total
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`flex-1 h-8 px-3 text-xs transition-all rounded-full ${
                      artistView === "yearly"
                        ? "bg-[#235789] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setArtistView("yearly")}
                  >
                    Yearly
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold mb-2'>
                  {artistData.value}
                </div>
                <div className='flex items-center gap-1 text-sm text-green-600 mb-4'>
                  <TrendingUp className='h-3 w-3' />
                  {artistData.change}
                </div>
                <Button className='w-full bg-[#235789] hover:bg-[#1e4a73] text-white'>
                  View All
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Over Time Chart */}
          <Card className='lg:col-span-4 !border-none'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                Revenue Over Time
              </CardTitle>
              <div className='flex items-center gap-4 text-sm'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 bg-black rounded-full'></div>
                  <span>This year</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 bg-blue-300 rounded-full'></div>
                  <span>Last year</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className='!border-none'>
              <div className='h-80 w-full'>
                <AgentRevenueChart />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Artist Join Requests Card */}
        <Card className='lg:col-span-1 !border-none shadow-sm'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base font-medium text-[#1E1E1E]'>
              Artist Join Requests
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {artistRequests.map((artist) => (
              <div
                key={artist.id}
                className='flex items-center justify-between'
              >
                <div className='flex items-center gap-3'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage
                      src={artist.avatar || "/placeholder.svg"}
                      alt={artist.name}
                    />
                    <AvatarFallback>NC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='text-sm font-medium text-[#222222]'>
                      {artist.name}
                    </div>
                    <div className='text-xs text-[#6B7280]'>{artist.genre}</div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <Button
                    size='sm'
                    className='h-6 w-6 p-0 bg-[#00AF1A] hover:bg-green-600'
                    onClick={() => handleApproveArtist(artist.id)}
                  >
                    <Check className='h-3 w-3' />
                  </Button>
                  <Button
                    size='sm'
                    variant='destructive'
                    className='h-6 w-6 p-0 !bg-[#E00101]'
                    onClick={() => handleRejectArtist(artist.id)}
                  >
                    <X className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <EventChart />
    </div>
  );
}
