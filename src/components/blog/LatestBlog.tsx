"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
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

export default function LatestBlog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: blogs } = useGetBlogsQuery({
    page,
    limit,
    search: searchQuery,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className='relative z-0 min-h-screen bg-white py-20'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <h1 className='text-2xl md:text-4xl font-bold text-[#235789] mb-8'>
            Latest Blog
          </h1>

          {/* Search Bar */}
          <div className='relative !h-14 max-w-lg mx-auto'>
            <Input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearch}
              className='w-full !h-14 pl-4 pr-12 py-3 !text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <div className='absolute right-3 top-[28px] transform -translate-y-1/2'>
              <Search className='w-5 h-5 text-gray-400' />
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {blogs?.data?.map((post: BlogPost) => (
            <Card
              key={post.id}
              className='bg-transparent !border-none rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer'
            >
              <div className='aspect-video relative overflow-hidden rounded-3xl'>
                <Image
                  width={420}
                  height={240}
                  src={post.banner_url}
                  alt={post.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='p-4'>
                {/* <div
                  className={`text-sm text-[#2C73B8] font-medium mb-2 ${getCategoryColor(
                    post.category
                  )}`}
                >
                  {post.category}
                </div> */}
                <h2 className='text-xl font-semibold text-[#000000] mb-2 line-clamp-2'>
                  {post.title}
                </h2>
                <p className='text-[#4D4D4D] text-sm lg:text-base leading-relaxed mb-4 line-clamp-2'>
                  {post.description}
                </p>
                <div className='flex items-center gap-3'>
                  <Avatar className='w-10 h-10'>
                    <AvatarImage src='/user.png' />
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='text-sm lg:text-base font-medium text-[#000000]'>
                      {post.admin.name}
                    </div>
                    <div className='text-xs text-[#838383] font-medium'>
                      {post.published_at.split("T")[0]}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {/* Pagination */}
        {blogs?.totalPages > 1 && (
          <div className='flex items-center justify-center gap-2 mt-10'>
            {/* Previous */}
            <Button
              variant='ghost'
              size='sm'
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className='flex items-center gap-1 text-gray-600 hover:text-gray-900 disabled:opacity-40'
            >
              <ChevronLeft className='w-4 h-4' />
              Previous
            </Button>

            {/* Dynamic Page Numbers */}
            <div className='flex items-center gap-1'>
              {Array.from({ length: blogs.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "ghost"}
                    size='sm'
                    onClick={() => handlePageChange(p)}
                    className={`w-8 h-8 p-0 ${
                      p === page
                        ? "bg-[#235789] text-white hover:bg-[#235789]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {p}
                  </Button>
                )
              )}
            </div>

            {/* Next */}
            <Button
              variant='ghost'
              size='sm'
              onClick={() =>
                handlePageChange(Math.min(blogs.totalPages, page + 1))
              }
              disabled={page === blogs.totalPages}
              className='flex items-center gap-1 text-gray-600 hover:text-gray-900 disabled:opacity-40'
            >
              Next
              <ChevronRight className='w-4 h-4' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
