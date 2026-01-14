"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, MessageCircle, Link, Loader2 } from "lucide-react";
import Image from "next/image";
import { useGetBlogQuery } from "@/redux/features/admin/blogAPI";
import { useParams } from "next/navigation";
import { toast } from "sonner";

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

export default function BlogPost() {
  const [copiedLink, setCopiedLink] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const { data: blog, isLoading } = useGetBlogQuery(id);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err: any) {
      toast.error(err?.data?.message);
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

  if (isLoading) {
    return (
      <div className='min-h-[80vh] flex items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  return (
    <article className='container mx-auto px-4 py-8 md:py-12'>
      {/* Header */}
      <header className='mb-8'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-[#000000] mb-6 lg:mb-8 text-balance'>
          {blog?.data.title || "No Title"}
        </h1>

        {/* Hero Image */}
        <div className='relative w-full h-64 md:h-80 lg:h-[575px] rounded-2xl overflow-hidden mb-6'>
          {!isLoading && blog?.data && (
            <Image
              fill
              src={blog?.data.banner_url}
              alt={blog?.data.title}
              className='w-full h-full object-cover'
            />
          )}
        </div>

        {/* Author Info and Date */}
        <div className='flex items-center justify-between flex-wrap gap-4 mb-6'>
          <div className='flex items-center gap-3'>
            <Avatar className='w-12 h-12'>
              <AvatarImage src='/user.png' alt='Lata Mangeshkar' />
              <AvatarFallback>{blog?.data?.admin?.name}</AvatarFallback>
            </Avatar>
            <div>
              <p className='font-semibold text-xl text-[#000000]'>
                {blog?.data?.admin?.name || "No Name"}
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
            {blog?.data?.published_at?.split("T")[0] || "No Date"}
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
              {blog?.data?.description || "No Description"}
            </p>

            {blog?.data?.content && (
              <p
                className='text-base text-[#000000] leading-relaxed mb-6 prose prose-sm max-w-none'
                dangerouslySetInnerHTML={{
                  __html: blog?.data?.content || "No Content",
                }}
              />
            )}
          </div>
        </main>
      </div>
    </article>
  );
}
