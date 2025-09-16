"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import AgentRevenueChart from "@/components/dashboard/chart/AgentRevenueChart";
import EventChart from "@/components/dashboard/chart/EventChart";

export default function DashboardPage() {
  const [revenueView, setRevenueView] = useState<"total" | "yearly">("total");
  const [bookingsView, setBookingsView] = useState<"total" | "yearly">(
    "yearly"
  );

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

  const revenueData = getRevenueData();
  const bookingsData = getBookingsData();

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-6'>
      {/* Main Grid */}
      <div className=' gap-6 mb-8'>
        <div className='lg:col-span-4'>
          <div className='lg:max-w-[80%] flex flex-wrap gap-6 mb-8'>
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
                <CardTitle className='text-base font-medium text-[#1E1E1E] flex items-center gap-3'>
                  <svg
                    width='15'
                    height='20'
                    viewBox='0 0 15 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.5 0C8.35248 0 9.17005 0.332706 9.77284 0.924926C10.3756 1.51715 10.7143 2.32037 10.7143 3.15789V9.47368C10.7143 10.3112 10.3756 11.1144 9.77284 11.7067C9.17005 12.2989 8.35248 12.6316 7.5 12.6316C6.64752 12.6316 5.82995 12.2989 5.22716 11.7067C4.62436 11.1144 4.28571 10.3112 4.28571 9.47368V3.15789C4.28571 2.32037 4.62436 1.51715 5.22716 0.924926C5.82995 0.332706 6.64752 0 7.5 0ZM15 9.47368C15 13.1895 12.2036 16.2526 8.57143 16.7684V20H6.42857V16.7684C2.79643 16.2526 0 13.1895 0 9.47368H2.14286C2.14286 10.8696 2.70727 12.2083 3.71193 13.1953C4.71659 14.1823 6.0792 14.7368 7.5 14.7368C8.9208 14.7368 10.2834 14.1823 11.2881 13.1953C12.2927 12.2083 12.8571 10.8696 12.8571 9.47368H15Z'
                      fill='#1E1E1E'
                    />
                  </svg>
                  <span>Upcoming Event</span>
                </CardTitle>
                <ul
                  role='list'
                  className='mt-2 p-1 list-disc list-inside marker:text-slate-800 space-y-1'
                >
                  <li>Aug 25 · BlueNote Jazz Club, NY</li>
                  <li>Sep 02 · The Roxy, LA</li>
                </ul>
              </CardHeader>

              <CardContent>
                <Button className='w-full bg-[#DFEBF7] hover:bg-[#DFEBF7] text-[#235789]'>
                  View All Bookings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Over Time Chart */}
          <Card className='!border-none'>
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
      </div>

      <EventChart />
    </div>
  );
}
