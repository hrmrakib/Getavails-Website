/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import EventChart from "@/components/dashboard/chart/EventChart";
import PaymentStatics from "@/components/dashboard/chart/PaymentStatics";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  isNegative = false,
}: {
  title: string;
  value: string;
  icon: any;
  change?: string;
  isNegative?: boolean;
}) => (
  <Card className='bg-[#E6F0F9] border-0 shadow-sm'>
    <CardContent className='py-4'>
      <div className='flex items-end justify-between gap-4'>
        <div>
          <p className='text-base font-medium text-[#222222] mb-1'>{title}</p>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
        </div>

        <div className='p-3 flex items-center gap-2 text-sm text-[#222222] rounded-full'>
          <p>+11.02%</p>
          <svg
            width='17'
            height='16'
            viewBox='0 0 17 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M9.12187 5.60777L14.667 4L13.2868 9.6061L11.565 7.9532L8.78769 10.8463C8.6934 10.9445 8.56314 11 8.42699 11C8.29085 11 8.16059 10.9445 8.0663 10.8463L6.02699 8.72199L3.02769 11.8463C2.83645 12.0455 2.51993 12.0519 2.32073 11.8607C2.12152 11.6695 2.11506 11.3529 2.3063 11.1537L5.6663 7.65373C5.76059 7.55552 5.89085 7.5 6.02699 7.5C6.16314 7.5 6.2934 7.55552 6.38769 7.65373L8.42699 9.77801L10.8436 7.26067L9.12187 5.60777Z'
              fill='#1C1C1C'
            />
          </svg>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  return (
    <div className='min-h-screen bg-transparent'>
      {/* Main Content */}
      <div className='py-8'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard title='Total Revenue' value='$235.5' icon={BarChart3} />
          <StatCard
            title="Today's Revenue"
            value='$235.5'
            icon={BarChart3}
            change='13%'
            isNegative={true}
          />
          <StatCard title='Total User' value='230' icon={Users} />
          <StatCard
            title="Today's New User"
            value='12'
            icon={Users}
            change='13%'
            isNegative={true}
          />
        </div>

        {/* Chart Section */}
        <PaymentStatics />

        <div>
          <EventChart />
        </div>
      </div>
    </div>
  );
}
