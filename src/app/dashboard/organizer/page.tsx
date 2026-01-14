"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AgentRevenueChart from "@/components/dashboard/chart/AgentRevenueChart";
import EventChart from "@/components/dashboard/chart/EventChart";
import { useGetOrganizerOverviewQuery } from "@/redux/features/organizer/organizerAPI";

export default function DashboardPage() {
  const { data: overview } = useGetOrganizerOverviewQuery("");

  return (
    // <RoleRedirect allowedRole='ORGANIZER'>
    <div className='min-h-screen bg-transparent p-4 md:p-6'>
      {/* Main Grid */}
      <div className=' gap-6 mb-8'>
        <div className='lg:col-span-4'>
          <div className='lg:max-w-[50%] flex flex-col md:flex-row flex-wrap gap-6 mb-8'>
            {/* Revenue Card */}
            <Card className='flex-1 border-none shadow-sm bg-[#E6F0F9]'>
              <CardHeader className=''>
                <CardTitle className='text-base font-medium text-[#1E1E1E]'>
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-bold'>
                  ${overview?.data?.totalRevenue || 0}
                </p>
              </CardContent>
            </Card>
            <Card className='flex-1 border-none shadow-sm bg-[#E6F0F9]'>
              <CardHeader className=''>
                <CardTitle className='text-base font-medium text-[#1E1E1E]'>
                  Total Booked Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-bold'>
                  {overview?.data?.totalBookedTickets || 0}
                </p>
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
                <AgentRevenueChart
                  revenue={overview?.data?.monthlyRevenueStatistics}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EventChart bookings={overview?.data?.monthlyBookingStatistics} />
    </div>
    // </RoleRedirect>
  );
}
