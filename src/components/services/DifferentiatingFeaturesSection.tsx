"use client";

import {
  Shield,
  Calendar,
  Bot,
  Zap,
  FileText,
  Users,
  Globe,
  FileCheck,
  CreditCard,
  BarChart3,
  Puzzle,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Contracts",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: Calendar,
    title: "Real-Time Availability",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: Bot,
    title: "Smart AI Assistant",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: Zap,
    title: "One-Tap Offer Flow",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: FileText,
    title: "Digital Press Kits",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: Users,
    title: "Multi-Role Accounts",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: Globe,
    title: "Global Discovery Engine",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: FileCheck,
    title: "Contract Tracking",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment Gateways",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: Puzzle,
    title: "Add-On Tools",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized UX",
    description:
      "All agreements are backed with digital verification, providing security for both artists and venues before any commitment is finalized.",
  },
];

export function DifferentiatingFeaturesSection() {
  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-blue-600 mb-4'>
            What Sets GetAvails Apart
          </h2>
          <p className='text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed'>
            Not just another booking platform - every feature is crafted to
            reduce friction, increase visibility, and drive real results across
            the live entertainment industry.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200'
              >
                <div className='flex items-center gap-3 mb-4'>
                  <div className='flex-shrink-0'>
                    <IconComponent className='h-6 w-6 text-blue-600' />
                  </div>
                  <h3 className='font-semibold text-blue-600 text-lg'>
                    {feature.title}
                  </h3>
                </div>
                <p className='text-gray-600 text-sm leading-relaxed'>
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
