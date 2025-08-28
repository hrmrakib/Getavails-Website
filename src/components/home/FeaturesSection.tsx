"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Search,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Set Up Your Profile",
    description:
      "Quickly onboard and set up a role-based profile to start using GetAvails.",
    icon: User,
    color: "blue",
    buttonText: "Start Now",
    features: [
      "Role-based onboarding (Agent, Artist, Venue, Buyer)",
      "Profile verification & approval",
      "Team & multi-user access",
      "Role-specific dashboards",
      "Custom profile fields (Genres, Availability, Location)",
    ],
  },
  {
    id: 2,
    title: "Discover Talent & Venues",
    description:
      "Browse and filter through artists, venues, and available events with smart search.",
    icon: Search,
    color: "gold",
    buttonText: "Explore Listings",
    features: [
      "Role-based onboarding (Agent, Artist, Venue, Buyer)",
      "Profile verification & approval",
      "Team & multi-user access",
      "Role-specific dashboards",
      "Custom profile fields (Genres, Availability, Location)",
    ],
  },
  {
    id: 3,
    title: "Make Offers & Inquiries",
    description:
      "Send offers, submit inquiries, and manage negotiations - all inside the platform.",
    icon: MessageSquare,
    color: "red",
    buttonText: "See How It Works",
    features: [
      "Role-based onboarding (Agent, Artist, Venue, Buyer)",
      "Profile verification & approval",
      "Team & multi-user access",
      "Role-specific dashboards",
      "Custom profile fields (Genres, Availability, Location)",
    ],
  },
];

const colorClasses = {
  blue: {
    icon: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  gold: {
    icon: "text-amber-600",
    button: "bg-amber-600 hover:bg-amber-700 text-white",
  },
  red: {
    icon: "text-red-600",
    button: "bg-red-600 hover:bg-red-700 text-white",
  },
};

export function FeaturesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-balance'>
            Your Talent Booking Journey, Simplified
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto text-pretty'>
            Lorem ipsum dolor sit amet consectetur. Dignissim maecenas molestie
            arcu sem sit sem.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className='hidden md:grid md:grid-cols-3 gap-8'>
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const colors =
              colorClasses[feature.color as keyof typeof colorClasses];

            return (
              <Card
                key={feature.id}
                className='border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow'
              >
                <CardContent className='p-0'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='p-2 rounded-lg bg-gray-50'>
                      <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900'>
                      {feature.title}
                    </h3>
                  </div>

                  <p className='text-gray-600 mb-6 text-pretty'>
                    {feature.description}
                  </p>

                  <div className='mb-8'>
                    <h4 className='font-medium text-gray-900 mb-3'>
                      Top Features:
                    </h4>
                    <ul className='space-y-2'>
                      {feature.features.map((item, index) => (
                        <li
                          key={index}
                          className='text-sm text-gray-600 flex items-start gap-2'
                        >
                          <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0' />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={`w-full ${colors.button} rounded-full py-3 font-medium`}
                  >
                    {feature.buttonText} →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className='md:hidden'>
          <div className='relative overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature) => {
                const IconComponent = feature.icon;
                const colors =
                  colorClasses[feature.color as keyof typeof colorClasses];

                return (
                  <div key={feature.id} className='w-full flex-shrink-0 px-4'>
                    <Card className='border border-gray-200 rounded-2xl p-6 bg-white shadow-sm'>
                      <CardContent className='p-0'>
                        <div className='flex items-center gap-3 mb-4'>
                          <div className='p-2 rounded-lg bg-gray-50'>
                            <IconComponent
                              className={`w-6 h-6 ${colors.icon}`}
                            />
                          </div>
                          <h3 className='text-xl font-semibold text-gray-900'>
                            {feature.title}
                          </h3>
                        </div>

                        <p className='text-gray-600 mb-6 text-pretty'>
                          {feature.description}
                        </p>

                        <div className='mb-8'>
                          <h4 className='font-medium text-gray-900 mb-3'>
                            Top Features:
                          </h4>
                          <ul className='space-y-2'>
                            {feature.features.map((item, index) => (
                              <li
                                key={index}
                                className='text-sm text-gray-600 flex items-start gap-2'
                              >
                                <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0' />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          className={`w-full ${colors.button} rounded-full py-3 font-medium`}
                        >
                          {feature.buttonText} →
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className='flex items-center justify-center gap-4 mt-8'>
            <button
              onClick={prevSlide}
              className='p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
              aria-label='Previous slide'
            >
              <ChevronLeft className='w-5 h-5 text-gray-600' />
            </button>

            <div className='flex gap-2'>
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className='p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
              aria-label='Next slide'
            >
              <ChevronRight className='w-5 h-5 text-gray-600' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
