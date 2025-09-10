"use client";

import type React from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { X, Cloud } from "lucide-react";

export default function BlogHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    image: null as File | null,
  });

  const handleShareBlog = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", details: "", image: null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blog submitted:", formData);
    handleCloseModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  return (
    <div className='relative h-[630px] bg-[url("/blog-banner.jpg")] bg-cover overflow-hidden'>
      {/* Golden light rays background effect */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]'>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent rotate-12 blur-3xl'></div>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/15 to-transparent -rotate-12 blur-2xl'></div>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent rotate-45 blur-xl'></div>
        </div>
      </div>

      <div className='relative container mx-auto px-4 py-8 md:py-16'>
        {/* Hero Section */}
        <div className='h-full flex flex-col items-center justify-center text-center mb-12 md:mb-20'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance'>
            Inside the World of Collaboration
          </h1>
          <p className='text-gray-300 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 text-pretty leading-relaxed'>
            Exploring trends, challenges, and opportunities that shape
            partnerships, platforms, and communities.
          </p>
          <Button
            onClick={handleShareBlog}
            className='bg-white text-[#222222] hover:bg-gray-100 px-6 py-3 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 cursor-pointer'
          >
            Share your Blog
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className='z-50 fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl w-full max-w-[640px] mx-auto shadow-2xl'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-100'>
              <h2 className='text-2xl lg:text-[32px] font-medium text-[#222222]'>
                Add New Blog
              </h2>
              <button
                onClick={handleCloseModal}
                className='p-1 hover:bg-gray-100 rounded-full transition-colors'
              >
                <X className='w-8 h-8 text-gray-500' />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className='p-6 space-y-6'>
              {/* Blog Title */}
              <div>
                <label className='block text-base font-medium text-[#222222] mb-2'>
                  Blog Title
                </label>
                <Input
                  type='text'
                  placeholder='Enter blog title'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className='w-full h-14 !bg-[#F3F3F3] text-[#222222] text-lg'
                  required
                />
              </div>

              {/* Blog Details */}
              <div>
                <label className='block text-base font-medium text-[#222222] mb-2'>
                  Blog Details
                </label>
                <Textarea
                  placeholder='Enter blog details'
                  value={formData.details}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      details: e.target.value,
                    }))
                  }
                  className='w-full min-h-[100px] resize-none'
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors'>
                  <div className='flex flex-col items-center space-y-2'>
                    <div className='w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center'>
                      <Cloud className='w-6 h-6 text-blue-500' />
                    </div>
                    <div className='text-sm text-gray-600'>Upload Image</div>
                    <input
                      type='file'
                      accept='image/jpeg,image/jpg,image/png'
                      onChange={handleFileChange}
                      className='hidden'
                      id='file-upload'
                    />
                    <label htmlFor='file-upload' className='cursor-pointer'>
                      <Button
                        type='button'
                        variant='outline'
                        className='bg-[#235789] text-white hover:bg-[#235789] border-[#235789]'
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        Select File
                      </Button>
                    </label>
                    <p className='text-xs text-[#333338] font-medium mt-2'>
                      Support file format: JPG, PNG, JPEG | Mobile phone photos
                    </p>
                    {formData.image && (
                      <p className='text-xs text-green-600 mt-1'>
                        Selected: {formData.image.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type='submit'
                className='w-full !h-12 bg-[#235789] hover:bg-[#235789] text-lg text-white py-3 rounded-lg font-medium'
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
