"use client";

import Image from "next/image";

export default function FeatureHeroSection() {
  return (
    <section className='py-8 lg:py-16 px-4 bg-white'>
      <div className='container mx-auto'>
        <div className='grid lg:grid-cols-2 gap-6 lg:gap-24'>
          {/* Image */}
          <div className=''>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden'>
              <Image
                src='/feature-hero.png'
                alt='Musicians performing on stage with instruments and stage lighting'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
          </div>

          {/* Content */}
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-4xl lg:text-5xl font-medium text-[#235789] leading-tight'>
                <span>Powerful Features Built</span>
                <br />
                for Artists, Agents,
                <br />
                Venues & Buyers
              </h2>
              <p className='text-lg text-[#6B7280] leading-relaxed'>
                Whether you&apos;re booking talent or managing your own gigs,
                Getavails has everything you need.
              </p>
            </div>

            {/* Feature Item */}
            <div className='space-y-4'>
              <div className=''>
                <div className='flex items-start mb-3'>
                  <div className='w-2 h-2 bg-[#235789] rounded-full mt-3 flex-shrink-0 mr-3'></div>
                  <h3 className='text-xl font-semibold text-[#235789]'>
                    Search Availabilities
                  </h3>
                </div>
                <p className='text-[#6B7280] text-lg leading-relaxed'>
                  With the Free plan, users can initiate basic availability
                  searches for artists or venues once per day, ideal for casual
                  browsing or early-stage planning. Premium users unlock
                  unlimited searches, empowering faster booking cycles and
                  broader discovery potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
