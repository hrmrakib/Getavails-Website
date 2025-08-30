"use client";

export function PlatformFeaturesSection() {
  const features = [
    {
      title: "Discover & Book the Right Talent Fast",
      description:
        "Easily browse artist profiles, availability, and past performance data. Send offers, manage contracts, and track responses - all in one place. With Getavails, securing talent is no longer a waiting game.",
      highlighted: true,
    },
    {
      title: "Get Seen. Get Booked. Get Paid.",
      description:
        "Premium members gain access to intelligent booking tools that analyze performance data, availability, and location to auto-generate optimized offers. This dramatically streamlines negotiations and reduces",
      highlighted: false,
    },
    {
      title: "Fill Your Calendar With Acts That Fit",
      description:
        "Premium members gain access to intelligent booking tools that analyze performance data, availability, and location to auto-generate optimized offers. This dramatically streamlines negotiations and reduces",
      highlighted: false,
    },
    {
      title: "Control the Career, Not the Chaos",
      description:
        "Premium members gain access to intelligent booking tools that analyze performance data, availability, and location to auto-generate optimized offers. This dramatically streamlines negotiations and reduces",
      highlighted: false,
    },
  ];

  return (
    <section className='py-16 px-4 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-balance'>
            One Platform. Multiple Possibilities.
          </h2>
          <p className='text-gray-600 text-lg max-w-3xl mx-auto text-pretty'>
            Whether you&apos;re booking talent, managing tours, or hosting
            sold-out shows, Getavails simplifies your operations and expands
            your opportunities, all from one powerful platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
                feature.highlighted
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-900 hover:border-blue-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 text-balance ${
                  feature.highlighted ? "text-white" : "text-blue-600"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm leading-relaxed text-pretty ${
                  feature.highlighted ? "text-blue-100" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
