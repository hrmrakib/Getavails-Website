/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  useCreateBlogMutation,
  useUploadMediaMutation,
} from "@/redux/features/admin/blogAPI";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [bannerType, setBannerType] = useState<"image" | "video">("image");
  const [uploadMediaMutation, { isLoading: isUploading }] =
    useUploadMediaMutation();
  const [createBlogMutation] = useCreateBlogMutation();

  useEffect(() => {
    if (!selectedFile) return;

    const uploadFile = async () => {
      const formData = new FormData();

      if (selectedFile.type.startsWith("image")) {
        formData.append("images", selectedFile);
      } else if (selectedFile.type.startsWith("video")) {
        formData.append("videos", selectedFile);
      } else {
        console.error("Unsupported file type");
        return;
      }

      try {
        const res = await uploadMediaMutation(formData).unwrap();
        console.log("Asset:", res);

        if (selectedFile.type.startsWith("image")) {
          setFileURL(res?.data?.images?.[0]);
        } else if (selectedFile.type.startsWith("video")) {
          setFileURL(res?.data?.videos?.[0]);
        }
      } catch (error) {
        console.error("Error uploading media:", error);
      }
    };

    uploadFile();
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image")) {
      setFileType("image");
    } else if (file.type.startsWith("video")) {
      setFileType("video");
    } else {
      alert("Unsupported file type");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a blog title");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter blog details");
      return;
    }

    if (!fileURL) {
      toast.error("Please upload an image or video or enter a URL");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      content: description.trim(),
      banner_url: baseURL + fileURL,
      banner_type: bannerType,
    };

    try {
      const res = await createBlogMutation(payload).unwrap();

      if (!res?.success) {
        toast.success("Blog created successfully!");
      }
    } catch (error: any) {
      console.error("Error creating blog:", error);
      toast.error(error?.data?.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
      // Reset form
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setPreview(null);
      setFileURL(null);
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
              Upload Image or Video
            </Label>

            <div className='border-2 border-dashed border-[#B1B1B1] rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors'>
              {preview ? (
                <div className='space-y-4'>
                  {/* IMAGE PREVIEW */}
                  {fileType === "image" && (
                    <Image
                      width={200}
                      height={200}
                      src={preview}
                      alt='Preview'
                      className='max-w-full h-48 object-cover rounded-lg mx-auto'
                    />
                  )}

                  {/* VIDEO PREVIEW */}
                  {fileType === "video" && (
                    <video
                      src={preview}
                      controls
                      className='max-w-full h-48 rounded-lg mx-auto'
                    />
                  )}

                  <div className='flex flex-col sm:flex-row gap-2 justify-center'>
                    {/* REMOVE BUTTON */}
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => {
                        setPreview(null);
                        setSelectedFile(null);
                      }}
                    >
                      Remove
                    </Button>

                    {/* CHANGE BUTTON */}
                    <Label htmlFor='media-upload' className='cursor-pointer'>
                      <Button type='button' variant='outline' size='sm' asChild>
                        <span>Change File</span>
                      </Button>
                    </Label>
                  </div>
                </div>
              ) : (
                // EMPTY STATE
                <div className='space-y-4'>
                  <div className='mx-auto w-16 h-16 rounded-full flex items-center justify-center'>
                    📁
                  </div>

                  <div className='space-y-2'>
                    <p className='text-muted-foreground font-medium'>
                      Upload Image or Video
                    </p>

                    <Label htmlFor='media-upload' className='cursor-pointer'>
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

              {/* FILE INPUT */}
              <input
                id='media-upload'
                type='file'
                accept='image/jpeg,image/jpg,image/png,video/mp4,video/webm,video/ogg'
                onChange={handleFileChange}
                className='hidden'
              />

              <p className='text-base text-[#333338] mt-4'>
                Supported formats: JPG, PNG, JPEG, MP4, WEBM, OGG
              </p>
            </div>
          </div>

          <div className='text-lg text-green-500'>
            {isUploading && (
              <p>
                <Loader2 className='mr-2 animate-spin' /> Uploading...
              </p>
            )}
          </div>

          <RadioGroup
            value={bannerType}
            onValueChange={(val) => setBannerType(val as "image" | "video")}
          >
            <Label className='text-lg font-medium text-[#222222]'>
              Banner Type
            </Label>
            <div className='flex items-center gap-3'>
              <RadioGroupItem value='image' id='r2' />
              <Label htmlFor='r2'>Image</Label>
            </div>

            <div className='flex items-center gap-3'>
              <RadioGroupItem value='video' id='r3' />
              <Label htmlFor='r3'>Video</Label>
            </div>
          </RadioGroup>

          {/* Blog URL */}
          <div className='space-y-2'>
            <Label htmlFor='url' className='text-lg font-medium text-[#222222]'>
              Blog Image or Video URL
            </Label>
            <Input
              id='url'
              type='text'
              placeholder='Enter image or video URL'
              value={fileURL ?? ""}
              onChange={(e) => setFileURL(e.target.value)}
              className='w-full h-12 !text-lg text-black bg-[#F3F3F3] border border-[#D0D0D0]'
              required
            />
          </div>

          {/* Submit Button */}
          <div className='pt-4 flex justify-center'>
            <Button
              type='submit'
              className='bg-[#235789] hover:bg-[#1e6fbb] text-white w-[122px] h-[40px] mx-auto rounded-full disabled:cursor-not-allowed'
              disabled={isSubmitting || !fileURL || !title || !description}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
