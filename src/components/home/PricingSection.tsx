"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Rocket, Crown, Check, DollarSign } from "lucide-react";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Personal",
      icon: User,
      description:
        "For individuals who want to launch a simple portfolio or landing page.",
      price: { monthly: 0, annual: 0 },
      features: ["Fully responsive Webflow template"],
      buttonText: "Try now",
      buttonVariant: "default" as const,
      theme: "dark",
      popular: false,
    },
    {
      name: "Starter",
      icon: Rocket,
      description:
        "For teams who want to build stylish websites fast with Webflow.",
      price: { monthly: 299, annual: 199 },
      features: ["Includes Figma + Webflow files"],
      buttonText: "Subscribe now",
      buttonVariant: "default" as const,
      theme: "blue",
      popular: true,
      savings: "65%",
    },
    {
      name: "Premium",
      icon: Crown,
      description:
        "For companies who need advanced features and top-tier support.",
      price: { monthly: 699, annual: 499 },
      features: ["Access to all template collections"],
      buttonText: "Subscribe now",
      buttonVariant: "default" as const,
      theme: "dark",
      popular: false,
      savings: "75%",
    },
  ];

  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance'>
            Free to Start. Powerful When You Upgrade.
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto text-pretty'>
            Lorem ipsum dolor sit amet consectetur. Dignissim maecenas molestie
            arcu sem sit sem.
          </p>
        </div>

        {/* Toggle */}
        <div className='flex justify-center mb-12'>
          <div className='bg-white rounded-full p-1 shadow-sm border'>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = isAnnual
              ? plan.price.annual
              : plan.price.monthly;
            const isMiddleCard = index === 1;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.theme === "blue"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-900 text-white"
                } ${isMiddleCard ? "transform md:scale-105 md:-mt-4" : ""}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <div className='bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg'>
                      Most popular
                    </div>
                  </div>
                )}

                {/* Savings Badge */}
                {plan.savings && isAnnual && (
                  <div className='absolute top-4 right-4'>
                    <div className='bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                      Save {plan.savings}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className='mb-6'>
                  <div className='w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center'>
                    <Icon className='w-6 h-6' />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className='text-xl font-semibold mb-2'>{plan.name}</h3>

                {/* Description */}
                <p className='text-white/80 mb-8 text-sm leading-relaxed'>
                  {plan.description}
                </p>

                {/* Price */}
                <div className='mb-8'>
                  {currentPrice === 0 ? (
                    <div className='text-4xl font-bold'>Free</div>
                  ) : (
                    <div className='flex items-baseline'>
                      <span className='text-4xl font-bold'>
                        ${currentPrice}
                      </span>
                      <span className='text-white/80 ml-1'>
                        /{isAnnual ? "year" : "month"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className='mb-8'>
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className='flex items-center text-sm text-white/90'
                    >
                      <Check className='w-4 h-4 mr-3 flex-shrink-0' />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.theme === "blue"
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  size='lg'
                >
                  {plan.buttonText}
                </Button>

                {/* Money Back Guarantee */}
                {plan.name !== "Personal" && (
                  <div className='flex items-center justify-center mt-4 text-sm text-white/80'>
                    <DollarSign className='w-4 h-4 mr-2' />
                    30-day money back guarantee
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
