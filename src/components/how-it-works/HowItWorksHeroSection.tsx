"use client";

import { User, Search, FileText, Rocket } from "lucide-react";

export function HowItWorksHeroSection() {
  const steps = [
    {
      icon: User,
      title: "Select Your Role",
      description:
        "Choose whether you're an Artist, Agent, Venue, or Talent Buyer to personalize your experience.",
    },
    {
      icon: Search,
      title: "Search & Discover",
      description:
        "Find artists, venues, or agents by availability, genre, location, or preference.",
    },
    {
      icon: FileText,
      title: "Send Offers & Collaborate",
      description:
        "Initiate or receive offers, negotiate details, and draft contracts, all in one place.",
    },
    {
      icon: Rocket,
      title: "Book, Sign & Go Live",
      description:
        "Confirm details, manage payments, and prep for showtime - no messy threads or scattered tools.",
    },
  ];

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-6 text-balance'>
            Your Booking Journey, Simplified
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-4xl mx-auto text-pretty'>
            From search to signed contracts, discover how Getavails connects
            Artists, Agents, Venues, and Buyers in a single, seamless flow.
          </p>
        </div>

        {/* Process Steps */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300'
              >
                <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4'>
                  <IconComponent className='w-6 h-6 text-blue-600' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {step.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
