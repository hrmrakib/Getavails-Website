"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, MessageCircle, Link } from "lucide-react";
import Image from "next/image";

export default function BlogPost() {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("Behind the Stage Lights");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      "Check out this article: Behind the Stage Lights"
    );
    window.open(`https://wa.me/?text=${text} ${url}`, "_blank");
  };

  return (
    <article className='container mx-auto px-4 py-8 md:py-12'>
      {/* Header */}
      <header className='mb-8'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-[#000000] mb-6 lg:mb-8 text-balance'>
          Behind the Stage Lights
        </h1>

        {/* Hero Image */}
        <div className='relative w-full h-64 md:h-80 lg:h-[575px] rounded-2xl overflow-hidden mb-6'>
          <Image
            fill
            src='/blog-detail.jpg'
            alt='Concert crowd with dramatic golden stage lighting'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Author Info and Date */}
        <div className='flex items-center justify-between flex-wrap gap-4 mb-6'>
          <div className='flex items-center gap-3'>
            <Avatar className='w-12 h-12'>
              <AvatarImage src='/user.png' alt='Lata Mangeshkar' />
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <div>
              <p className='font-semibold text-xl text-[#000000]'>
                Lata Mangeshkar
              </p>
              <p className='text-sm text-[#2C73B8] font-medium'>Artist</p>
            </div>
          </div>
          <time className='text-sm text-[#656565] flex items-center gap-2'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            25 Jan, 2025
          </time>
        </div>
      </header>

      {/* Content with Sidebar */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Social Sharing Sidebar */}
        <aside className='lg:w-20 flex lg:flex-col flex-row gap-3 lg:sticky lg:top-8 lg:self-start order-2 lg:order-1'>
          <div className='text-sm text-[#000000] mb-2 hidden lg:block'>
            Share this article
          </div>
          <div className='flex lg:flex-col flex-row gap-3'>
            <Button
              variant='outline'
              size='icon'
              onClick={handleCopyLink}
              className='w-10 h-10 rounded-full border-[#0000FF] transition-colors'
              title='Copy link'
            >
              <Link className='w-4 h-4 text-[#0000FF]' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={handleFacebookShare}
              className='w-10 h-10 rounded-full border-[#1877F2] transition-colors'
              title='Share on Facebook'
            >
              <Facebook className='w-4 h-4 text-[#1877F2]' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={handleLinkedInShare}
              className='w-10 h-10 rounded-full border-[#0077B5] transition-colors'
              title='Share on LinkedIn'
            >
              <Linkedin className='w-4 h-4 text-[#0077B5]' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={handleWhatsAppShare}
              className='w-10 h-10 rounded-full border-[#00B2FF] transition-colors'
              title='Share on WhatsApp'
            >
              <MessageCircle className='w-4 h-4 text-[#006AFF]' />
            </Button>
          </div>
          {copiedLink && (
            <div className='text-xs text-green-600 mt-2 lg:block hidden'>
              Link copied!
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className='flex-1 order-1 lg:order-2'>
          <div className='prose prose-lg max-w-none'>
            <p className='text-lg text-[#000000] leading-relaxed mb-6'>
              Attending a concert is an activity that appealed to many.
              Experiencing live music performance is different from listening to
              it through other platforms. Furthermore, you can meet your idol
              while attending a concert.
            </p>

            <p className='text-base text-[#000000] leading-relaxed mb-6'>
              For first-timers, you probably have feelings of anxiety about
              attending a concert. But, worry not. Check out the following tips
              for attending a concert for the first time to enhance your
              experience.
            </p>

            <h2 className='text-xl font-semibold text-[#000000] mb-4 mt-8'>
              Tips for Attending a Concert for the First Time
            </h2>

            <p className='text-base text-[#000000] leading-relaxed mb-6'>
              No need to be confused, let alone panic, when you&apos;re
              attending a music concert for the first time. With proper
              preparation, attending a live music performance for the first time
              can be an unforgettable experience.
            </p>

            <p className='text-base leading-relaxed mb-8'>
              Here are the tips for attending a concert for beginners:
            </p>

            <div className='space-y-8'>
              <section>
                <h3 className='text-lg font-semibold text-foreground mb-4'>
                  1. Keep Your Body Fit
                </h3>
                <p className='text-base text-[#000000] leading-relaxed mb-4'>
                  Having a prime physical condition will surely enhance your
                  experience when attending a concert. You sure don&apos;t want
                  to miss it because you suddenly get ill on D-Day. Before the
                  big day, make sure to keep your body fit.
                </p>
                <p className='text-base text-[#000000] leading-relaxed'>
                  Maintaining your health is simple. Consume balanced nutritious
                  foods and do not forget to get enough rest or sleep at night.
                  Stay active by exercising for approximately 30 minutes every
                  day. Not only does it make you fit, but also ensures your
                  stamina after the concert.
                </p>
              </section>

              <section>
                <h3 className='text-lg font-semibold text-foreground mb-4'>
                  2. Wear Comfortable Clothes
                </h3>
                <p className='text-base text-[#000000] leading-relaxed mb-4'>
                  Wear an outfit according to the venue. If it&apos;s an indoor
                  performance, wear something warm because it&apos;s usually
                  chill inside due to the AC. On the other hand, wear a
                  sweat-absorbing outfit to avoid the heat while attending an
                  outdoor concert. For example, wear a t-shirt and a pair of
                  jeans.
                </p>
                <p className='text-base text-[#000000] leading-relaxed'>
                  The most important thing is to wear something comfortable when
                  attending a concert. Avoid wearing high heels, instead, wear
                  something more comfortable such as sneakers. It is because
                  there&apos;s usually a long line and you might stand for a
                  long time throughout the concert.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </article>
  );
}
