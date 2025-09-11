"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Search,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "secondary" | "destructive";
  cardStyle: string;
  color?: string;
}

const journeySteps: JourneyStep[] = [
  {
    id: "profile",
    title: "Set Up Your Profile",
    description:
      "Quickly onboard and set up a role-based profile to start using Getavails.",
    icon: <User className='w-8 h-8' />,
    features: [
      "Role-based onboarding (Agent, Artist, Venue, Buyer)",
      "Profile verification & approval",
      "Team & multi-user access",
      "Role-specific dashboards",
      "Custom profile fields (Genres, Availability, Location)",
    ],
    buttonText: "Start Now",
    buttonVariant: "default",
    cardStyle: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
  },
  {
    id: "discover",
    title: "Discover Talent & Venues",
    description:
      "Browse and filter through artists, venues, and available events with smart search.",
    icon: <Search className='w-8 h-8' />,
    features: [
      "Role-based onboarding (Agent, Artist, Venue, Buyer)",
      "Profile verification & approval",
      "Team & multi-user access",
      "Role-specific dashboards",
      "Custom profile fields (Genres, Availability, Location)",
    ],
    buttonText: "Explore Listings",
    buttonVariant: "secondary",
    cardStyle: "bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200",
  },
  {
    id: "offers",
    title: "Make Offers & Inquiries",
    description:
      "Send offers, submit inquiries, and manage negotiations - all inside the platform.",
    icon: <MessageSquare className='w-8 h-8' />,
    features: [
      "Role-based onboarding (Agent, Artist, Venue, Buyer)",
      "Profile verification & approval",
      "Team & multi-user access",
      "Role-specific dashboards",
      "Custom profile fields (Genres, Availability, Location)",
    ],
    buttonText: "See How It Works",
    buttonVariant: "destructive",
    cardStyle: "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
  },
];

export function FeaturesSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % journeySteps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % journeySteps.length);
    setIsAutoPlaying(false);
  };

  const prevStep = () => {
    setCurrentStep(
      (prev) => (prev - 1 + journeySteps.length) % journeySteps.length
    );
    setIsAutoPlaying(false);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className='w-full container mx-auto px-4 py-8 md:py-16'>
      {/* Header */}
      <div className='text-center mb-12 md:mb-16'>
        <h1 className='text-3xl md:text-4xl font-bold text-[#235789] mb-4 text-balance'>
          Your Talent Booking Journey, Simplified
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty'>
          Everything you need to onboard, discover talent, and make offers in
          one flow.
        </p>
      </div>

      {/* Desktop View - Three Cards */}
      <div className='hidden lg:grid lg:grid-cols-3 gap-12 mb-8'>
        {journeySteps.map((step, index) => (
          <Card
            key={step.id}
            className={cn(
              "bg-transparent relative overflow-hidden transition-all duration-300 hover:shadow-lg",
              (index === 0 && "border border-[#235789]") ||
                (index === 1 && "border border-[#A88F4E]") ||
                (index === 2 && "border border-[#C1292E]")
            )}
          >
            <CardContent className='p-6 h-full flex flex-col'>
              <div className='flex items-center gap-3 mb-4'>
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    index === 0 && "text-[#235789]",
                    index === 1 && "text-[#A88F4E]",
                    index === 2 && "text-[#C1292E]"
                  )}
                >
                  {step.icon}
                </div>
                <h3
                  className={`text-xl lg:text-2xl font-semibold ${
                    (index === 0 && "text-[#235789]") ||
                    (index === 1 && "text-[#A88F4E]") ||
                    (index === 2 && "text-[#C1292E]")
                  }`}
                >
                  {step.title}
                </h3>
              </div>

              <p className='text-[#6B7280] mb-6 text-base leading-relaxed'>
                {step.description}
              </p>

              <div className='mb-6 flex-1'>
                <h4 className='font-medium text-[#6B7280] mb-3'>
                  Top Features:
                </h4>
                <ul className='space-y-2'>
                  {step.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className='text-base text-[#6B7280] flex items-start gap-2'
                    >
                      <span className='w-1 h-1 bg-[#6B7280] rounded-full mt-2 flex-shrink-0' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={step.buttonVariant}
                className={`w-full h-[44px] group text-white rounded-3xl cursor-pointer ${
                  (index === 0 && "bg-[#235789] hover:bg-[#235789]") ||
                  (index === 1 && "bg-[#A88F4E] hover:bg-[#A88F4E]") ||
                  (index === 2 && "bg-[#C1292E] hover:bg-[#C1292E]")
                }`}
                onClick={() => goToStep(index)}
              >
                {step.buttonText}
                <ArrowRight className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile/Tablet View - Carousel */}
      <div className='lg:hidden'>
        <div className='relative overflow-hidden'>
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {journeySteps.map((step, index) => (
              <div key={step.id} className='w-full flex-shrink-0 px-2'>
                <Card className={cn("overflow-hidden", step.cardStyle)}>
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-3 mb-4'>
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          index === 0 && "bg-primary/10 text-primary",
                          index === 1 && "bg-secondary/10 text-secondary",
                          index === 2 && "bg-destructive/10 text-destructive"
                        )}
                      >
                        {step.icon}
                      </div>
                      <h3 className='text-xl font-semibold text-card-foreground'>
                        {step.title}
                      </h3>
                    </div>

                    <p className='text-muted-foreground mb-6 leading-relaxed'>
                      {step.description}
                    </p>

                    <div className='mb-6'>
                      <h4 className='font-medium text-card-foreground mb-3'>
                        Top Features:
                      </h4>
                      <ul className='space-y-2'>
                        {step.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className='text-sm text-muted-foreground flex items-start gap-2'
                          >
                            <span className='w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0' />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant={step.buttonVariant}
                      className='w-full group'
                    >
                      {step.buttonText}
                      <ArrowRight className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className='flex items-center justify-between mt-6'>
          <Button
            variant='outline'
            size='icon'
            onClick={prevStep}
            className='rounded-full bg-transparent'
          >
            <ChevronLeft className='w-4 h-4' />
          </Button>

          {/* Dots Indicator */}
          <div className='flex gap-2'>
            {journeySteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentStep === index
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          <Button
            variant='outline'
            size='icon'
            onClick={nextStep}
            className='rounded-full bg-transparent'
          >
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Auto-play indicator */}
      <div className='flex justify-center mt-6 lg:hidden'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className='text-xl text-muted-foreground'
        >
          {isAutoPlaying ? "⏸️" : "▶️"}
        </Button>
      </div>
    </div>
  );
}
