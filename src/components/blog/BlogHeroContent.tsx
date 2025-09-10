"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
const BlogHeroContent = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };
  return (
    <div className='relative z-10 -mt-48 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 container mx-auto px-6'>
      <Card
        className={`bg-[#F6FBFF] rounded-4xl !border-none overflow-hidden cursor-pointer transition-all duration-300 ${
          selectedCard === "agent" ? "ring-2 ring-blue-400" : ""
        }`}
        onClick={() => handleCardClick("agent")}
      >
        <div className='z-20 bg-[#F6FBFF] aspect-video relative overflow-hidden rounded-4xl p-6'>
          <Image
            width={500}
            height={312}
            src='/blog-banner1.jpg'
            alt='Concert stage with purple lighting and crowd'
            className='w-full h-full object-cover rounded-4xl'
          />
        </div>
        <div className='px-6 pb-6'>
          <div className='text-[#2C73B8] text-base font-medium mb-2'>Agent</div>
          <h2 className='text-2xl md:text-[32px] font-semibold text-[#000000] mb-3'>
            Behind the Stage Lights
          </h2>
          <p className='text-[#4D4D4D] text-sm md:text-base leading-relaxed mb-4'>
            Discover trends, updates, and conversations around platforms,
            people, and opportunities that shape the way we connect.
          </p>
          <div className='flex items-center gap-3'>
            <Avatar className='w-10 h-10'>
              <AvatarImage src='/blog-user.jpg' />
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <div>
              <div className='text-sm lg:text-base font-medium text-[#000000]'>
                Lata Mangeshkar
              </div>
              <div className='text-xs lg:text-sm text-[#838383]'>
                05 Jan, 2025
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card
        className={`bg-[#F6FBFF] rounded-4xl !border-none overflow-hidden cursor-pointer transition-all duration-300 ${
          selectedCard === "artist" ? "-2 " : ""
        }`}
        onClick={() => handleCardClick("artist")}
      >
        <div className='bg-[#F6FBFF] aspect-video relative overflow-hidden rounded-4xl p-6'>
          <Image
            width={500}
            height={312}
            src='/blog-banner2.jpg'
            alt='Concert crowd silhouettes with stage lights'
            className='w-full h-full object-cover rounded-4xl'
          />
        </div>
        <div className='px-6 pb-6'>
          <div className='text-[#2C73B8] text-base font-medium mb-2'>
            Artist
          </div>
          <h2 className='text-2xl md:text-[32px] font-semibold text-[#000000] mb-3'>
            Behind the Stage Lights
          </h2>
          <p className='text-[#4D4D4D] text-sm md:text-base leading-relaxed mb-4'>
            Discover trends, updates, and conversations around platforms,
            people, and opportunities that shape the way we connect.
          </p>
          <div className='flex items-center gap-3'>
            <Avatar className='w-10 h-10'>
              <AvatarImage src='/blog-user.jpg' />
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <div>
              <div className='text-sm lg:text-base font-medium text-[#000000]'>
                Lata Mangeshkar
              </div>
              <div className='text-xs lg:text-sm text-[#838383]'>
                05 Jan, 2025
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogHeroContent;
