"use client";

import type React from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { X, Cloud } from "lucide-react";

export default function BlogHero() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
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
    <div className='z-0 h-[630px] bg-[url("/blog-banner.jpg")] bg-cover relative overflow-hidden'>
      {/* Golden light rays background effect */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]'>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent rotate-12 blur-3xl'></div>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/15 to-transparent -rotate-12 blur-2xl'></div>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent rotate-45 blur-xl'></div>
        </div>
      </div>

      <div className='relative z-10 container mx-auto px-4 py-8 md:py-16'>
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

        {/* Additional content area for selected cards */}
        {selectedCard && (
          <div className='mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20'>
            <p className='text-white text-center'>
              You selected the {selectedCard} card. Additional content or
              actions can be displayed here.
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className='z-[999] fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl w-full max-w-md mx-auto shadow-2xl'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <h2 className='text-xl font-semibold text-gray-900'>
                Add New Blog
              </h2>
              <button
                onClick={handleCloseModal}
                className='p-1 hover:bg-gray-100 rounded-full transition-colors'
              >
                <X className='w-5 h-5 text-gray-500' />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className='p-6 space-y-6'>
              {/* Blog Title */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Blog Title
                </label>
                <Input
                  type='text'
                  placeholder='Enter blog title'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className='w-full'
                  required
                />
              </div>

              {/* Blog Details */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
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
                        className='bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        Select File
                      </Button>
                    </label>
                    <p className='text-xs text-gray-500 mt-2'>
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
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium'
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
