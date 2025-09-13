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

// Sample data for the revenue chart
const chartData = [
  { month: "Jan", thisYear: 8000000, lastYear: 6000000 },
  { month: "Feb", thisYear: 12000000, lastYear: 8000000 },
  { month: "Mar", thisYear: 15000000, lastYear: 12000000 },
  { month: "Apr", thisYear: 8000000, lastYear: 15000000 },
  { month: "May", thisYear: 6000000, lastYear: 10000000 },
  { month: "Jun", thisYear: 18000000, lastYear: 8000000 },
  { month: "Jul", thisYear: 20000000, lastYear: 16000000 },
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg'>
        <p className='text-sm font-medium'>{formatNumber(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function AgentRevenueChart() {
  return (
    <div className='h-80 w-full !border-none'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={chartData}
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
            domain={[0, 30000000]}
            ticks={[0, 10000000, 20000000, 30000000]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type='monotone'
            dataKey='thisYear'
            stroke='#000000'
            strokeWidth={2}
            dot={false}
            strokeDasharray='5 5'
          />
          <Line
            type='monotone'
            dataKey='lastYear'
            stroke='#93c5fd'
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
