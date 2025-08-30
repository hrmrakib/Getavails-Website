"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function ServicesHeroSection() {
  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <div className='grid lg:grid-cols-2 gap-12 items-center'>
        {/* Left side - Image */}
        <div className='order-2 lg:order-1'>
          <div className='relative rounded-2xl overflow-hidden'>
            <Image
              src='/services-hero-saxophone.png'
              alt='Saxophone player performing with dramatic purple stage lighting'
              width={600}
              height={400}
              className='w-full h-auto object-cover'
              priority
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className='order-1 lg:order-2 space-y-6'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight text-balance'>
            From Search to Signature, We&apos;re With You.
          </h1>

          <p className='text-lg text-gray-600 leading-relaxed max-w-2xl'>
            Discover how Getavails helps Artists, Agents, Venues, and Talent
            Buyers streamline every part of the booking and management process.
          </p>

          <div className='pt-4'>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105'
            >
              Explore Role-Based Services
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
