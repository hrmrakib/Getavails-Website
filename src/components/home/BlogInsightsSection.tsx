"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How Agents Can Streamline Their Artist Booking Workflow",
    description:
      "Learn how Getavails helps agents manage multiple artists, track offers, and close more bookings with less back-and-forth.",
    image: "/blog-warehouse.png",
    slug: "streamline-artist-booking-workflow",
  },
  {
    id: 2,
    title: "How Agents Can Streamline Their Artist Booking Workflow",
    description:
      "Learn how Getavails helps agents manage multiple artists, track offers, and close more bookings with less back-and-forth.",
    image: "/blog-concert.png",
    slug: "streamline-artist-booking-workflow-2",
  },
  {
    id: 3,
    title: "How Agents Can Streamline Their Artist Booking Workflow",
    description:
      "Learn how Getavails helps agents manage multiple artists, track offers, and close more bookings with less back-and-forth.",
    image: "/blog-person.png",
    slug: "streamline-artist-booking-workflow-3",
  },
];

export function BlogInsightsSection() {
  return (
    <section className='bg-gray-900 py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance'>
            Insights from the Stage & Studio
          </h2>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto text-balance'>
            Lorem ipsum dolor sit amet consectetur. Dignissim maecenas molestie
            arcu sem sit sem.
          </p>
        </div>

        {/* Blog Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className='group relative overflow-hidden rounded-2xl bg-gray-800 hover:transform hover:scale-105 transition-all duration-300'
            >
              {/* Background Image */}
              <div className='relative h-80 md:h-96'>
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                />
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
              </div>

              {/* Content */}
              <div className='absolute bottom-0 left-0 right-0 p-6'>
                <h3 className='text-white text-xl font-semibold mb-3 text-balance'>
                  {post.title}
                </h3>
                <p className='text-gray-300 text-sm mb-4 line-clamp-3'>
                  {post.description}
                </p>

                {/* Read More Button */}
                <Button
                  variant='outline'
                  className='w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm'
                  asChild
                >
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className='text-center'>
          <Link
            href='/blog'
            className='text-white hover:text-gray-300 transition-colors duration-200 text-lg font-medium underline underline-offset-4 hover:underline-offset-8'
          >
            View All Blog Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
