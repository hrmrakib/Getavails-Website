"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function LatestBlog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(3); // Current page is 3 as shown in the design

  // Sample blog data matching the design
  const blogPosts = [
    {
      id: 1,
      category: "Artists",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog1.jpg",
    },
    {
      id: 2,
      category: "Agent",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog2.jpg",
    },
    {
      id: 3,
      category: "Manager",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog3.png",
    },
    {
      id: 4,
      category: "Artists",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog2.jpg",
    },
    {
      id: 5,
      category: "Agent",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog1.jpg",
    },
    {
      id: 6,
      category: "Manager",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog2.jpg",
    },
    {
      id: 7,
      category: "Artists",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog1.jpg",
    },
    {
      id: 8,
      category: "Agent",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog3.png",
    },
    {
      id: 9,
      category: "Manager",
      title: "Behind the Stage Lights",
      description:
        "A closer look at what really happens before the concert begins.",
      author: "Lata Mangeshkar",
      date: "05 Jan, 2025",
      image: "/blog1.jpg",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Artists":
        return "text-blue-600";
      case "Agent":
        return "text-blue-600";
      case "Manager":
        return "text-blue-600";
      default:
        return "text-blue-600";
    }
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
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className='bg-transparent !border-none rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer'
            >
              <div className='aspect-video relative overflow-hidden rounded-3xl'>
                <Image
                  width={420}
                  height={240}
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='p-4'>
                <div
                  className={`text-sm text-[#2C73B8] font-medium mb-2 ${getCategoryColor(
                    post.category
                  )}`}
                >
                  {post.category}
                </div>
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
                      {post.author}
                    </div>
                    <div className='text-xs text-[#838383] font-medium'>
                      {post.date}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className='flex items-center gap-1 text-gray-600 hover:text-gray-900'
          >
            <ChevronLeft className='w-4 h-4' />
            Previous
          </Button>

          <div className='flex items-center gap-1 mx-4'>
            {[1, 2, 3, "...", 10].map((page, index) => (
              <Button
                key={index}
                variant={page === currentPage ? "default" : "ghost"}
                size='sm'
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                className={`w-8 h-8 p-0 ${
                  page === currentPage
                    ? "bg-[#235789] text-white hover:bg-[#235789]"
                    : "text-gray-600 hover:text-gray-900"
                } ${
                  page === "..." ? "cursor-default hover:bg-transparent" : ""
                }`}
                disabled={page === "..."}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant='ghost'
            size='sm'
            onClick={() => handlePageChange(Math.min(10, currentPage + 1))}
            className='flex items-center gap-1 text-gray-600 hover:text-gray-900'
          >
            Next
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
