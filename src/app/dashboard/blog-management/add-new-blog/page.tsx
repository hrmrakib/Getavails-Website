"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface AddBlogPageProps {
  onBack: () => void;
  onSubmit: (blogData: {
    title: string;
    description: string;
    image: File | null;
  }) => void;
}

export default function AddBlogPage({ onBack, onSubmit }: AddBlogPageProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPG, PNG, JPEG)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a blog title");
      return;
    }

    if (!description.trim()) {
      alert("Please enter blog details");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        image: selectedImage,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to create blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-transparent'>
      <div className='container mx-auto px-4 py-6 max-w-2xl'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onBack}
            className='p-2 hover:bg-muted'
          >
            <ArrowLeft className='h-5 w-5 text-[#000000]' />
            <span className='sr-only'>Go back</span>
          </Button>
          <h1 className='text-2xl font-semibold text-[#000000]'>
            Add New Blog
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Blog Title */}
          <div className='space-y-2'>
            <Label
              htmlFor='title'
              className='text-lg font-medium text-[#222222]'
            >
              Blog Title
            </Label>
            <Input
              id='title'
              type='text'
              placeholder='Enter blog title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full h-12 !text-lg text-black bg-[#F3F3F3] border border-[#D0D0D0]'
              required
            />
          </div>

          {/* Blog Details */}
          <div className='space-y-2'>
            <Label
              htmlFor='description'
              className='text-lg font-medium text-[#222222]'
            >
              Blog Details
            </Label>
            <Textarea
              id='description'
              placeholder='Enter Blog details'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full min-h-[120px] resize-none !text-lg text-black !border border-[#D0D0D0]'
              required
            />
          </div>

          {/* Image Upload */}
          <div className='space-y-2'>
            <Label className='text-lg font-medium text-[#222222]'>
              Upload Image
            </Label>

            <div className='border-2 border-dashed border-[#B1B1B1] rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors'>
              {imagePreview ? (
                <div className='space-y-4'>
                  <Image
                    width={200}
                    height={200}
                    src={imagePreview || "/placeholder.svg"}
                    alt='Preview'
                    className='max-w-full h-48 object-cover rounded-lg mx-auto'
                  />
                  <div className='flex flex-col sm:flex-row gap-2 justify-center'>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                    >
                      Remove Image
                    </Button>
                    <Label htmlFor='image-upload' className='cursor-pointer'>
                      <Button type='button' variant='outline' size='sm' asChild>
                        <span>Change Image</span>
                      </Button>
                    </Label>
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div className='mx-auto w-16 h-16  rounded-full flex items-center justify-center'>
                    <svg
                      width='64'
                      height='64'
                      viewBox='0 0 64 64'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M42.9061 12.1835C46.103 14.9866 48.5614 18.9148 48.8746 23.2501C48.9112 24.2917 48.8991 25.3333 48.8746 26.3751C49.0381 26.3709 49.2017 26.3667 49.3702 26.3624C49.9595 26.3631 50.4973 26.4449 51.0699 26.5782C51.1665 26.6004 51.2632 26.6226 51.3627 26.6454C55.3134 27.5959 58.5999 30.0552 60.7293 33.5042C62.0965 35.8186 62.6751 38.3413 62.6715 41.0157C62.6714 41.1432 62.6714 41.1432 62.6713 41.2734C62.6662 42.6555 62.5566 43.9341 62.1246 45.2501C62.0971 45.3357 62.0697 45.4214 62.0414 45.5097C60.8161 49.2438 58.2182 52.3174 54.7442 54.1461C53.8565 54.5946 52.9556 54.9591 51.9996 55.2344C51.9183 55.2583 51.8371 55.2822 51.7534 55.3068C49.7053 55.8496 47.5661 55.7861 45.4669 55.7824C45.14 55.7827 44.8131 55.7832 44.4861 55.7837C43.6952 55.7848 42.9043 55.7846 42.1134 55.7839C41.4698 55.7833 40.8262 55.7832 40.1826 55.7835C40.0445 55.7836 40.0445 55.7836 39.9036 55.7836C39.7165 55.7837 39.5294 55.7838 39.3422 55.7839C37.5932 55.7846 35.8441 55.7838 34.095 55.7824C32.5986 55.7813 31.1023 55.7815 29.6059 55.7827C27.8625 55.784 26.1191 55.7845 24.3757 55.7838C24.1893 55.7837 24.0029 55.7836 23.8166 55.7835C23.7249 55.7835 23.6332 55.7834 23.5388 55.7834C22.897 55.7832 22.2552 55.7835 21.6134 55.7841C20.7474 55.7849 19.8815 55.7844 19.0155 55.7829C18.6991 55.7826 18.3828 55.7827 18.0664 55.7832C13.8929 55.7899 13.8929 55.7899 12.0152 55.2422C11.924 55.216 11.8327 55.1898 11.7387 55.1628C8.1322 54.0632 4.94878 51.5443 3.12276 48.2332C1.39396 44.9615 0.67969 40.8559 1.71785 37.2354C1.76925 37.0734 1.8215 36.9116 1.87459 36.7501C1.91377 36.6248 1.91377 36.6248 1.95375 36.497C2.54226 34.6499 3.46715 32.9565 4.74959 31.5001C4.87817 31.3468 4.87817 31.3468 5.00935 31.1905C7.22851 28.6121 10.5906 26.7329 13.9996 26.3751C14.3747 26.3678 14.7494 26.3695 15.1246 26.3751C15.1226 26.2915 15.1207 26.208 15.1186 26.1219C15.02 21.2729 16.3596 17.0778 19.7496 13.5001C19.8537 13.3879 19.9578 13.2758 20.065 13.1602C26.0299 6.93293 36.3951 6.69246 42.9061 12.1835ZM29.8996 25.6765C29.8182 25.7572 29.7368 25.838 29.653 25.9212C29.3854 26.1871 29.1192 26.4544 28.8531 26.7217C28.6671 26.9075 28.481 27.0933 28.2948 27.2789C27.9054 27.6678 27.5168 28.0572 27.1286 28.4472C26.631 28.9469 26.1319 29.4448 25.6322 29.9423C25.2478 30.3253 24.8643 30.7092 24.4811 31.0933C24.2974 31.2773 24.1134 31.461 23.9291 31.6444C23.6718 31.9008 23.4157 32.1584 23.1599 32.4163C23.0836 32.4917 23.0074 32.5672 22.9288 32.645C22.4042 33.1776 22.0938 33.6443 22.0699 34.4141C22.1016 35.4811 22.8669 36.1844 23.6011 36.8848C24.2278 37.4354 24.7318 37.5423 25.5421 37.5621C26.5658 37.3712 27.2367 36.5582 27.9293 35.8438C28.0326 35.7388 28.136 35.6337 28.2425 35.5255C28.4957 35.2678 28.7481 35.0094 28.9996 34.7501C28.9998 34.8204 29 34.8908 29.0001 34.9633C29.0048 36.6797 29.0122 38.3961 29.0226 40.1125C29.0275 40.9426 29.0315 41.7726 29.0335 42.6027C29.0354 43.4043 29.0397 44.2059 29.0456 45.0074C29.0475 45.3127 29.0485 45.618 29.0486 45.9233C29.0489 46.3521 29.0523 46.7807 29.0563 47.2095C29.0557 47.3347 29.0551 47.46 29.0544 47.589C29.0685 48.545 29.2588 49.4213 29.8702 50.1797C29.9923 50.2764 29.9923 50.2764 30.1168 50.3751C30.1978 50.4421 30.2789 50.5091 30.3624 50.5782C31.1213 51.0756 31.8657 51.0909 32.7496 51.0001C33.5128 50.788 34.0896 50.2975 34.4996 49.6251C34.8683 48.8093 34.9299 48.127 34.9286 47.2379C34.9299 47.1024 34.9312 46.9669 34.9325 46.8273C34.9362 46.3823 34.9374 45.9373 34.9386 45.4922C34.9407 45.1826 34.9429 44.8729 34.9454 44.5633C34.9513 43.7504 34.955 42.9374 34.9583 42.1245C34.962 41.2941 34.9678 40.4637 34.9735 39.6334C34.9842 38.0056 34.9927 36.3778 34.9996 34.7501C35.0676 34.82 35.1356 34.89 35.2057 34.9621C35.5162 35.2805 35.8282 35.5973 36.1402 35.9141C36.2472 36.0243 36.3542 36.1344 36.4644 36.2479C36.5692 36.3538 36.6739 36.4598 36.7818 36.5689C36.8774 36.6664 36.973 36.764 37.0714 36.8645C37.701 37.4057 38.2582 37.5742 39.0694 37.5416C40.0975 37.4017 40.8602 36.5034 41.4996 35.7501C41.7596 35.3046 41.9271 34.956 41.9215 34.4376C41.9224 34.3486 41.9234 34.2597 41.9244 34.168C41.7855 33.3512 41.2618 32.8331 40.6981 32.2751C40.6174 32.1937 40.5367 32.1123 40.4535 32.0284C40.1876 31.7609 39.9203 31.4947 39.6529 31.2286C39.4671 31.0425 39.2814 30.8564 39.0957 30.6703C38.7069 30.2809 38.3174 29.8922 37.9274 29.504C37.4278 29.0065 36.9298 28.5073 36.4324 28.0076C36.0494 27.6233 35.6655 27.2398 35.2813 26.8566C35.0973 26.6729 34.9136 26.4889 34.7302 26.3046C34.4738 26.0473 34.2163 25.7912 33.9584 25.5353C33.8829 25.4591 33.8074 25.3829 33.7297 25.3043C33.1133 24.6972 32.6559 24.4783 31.7696 24.4547C30.9655 24.5899 30.4479 25.1227 29.8996 25.6765Z'
                        fill='#235789'
                      />
                    </svg>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-muted-foreground font-medium'>
                      Upload Image
                    </p>
                    <Label htmlFor='image-upload' className='cursor-pointer'>
                      <Button
                        type='button'
                        size='sm'
                        asChild
                        className='bg-[#235789] hover:bg-[#1e6fbb] text-white w-[122px] h-[40px] mx-auto rounded-full'
                      >
                        <span>Select File</span>
                      </Button>
                    </Label>
                  </div>
                </div>
              )}

              <input
                id='image-upload'
                type='file'
                accept='image/jpeg,image/jpg,image/png'
                onChange={handleImageChange}
                className='hidden'
              />

              <p className='text-base text-[#333338] mt-4'>
                Supported format: JPG, PNG, JPEG (Mobile phone photos)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4 flex justify-center'>
            <Button
              type='submit'
              className='bg-[#235789] hover:bg-[#1e6fbb] text-white w-[122px] h-[40px] mx-auto rounded-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
