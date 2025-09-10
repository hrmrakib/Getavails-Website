import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Darren Fields",
    role: "Indie Artist",
    avatar: "/user.png",
    rating: 5,
    text: "The platform connects me with venues I never thought I'd have access to.",
  },
  {
    id: 2,
    name: "Rachel Kim",
    role: "Talent Manager",
    avatar: "/user.png",
    rating: 5,
    text: "Finally, one dashboard to manage all my bookings and payments - it's a lifesaver.",
  },
  {
    id: 3,
    name: "Sophie Turner",
    role: "Venue Owner",
    avatar: "/user.png",
    rating: 5,
    text: "GetAvails bridges the gap between talent and opportunities, and it works flawlessly.",
  },
  {
    id: 4,
    name: "Ethan Brooks",
    role: "Artist",
    avatar: "/user.png",
    rating: 5,
    text: "I used to juggle multiple apps. Now I just log in to GetAvails and everything's in one place.",
  },
  {
    id: 5,
    name: "Maya Patel",
    role: "Event Coordinator",
    avatar: "/user.png",
    rating: 5,
    text: "The booking process is so streamlined now. What used to take weeks now takes days.",
  },
  {
    id: 6,
    name: "Alex Chen",
    role: "Music Producer",
    avatar: "/user.png",
    rating: 5,
    text: "GetAvails has revolutionized how I connect artists with the right opportunities.",
  },
];

const TestimonialCard = () => {
  return (
    <div className='flex mb-6'>
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className='bg-white rounded-lg p-6 shadow-sm shadow-[#23578933] hover:shadow-md transition-shadow duration-200 mr-5'
        >
          <div className='flex items-center justify-between border-b border-[#E9EFF5] pb-6 mb-4'>
            <div className='flex items-center'>
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className='w-12 h-12 rounded-full mr-3'
                width={48}
                height={48}
              />
              <div className='flex flex-col'>
                <div className='font-semibold text-lg text-[#1E1E1E]'>
                  {testimonial.name}
                </div>
                <div className='text-base text-[#6B7280]'>
                  {testimonial.role}
                </div>
              </div>
            </div>
            <div className='flex items-center mb-4'>
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className='w-4 h-4 fill-[#235789] text-[#235789]'
                />
              ))}
            </div>
          </div>

          {/* Testimonial Text */}
          <p className='text-gray-700 mb-4 leading-relaxed'>
            {testimonial.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCard;
