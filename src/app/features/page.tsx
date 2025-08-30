"use client";

import Image from "next/image";

export default function FeatureHighlightSection() {
  return (
    <section className='py-16 px-4 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Image */}
          <div className='order-2 lg:order-1'>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden'>
              <Image
                src='/musicians-performance.png'
                alt='Musicians performing on stage with instruments and stage lighting'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
          </div>

          {/* Content */}
          <div className='order-1 lg:order-2 space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                <span className='text-blue-600'>Powerful Features Built</span>
                <br />
                for Artists, Agents,
                <br />
                Venues & Buyers
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Whether you&apos;re booking talent or managing your own gigs,
                Getavails has everything you need.
              </p>
            </div>

            {/* Feature Item */}
            <div className='space-y-4'>
              <div className='flex items-start gap-4'>
                <div className='w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0'></div>
                <div className='space-y-3'>
                  <h3 className='text-xl font-semibold text-blue-600'>
                    Search Availabilities
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    With the Free plan, users can initiate basic availability
                    searches for artists or venues once per day, ideal for
                    casual browsing or early-stage planning. Premium users
                    unlock unlimited searches, empowering faster booking cycles
                    and broader discovery potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
