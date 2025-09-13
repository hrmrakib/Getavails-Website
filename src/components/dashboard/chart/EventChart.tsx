"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", value: 22000, color: "#3b82f6" },
  { month: "Feb", value: 28000, color: "#10b981" },
  { month: "Mar", value: 25000, color: "#000" },
  { month: "Apr", value: 30000, color: "#7dd3fc" },
  { month: "May", value: 24000, color: "#93c5fd" },
  { month: "Jun", value: 27000, color: "#10b981" },
  { month: "Jul", value: 23000, color: "#3b82f6" },
  { month: "Aug", value: 29000, color: "#10b981" },
  { month: "Sep", value: 26000, color: "#1f2937" },
  { month: "Oct", value: 31000, color: "#7dd3fc" },
  { month: "Nov", value: 25000, color: "#93c5fd" },
  { month: "Dec", value: 28000, color: "#10b981" },
];

export default function EventChart() {
  return (
    <Card className='!border-none'>
      <CardHeader>
        <CardTitle className='text-2xl lg:text-4xl font-semibold text-[#1C1C1C]'>
          Event Completed This Year
        </CardTitle>
      </CardHeader>
      <CardContent className='pb-4'>
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <XAxis
                dataKey='month'
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                }}
                formatter={(value: number) => [
                  `${value.toLocaleString()}`,
                  "Events",
                ]}
              />
              <Bar dataKey='value' radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
