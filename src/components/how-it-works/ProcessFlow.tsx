import { Zap, RotateCcw, Target, Radio } from "lucide-react";

export default function ProcessFlow() {
  const steps = [
    {
      number: 1,
      title: "Ask Your Assistant",
      description:
        "Type your request — find talent, book a venue, or send a contract, all in seconds.",
      icon: Zap,
    },
    {
      number: 2,
      title: "Smart Matching",
      description:
        "AI suggests the best artists, venues, agents, or managers based on your needs.",
      icon: RotateCcw,
    },
    {
      number: 3,
      title: "Real-Time Availability",
      description:
        "Instantly check who's free, compare options, and avoid endless back-and-forth.",
      icon: Target,
    },
    {
      number: 4,
      title: "Book & Go Live",
      description:
        "Confirm, sign, and manage everything in one place — faster, smoother, smarter.",
      icon: Radio,
    },
  ];

  return (
    <section className='py-16 lg:py-24 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#235789] mb-4'>
            Plan Smarter, Book Faster with AI
          </h2>
          <p className='text-lg text-[#6B7280] max-w-2xl mx-auto'>
            Simple steps. Smarter planning. Seamless booking.
          </p>
        </div>

        {/* Process Steps */}
        <div className='relative'>
          {/* Desktop Layout */}
          <div className='hidden lg:block'>
            <div className='grid grid-cols-4 gap-8 relative'>
              {/* Curved connecting lines */}
              <div className='absolute top-16 left-0 right-0 h-px'>
                {/* First curve */}
                <svg
                  className='absolute left-1/4 -top-16 -translate-x-1/2 w-64 h-32'
                  viewBox='0 0 256 128'
                >
                  <path
                    d='M 0 64 Q 128 16 256 64'
                    stroke='#3b82f6'
                    strokeWidth='2'
                    strokeDasharray='8,8'
                    fill='none'
                    opacity='0.6'
                  />
                </svg>
                {/* Second curve */}
                <svg
                  className='absolute left-2/4 -top-16 -translate-x-1/2 w-64 h-32'
                  viewBox='0 0 256 128'
                >
                  <path
                    d='M 0 64 Q 128 112 256 64'
                    stroke='#3b82f6'
                    strokeWidth='2'
                    strokeDasharray='8,8'
                    fill='none'
                    opacity='0.6'
                  />
                </svg>
                {/* Third curve */}
                <svg
                  className='absolute left-3/4 -top-16 -translate-x-1/2 w-64 h-32'
                  viewBox='0 0 256 128'
                >
                  <path
                    d='M 0 64 Q 128 16 256 64'
                    stroke='#3b82f6'
                    strokeWidth='2'
                    strokeDasharray='8,8'
                    fill='none'
                    opacity='0.6'
                  />
                </svg>
              </div>

              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className='text-center relative z-10'>
                    {/* Step number */}
                    <div className='inline-flex items-center justify-center w-6 h-6 bg-[#2C73B8] text-white rounded-full text-sm font-semibold mb-4'>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className='flex justify-center mb-6'>
                      <div className='w-16 h-16 flex items-center justify-center'>
                        <Icon className='w-8 h-8 text-[#2C73B8]' />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className='text-xl font-semibold text-[#2C73B8] mb-3'>
                      {step.title}
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className='lg:hidden'>
            <div className='space-y-12'>
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.number} className='relative'>
                    <div className='flex items-start gap-6'>
                      {/* Left side - Number and Icon */}
                      <div className='flex-shrink-0 text-center'>
                        <div className='inline-flex items-center justify-center w-5 h-5 bg-[#2C73B8] text-white rounded-full text-sm font-semibold mb-4'>
                          {step.number}
                        </div>
                        <div className='w-16 h-16 flex items-center justify-center mx-auto'>
                          <Icon className='w-8 h-8 text-[#2C73B8]' />
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className='flex-1 pt-2'>
                        <h3 className='text-xl font-semibold text-[#2C73B8] mb-3'>
                          {step.title}
                        </h3>
                        <p className='text-[#6B7280] leading-relaxed'>
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Connecting line for mobile */}
                    {!isLast && (
                      <div className='absolute left-8 top-24 w-px h-12 bg-gradient-to-b from-[#2C73B8] to-transparent opacity-50'></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
