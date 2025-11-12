/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const defaultRevenueData = [
  { month: "Jan", revenue: 0 },
  { month: "Feb", revenue: 0 },
  { month: "Mar", revenue: 0 },
  { month: "Apr", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "Jun", revenue: 0 },
  { month: "Jul", revenue: 0 },
  { month: "Aug", revenue: 0 },
  { month: "Sep", revenue: 0 },
  { month: "Oct", revenue: 0 },
  { month: "Nov", revenue: 0 },
  { month: "Dec", revenue: 0 },
];

const formatChartValue = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg'>
        <p className='text-sm font-medium'>{formatNumber(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

interface RevenueData {
  month: string;
  revenue: number;
}

export default function AgentRevenueChart({
  revenue = defaultRevenueData,
}: {
  revenue?: RevenueData[];
}) {
  return (
    <div className='h-80 w-full border-none'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={revenue}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
          <XAxis
            dataKey='month'
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#666" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#666" }}
            tickFormatter={formatChartValue}
            domain={[0, "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type='monotone'
            dataKey='revenue'
            stroke='#2563eb'
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
