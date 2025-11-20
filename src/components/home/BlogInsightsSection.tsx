"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { useGetBlogsQuery } from "@/redux/features/admin/blogAPI";

interface Admin {
  name: string;
  avatar: string;
}

interface BlogPost {
  id: string;
  published_at: string;
  last_updated_at: string;
  title: string;
  description: string;
  content: string;
  banner_url: string;
  banner_type: "image" | "video" | "none";
  admin: Admin;
}

export default function BlogInsightsSection() {
  const { data: blogPosts } = useGetBlogsQuery({
    page: 1,
    limit: 12,
    search: "",
  });
  return (
    <div className='bg-gray-900 min-h-screen py-16'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Insights from the Stage & Studio
          </h1>
          <p className='text-gray-400 text-lg'>
            Artists, Agents & Insights — All in One Place.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className='max-w-6xl mx-auto h-[600px] mb-6 lg:mb-12'>
          <Swiper
            effect='coverflow'
            grabCursor={true}
            centeredSlides={true}
            slidesPerView='auto'
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet custom-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active custom-bullet-active",
            }}
            modules={[EffectCoverflow, Pagination]}
            className='insights-swiper'
          >
            {blogPosts?.data?.map((insight: BlogPost) => (
              <SwiperSlide key={insight.id} className='insight-slide'>
                <div className='relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer'>
                  <Image
                    width={800}
                    height={600}
                    src={insight.banner_url}
                    alt={insight.title}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />

                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent'></div>

                  {/* Content */}
                  <div className='absolute bottom-0 left-0 right-0 p-8'>
                    <h3 className='text-white text-xl font-bold mb-3 leading-tight'>
                      {insight.title}
                    </h3>
                    <p className='text-gray-300 text-sm mb-6 leading-relaxed'>
                      {insight.description}
                    </p>
                    <Link
                      href={`/blog/${insight.id}`}
                      className='w-full flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium'
                    >
                      Read More
                      <svg
                        className='ml-2 w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All Link */}
        <div className='text-center'>
          <Link
            href='/blog'
            className='inline-flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-lg font-medium group'
          >
            View All Blog Posts
            <svg
              className='ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .insights-swiper {
          width: 100%;
          height: 100%;
          padding: 20px 0 50px 0;
        }

        .insight-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 350px !important;
          height: 500px;
        }

        .custom-bullet {
          background: rgba(255, 255, 255, 0.3) !important;
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }

        .custom-bullet-active {
          background: white !important;
          transform: scale(1.3) !important;
        }

        .swiper-pagination {
          bottom: 10px !important;
        }

        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background-image: none !important;
        }
      `}</style>
    </div>
  );
}
