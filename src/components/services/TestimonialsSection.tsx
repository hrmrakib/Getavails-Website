"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const statistics = [
  { number: "1,200+", label: "Venues" },
  { number: "4,500+", label: "Artists" },
  { number: "30K+", label: "Bookings Facilitated" },
];

const testimonials = [
  {
    id: 1,
    name: "Darren Fields",
    role: "Indie Artist",
    avatar: "/indie-artist-male.png",
    rating: 5,
    text: "The platform connects me with venues I never thought I'd have access to.",
  },
  {
    id: 2,
    name: "Rachel Kim",
    role: "Talent Manager",
    avatar: "/talent-manager-female.png",
    rating: 5,
    text: "Finally, one dashboard to manage all my bookings and payments - it's a lifesaver.",
  },
  {
    id: 3,
    name: "Sophie Turner",
    role: "Venue Owner",
    avatar: "/venue-owner-female.png",
    rating: 5,
    text: "GetAvails bridges the gap between talent and opportunities, and it works flawlessly.",
  },
  {
    id: 4,
    name: "Ethan Brooks",
    role: "Artist",
    avatar: "/artist-male.png",
    rating: 5,
    text: "I used to juggle multiple apps. Now I just log in to GetAvails and everything's in one place.",
  },
  {
    id: 5,
    name: "Maya Patel",
    role: "Event Coordinator",
    avatar: "/event-coordinator-female.png",
    rating: 5,
    text: "The booking process is so streamlined now. What used to take weeks now takes days.",
  },
  {
    id: 6,
    name: "Alex Chen",
    role: "Music Producer",
    avatar: "/music-producer-male.png",
    rating: 5,
    text: "GetAvails has revolutionized how I connect artists with the right opportunities.",
  },
];

export function TestimonialsSection() {
  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center'>
          {statistics.map((stat, index) => (
            <div key={index} className='space-y-2'>
              <div className='text-4xl md:text-5xl font-bold text-gray-900'>
                {stat.number}
              </div>
              <div className='text-lg text-gray-600'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'
            >
              {/* Rating */}
              <div className='flex items-center mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-4 h-4 fill-blue-500 text-blue-500'
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className='text-gray-700 mb-4 leading-relaxed'>
                {testimonial.text}
              </p>

              {/* User Info */}
              <div className='flex items-center'>
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className='w-10 h-10 rounded-full mr-3'
                  width={40}
                  height={40}
                />
                <div>
                  <div className='font-semibold text-gray-900'>
                    {testimonial.name}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
