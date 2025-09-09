import {
  Users,
  Search,
  Network,
  Handshake,
  Plane,
  MessageCircle,
} from "lucide-react";

export default function PlatformFeatures() {
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
      icon: Network,
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
      icon: MessageCircle,
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

  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-medium text-[#235789] mb-4'>
            Everything You Need to Book, Manage, and Grow
          </h2>
          <p className='text-[#6B7280] text-lg max-w-2xl mx-auto'>
            A clear path to connect with artists, agents, and venues — all in
            just a few clicks.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className='bg-white rounded-lg border border-[#1E1E1E] p-6 hover:shadow-lg transition-shadow duration-300'
              >
                {/* Icon */}
                <div className='mb-4'>
                  <div className='w-12 h-12 flex items-center justify-center'>
                    <IconComponent className='w-6 h-6 text-blue-600' />
                  </div>
                </div>

                {/* Title/Description */}
                <p className='text-[#1E1E1E] text-lg leading-relaxed mb-4'>
                  {feature.title}
                </p>

                {/* Features List */}
                <div>
                  <h4 className='text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide'>
                    Features:
                  </h4>
                  <ul className='space-y-1'>
                    {feature.features.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className='text-[#6B7280] text-base flex items-start'
                      >
                        <span className='w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0'></span>
                        {item}
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
