"use client";

import {
  Users,
  Search,
  Settings,
  Handshake,
  Plane,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title:
      "Build a tailored profile experience for your role. Whether managing artists, listing venues, or booking talent, Getavails makes it seamless to create and maintain detailed profiles.",
    features: [
      "Personalized onboarding by role (Agent, Artist, Venue, Buyer)",
      "Artist claiming and management by agents",
      "Venue profiles with dynamic availability calendar",
      "Buyer profiles with saved preferences and inquiry management",
    ],
  },
  {
    icon: Search,
    title:
      "Find the perfect match with advanced search tools. Instantly explore artists and venues using smart filters, availability insights, and data-driven recommendations tailored to your needs.",
    features: [
      "Personalized onboarding by role (Agent, Artist, Venue, Buyer)",
      "Artist claiming and management by agents",
      "Venue profiles with dynamic availability calendar",
      "Buyer profiles with saved preferences and inquiry management",
    ],
  },
  {
    icon: Settings,
    title:
      "Plan smarter with AI-powered suggestions. Get automated recommendations for artist bookings, venue pairings, tour routing, and more, driven by real-time industry data and trends.",
    features: [
      "Personalized onboarding by role (Agent, Artist, Venue, Buyer)",
      "Artist claiming and management by agents",
      "Venue profiles with dynamic availability calendar",
      "Buyer profiles with saved preferences and inquiry management",
    ],
  },
  {
    icon: Handshake,
    title:
      "Streamline your booking process by managing offers, tracking status, and confirming deals - all within a unified platform built to optimize efficiency and transparency.",
    features: [
      "Personalized onboarding by role (Agent, Artist, Venue, Buyer)",
      "Artist claiming and management by agents",
      "Venue profiles with dynamic availability calendar",
      "Buyer profiles with saved preferences and inquiry management",
    ],
  },
  {
    icon: Plane,
    title:
      "Simplify event logistics with integrated travel and hotel planning. Manage itineraries, book accommodations, and coordinate travel details directly through your Getavails dashboard.",
    features: [
      "Personalized onboarding by role (Agent, Artist, Venue, Buyer)",
      "Artist claiming and management by agents",
      "Venue profiles with dynamic availability calendar",
      "Buyer profiles with saved preferences and inquiry management",
    ],
  },
  {
    icon: MessageSquare,
    title:
      "Enhance collaboration with built-in messaging and AI chat support. Communicate seamlessly with agents, venues, and artists to keep deals moving and events on track.",
    features: [
      "Personalized onboarding by role (Agent, Artist, Venue, Buyer)",
      "Artist claiming and management by agents",
      "Venue profiles with dynamic availability calendar",
      "Buyer profiles with saved preferences and inquiry management",
    ],
  },
];

export function ComprehensiveFeaturesSection() {
  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance'>
            Everything You Need to Book, Manage, and Grow
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto text-pretty'>
            Lorem ipsum dolor sit amet consectetur. Dignissim maecenas molestie
            arcu sem sit sem.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className='bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300'
              >
                {/* Icon */}
                <div className='mb-6'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <IconComponent className='w-6 h-6 text-blue-600' />
                  </div>
                </div>

                {/* Description */}
                <p className='text-gray-700 mb-6 leading-relaxed text-pretty'>
                  {feature.title}
                </p>

                {/* Features List */}
                <div>
                  <h4 className='text-sm font-semibold text-gray-900 mb-3'>
                    Features:
                  </h4>
                  <ul className='space-y-2'>
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className='flex items-start gap-2'>
                        <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0' />
                        <span className='text-sm text-gray-600 leading-relaxed'>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
