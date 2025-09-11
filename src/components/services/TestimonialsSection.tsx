"use client";

import TestimonialCard from "./TestimonialCard";
import Marquee from "react-fast-marquee";

const statistics = [
  { number: "1,200+", label: "Venues" },
  { number: "4,500+", label: "Artists" },
  { number: "30K+", label: "Bookings Facilitated" },
];

export function TestimonialsSection() {
  return (
    <section className='py-16 lg:py-28 px-4 bg-gray-50'>
      <div className='container mx-auto'>
        {/* Header */}
        <div className='text-center mb-12 lg:mb-24'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#235789] mb-4'>
            Trusted by Top Artists, Venues & Agents Worldwide
          </h2>
          <p className='text-lg text-[#6B7280] max-w-[690px] mx-auto leading-relaxed'>
            From stadium-filling performers to intimate venues, our network
            spans every corner of the entertainment industry.
          </p>
        </div>

        {/* Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 lg:mb-24 text-center'>
          {statistics.map((stat, index) => (
            <div key={index} className='space-y-2'>
              <div className='text-3xl lg:text-4xl font-bold text-[#1E1E1E]'>
                {stat.number}
              </div>
              <div className='text-lg lg:text-2xl text-[#6B7280]'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Marquee speed={50} gradient={false}>
        <TestimonialCard />
      </Marquee>

      <Marquee speed={60} gradient={false} direction='right'>
        <TestimonialCard />
      </Marquee>
    </section>
  );
}
