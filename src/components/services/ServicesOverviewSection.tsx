"use client";

import { Mic, Users, Building, Handshake } from "lucide-react";

export function ServicesOverviewSection() {
  const services = [
    {
      icon: Mic,
      title: "Artist Services",
      features: [
        "Find and pitch venues with availability filters.",
        "Manage a professional, shareable artist profile.",
        "Review incoming offers + accept/decline with a click.",
        "Track contracts and payments.",
      ],
    },
    {
      icon: Users,
      title: "Agent Services",
      features: [
        "Manage multiple artists with centralized tools.",
        "Submit offers to venues on behalf of talent.",
        "View analytics on booking history and engagement.",
        "Track contracts and payments.",
      ],
    },
    {
      icon: Building,
      title: "Venue Services",
      features: [
        "Manage multiple artists with centralized tools.",
        "Submit offers to venues on behalf of talent.",
        "View analytics on booking history and engagement.",
        "Track contracts and payments.",
      ],
    },
    {
      icon: Handshake,
      title: "Talent Buyer Services",
      features: [
        "Manage multiple artists with centralized tools.",
        "Submit offers to venues on behalf of talent.",
        "View analytics on booking history and engagement.",
        "Track contracts and payments.",
      ],
    },
  ];

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className='bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300'
            >
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-8 text-blue-600 flex-shrink-0'>
                  <IconComponent className='w-full h-full' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {service.title}
                </h3>
              </div>

              <ul className='space-y-2'>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-start gap-2'>
                    <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0' />
                    <span className='text-sm text-gray-600 leading-relaxed'>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
