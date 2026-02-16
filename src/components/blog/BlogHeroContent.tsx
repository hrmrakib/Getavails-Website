"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import { useGetBlogsQuery } from "@/redux/features/admin/blogAPI";
import Link from "next/link";

const BlogHeroContent = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const { data: blogs } = useGetBlogsQuery({
    page: 1,
    limit: 2,
    search: "",
  });

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  console.log(blogs);

  return (
    <div className='relative z-10 -mt-48 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 container mx-auto px-6'>
      <Link href={`/blog/${blogs?.data[0]?.id}`}>
        <Card
          className={`bg-[#F6FBFF] rounded-4xl !border-none overflow-hidden cursor-pointer transition-all duration-300 ${
            selectedCard === "agent" ? "ring-2 ring-blue-400" : ""
          }`}
          onClick={() => handleCardClick("agent")}
        >
          {blogs?.data[0]?.banner_url && (
            <div className='z-20 bg-[#F6FBFF] aspect-video relative overflow-hidden rounded-4xl p-6'>
              <Image
                width={500}
                height={312}
                src={blogs?.data[0]?.banner_url}
                alt={blogs?.data[0]?.title}
                className='w-full h-full object-cover rounded-4xl'
              />
            </div>
          )}
          <div className='px-6 pb-6'>
            <div className='text-[#2C73B8] text-base font-medium mb-2'>
              Agent
            </div>
            <h2 className='text-2xl md:text-[32px] font-semibold text-[#000000] mb-3'>
              {blogs?.data[0]?.title}
            </h2>
            <p className='text-[#4D4D4D] text-sm md:text-base leading-relaxed mb-4'>
              {blogs?.data[0]?.description}
            </p>
            <div className='flex items-center gap-3'>
              <Avatar className='w-10 h-10'>
                <AvatarImage src={blogs?.data[0]?.admin?.avatar} />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <div>
                <div className='text-sm lg:text-base font-medium text-[#000000]'>
                  {blogs?.data[0]?.admin?.name}
                </div>
                <div className='text-xs lg:text-sm text-[#838383]'>
                  {blogs?.data[0]?.published_at?.split("T")[0]}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      <Link href={`/blog/${blogs?.data[0]?.id}`}>
        <Card
          className={`bg-[#F6FBFF] rounded-4xl !border-none overflow-hidden cursor-pointer transition-all duration-300 ${
            selectedCard === "artist" ? "-2 " : ""
          }`}
          onClick={() => handleCardClick("artist")}
        >
          {blogs?.data[0]?.banner_url && (
            <div className='bg-[#F6FBFF] aspect-video relative overflow-hidden rounded-4xl p-6'>
              <Image
                width={500}
                height={312}
                src={blogs?.data[1]?.banner_url}
                alt={blogs?.data[1]?.title}
                className='w-full h-full object-cover rounded-4xl'
              />
            </div>
          )}
          <div className='px-6 pb-6'>
            <div className='text-[#2C73B8] text-base font-medium mb-2'>
              Artist
            </div>
            <h2 className='text-2xl md:text-[32px] font-semibold text-[#000000] mb-3'>
              {blogs?.data[1]?.title}
            </h2>
            <p className='text-[#4D4D4D] text-sm md:text-base leading-relaxed mb-4'>
              {blogs?.data[1]?.description}
            </p>
            <div className='flex items-center gap-3'>
              <Avatar className='w-10 h-10'>
                <AvatarImage src={blogs?.data[1]?.admin?.avatar} />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <div>
                <div className='text-sm lg:text-base font-medium text-[#000000]'>
                  {blogs?.data[1]?.admin?.name}
                </div>
                <div className='text-xs lg:text-sm text-[#838383]'>
                  {blogs?.data[1]?.published_at?.split("T")[0]}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default BlogHeroContent;
