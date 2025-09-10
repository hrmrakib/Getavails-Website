import { Mail, MessageCircle, Phone } from "lucide-react";

export function ContactInfoSection() {
  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* General Inquiries */}
          <div className='bg-white rounded-2xl border border-[#235789] px-8 py-12 text-center hover:shadow-lg transition-shadow duration-300'>
            <h3 className='text-2xl lg:text-[36px] font-semibold text-[#1E1E1E] mb-4'>
              General Inquiries
            </h3>
            <p className='text-[#A4A4A4] text-lg mb-8'>
              For platform questions, partnerships, and media.
            </p>
            <div className='flex items-center justify-center gap-3'>
              <Mail className='w-6 h-6 text-[#235789]' />
              <a
                href='mailto:support@getavails.com'
                className='text-lg text-[#1E1E1E] font-medium hover:text-blue-700 transition-colors'
              >
                support@getavails.com
              </a>
            </div>
          </div>

          {/* Support */}
          <div className='bg-white rounded-2xl border border-[#235789] px-8 py-12 text-center hover:shadow-lg transition-shadow duration-300'>
            <h3 className='text-2xl lg:text-[36px] font-semibold text-[#1E1E1E] mb-4'>
              Support
            </h3>
            <p className='text-[#A4A4A4] text-lg mb-8'>
              Get instant help from our support specialists.
            </p>
            <div className='flex items-center justify-center gap-3'>
              <MessageCircle className='w-6 h-6 text-[#235789]' />
              <a
                href='mailto:support@getavails.com'
                className='text-lg text-[#1E1E1E] font-medium hover:text-blue-700 transition-colors'
              >
                Available 9 AM – 9 PM
              </a>
            </div>
          </div>

          {/* For Business */}
          <div className='bg-white rounded-2xl border border-[#235789] px-8 py-12 text-center hover:shadow-lg transition-shadow duration-300'>
            <h3 className='text-2xl lg:text-[36px] font-semibold text-[#1E1E1E] mb-4'>
              For Business
            </h3>
            <p className='text-[#A4A4A4] text-lg mb-8'>
              For sponsorships, collaborations, and enterprise bookings.
            </p>
            <div className='flex items-center justify-center gap-3'>
              <Phone className='w-6 h-6 text-[#235789]' />
              <a
                href='mailto:support@getavails.com'
                className='text-lg text-[#1E1E1E] font-medium hover:text-blue-700 transition-colors'
              >
                Call Us: +1 (XXX) XXX-XXXX
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
