import { Mail, MessageCircle, Phone } from "lucide-react";

export function ContactInfoSection() {
  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* General Inquiries */}
          <div className='bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow duration-300'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              General Inquiries
            </h3>
            <p className='text-gray-600 mb-8'>
              For platform questions, partnerships, and media.
            </p>
            <div className='flex items-center justify-center gap-3 text-blue-600'>
              <Mail className='w-6 h-6' />
              <a
                href='mailto:support@getavails.com'
                className='text-lg font-medium hover:text-blue-700 transition-colors'
              >
                support@getavails.com
              </a>
            </div>
          </div>

          {/* Support */}
          <div className='bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow duration-300'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>Support</h3>
            <p className='text-gray-600 mb-8'>
              Get instant help from our support specialists.
            </p>
            <div className='flex items-center justify-center gap-3 text-blue-600'>
              <MessageCircle className='w-6 h-6' />
              <span className='text-lg font-medium'>Available 9 AM – 9 PM</span>
            </div>
          </div>

          {/* For Business */}
          <div className='bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow duration-300'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              For Business
            </h3>
            <p className='text-gray-600 mb-8'>
              For sponsorships, collaborations, and enterprise bookings.
            </p>
            <div className='flex items-center justify-center gap-3 text-blue-600'>
              <Phone className='w-6 h-6' />
              <a
                href='tel:+1-xxx-xxx-xxxx'
                className='text-lg font-medium hover:text-blue-700 transition-colors'
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
