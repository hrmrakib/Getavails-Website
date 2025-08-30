"use client";

import {
  MessageSquare,
  Calendar,
  Link,
  FileText,
  CreditCard,
  User,
} from "lucide-react";

export function CorePlatformSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Centralized Messaging",
      description:
        "Keep all your conversations in one place, across roles, gigs, and timelines - clear, fast, and searchable.",
    },
    {
      icon: Calendar,
      title: "Smart Availability Search",
      description:
        "Instantly find available artists and venues with intelligent filtering based on location, dates, and preferences.",
    },
    {
      icon: Link,
      title: "Calendar Sync",
      description:
        "Seamlessly integrate with your existing calendar systems to avoid double bookings and scheduling conflicts.",
    },
    {
      icon: FileText,
      title: "In-app Offers & Contracts",
      description:
        "Create, send, and manage offers and contracts directly within the platform with digital signature support.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment Flows",
      description:
        "Process payments safely with built-in escrow services, automated invoicing, and transparent fee structures.",
    },
    {
      icon: User,
      title: "Role-Specific Dashboards",
      description:
        "Access customized interfaces tailored to your role - whether you're an artist, agent, venue, or buyer.",
    },
  ];

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-balance'>
            One Core Platform. Shared Superpowers.
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto text-pretty'>
            No matter your role, Getavails equips you with robust tools to get
            the job done - faster, smarter, and stress-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'
              >
                <div className='flex items-center gap-3 mb-4'>
                  <div className='flex-shrink-0'>
                    <IconComponent className='h-6 w-6 text-blue-600' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    {feature.title}
                  </h3>
                </div>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
