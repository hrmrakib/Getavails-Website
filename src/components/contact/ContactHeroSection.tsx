"use client";

import Image from "next/image";

export function ContactHeroSection() {
  return (
    <section className='relative w-full py-20 md:py-32'>
      <div className='container mx-auto px-4'>
        <div className='relative rounded-2xl overflow-hidden'>
          {/* Background Image */}
          <div className='absolute inset-0'>
            <Image
              src='/contact-hero-musician.png'
              alt='Musician performing with acoustic guitar'
              fill
              className='object-cover'
              priority
            />
            {/* Dark overlay for text readability */}
            <div className='absolute inset-0 bg-black/60' />
          </div>

          {/* Content */}
          <div className='relative z-10 flex items-center justify-center min-h-[400px] md:min-h-[500px] px-6 md:px-12 py-16 md:py-24'>
            <div className='text-center max-w-4xl'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance'>
                We&apos;d Love to Hear from You!
              </h1>
              <p className='text-lg md:text-xl text-gray-200 max-w-2xl mx-auto text-pretty'>
                Our team is ready to answer your questions, discuss
                opportunities, or walk you through how GetAvails works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
