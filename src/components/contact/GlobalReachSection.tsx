import Image from "next/image";

export function GlobalReachSection() {
  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto pb-12'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-blue-600 mb-4'>
            Our Global Reach
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Connecting talent and opportunities across borders - wherever you
            are, GetAvails is there.
          </p>
        </div>

        <div className='flex justify-center'>
          <div className='relative w-full'>
            <Image
              src='/map.png'
              alt='Global reach world map showing GetAvails presence across continents'
              width={1200}
              height={600}
              className='w-full h-[600px]'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
