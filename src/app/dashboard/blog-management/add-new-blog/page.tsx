/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import Quill from "quill";
// @ts-ignore
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/navigation";

export default function AddBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
        toast.error("Unsupported file type");
        return;
      }

      try {
        const res = await uploadMediaMutation(formData).unwrap();

        if (selectedFile.type.startsWith("image")) {
          setFileURL(res?.data?.images?.[0]);
        } else if (selectedFile.type.startsWith("video")) {
          setFileURL(res?.data?.videos?.[0]);
        }
      } catch (error) {
        toast.error("Error uploading media");
      }
    };

    uploadFile();
  }, [selectedFile, uploadMediaMutation]);

  useEffect(() => {
    let initialized = false;

    const init = async () => {
      if (initialized || quillRef.current) return;
      initialized = true;

      const Quill = (await import("quill")).default;

      if (editorRef.current && !editorRef.current.querySelector(".ql-editor")) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Enter your Terms and Conditions...",
        });

        quillRef.current = quill;

        quill.on("text-change", () => {
          setContent(quill.root.innerHTML);
        });
      }
    };

    if (typeof window !== "undefined") {
      init();
    }

    return () => {
      initialized = true;
    };
  }, []);

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
      content: content.trim(),
      banner_url: baseURL + fileURL,
      banner_type: bannerType,
    };

    try {
      const res = await createBlogMutation(payload).unwrap();

      if (res?.success) {
        toast.success("Blog created successfully!");
        router.push("/dashboard/blog-management");
      }
    } catch (error: any) {
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
            onClick={() => router.back()}
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

          {/* Blog Content */}
          <div>
            <Label
              htmlFor='contnet'
              className='text-lg font-medium text-[#222222] mb-2'
            >
              Blog Content
            </Label>

            <div className='h-auto w-FULL mx-auto flex flex-col justify-between gap-6'>
              <div className='space-y-6'>
                <div className='h-auto'>
                  <div
                    ref={editorRef}
                    className='h-[50vh] bg-white text-base'
                    id='quill-editor'
                  />
                </div>
              </div>
            </div>
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

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useRef, useState } from "react";
// import type React from "react";
// import "quill/dist/quill.snow.css";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import Image from "next/image";
// import {
//   useCreateBlogMutation,
//   useUploadMediaMutation,
// } from "@/redux/features/admin/blogAPI";
// import { toast } from "sonner";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useRouter } from "next/navigation";

// export default function AddBlogPage() {
//   const router = useRouter();

//   const editorRef = useRef<HTMLDivElement>(null);
//   const quillRef = useRef<any>(null);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState("");

//   const [preview, setPreview] = useState<string | null>(null);
//   const [fileType, setFileType] = useState<"image" | "video" | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [fileURL, setFileURL] = useState<string | null>(null);

//   const [bannerType, setBannerType] = useState<"image" | "video">("image");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
//   const [createBlog] = useCreateBlogMutation();

//   const baseURL = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";

//   // ✅ Init Quill
//   useEffect(() => {
//     if (!editorRef.current || quillRef.current) return;

//     let quillInstance: any;

//     const initQuill = async () => {
//       const { default: Quill } = await import("quill");

//       quillInstance = new Quill(editorRef.current!, {
//         theme: "snow",
//         placeholder: "Write blog content...",
//       });

//       quillInstance.on("text-change", () => {
//         setContent(quillInstance.root.innerHTML);
//       });

//       quillRef.current = quillInstance;
//     };

//     if (typeof window !== "undefined") {
//       initQuill();
//     }

//     return () => {
//       quillRef.current = null;
//     };
//   }, []);

//   useEffect(() => {
//     if (!editorRef.current || quillRef.current) return;

//     let quillInstance: any;

//     const initQuill = async () => {
//       const { default: Quill } = await import("quill");

//       quillInstance = new Quill(editorRef.current!, {
//         theme: "snow",
//         placeholder: "Write blog content...",
//       });

//       quillInstance.on("text-change", () => {
//         setContent(quillInstance.root.innerHTML);
//       });

//       quillRef.current = quillInstance;
//     };

//     if (typeof window !== "undefined") {
//       initQuill();
//     }

//     return () => {
//       quillRef.current = null;
//     };
//   }, []);

//   // ✅ Upload media
//   useEffect(() => {
//     if (!selectedFile) return;

//     const upload = async () => {
//       const formData = new FormData();

//       if (selectedFile.type.startsWith("image")) {
//         formData.append("images", selectedFile);
//       } else if (selectedFile.type.startsWith("video")) {
//         formData.append("videos", selectedFile);
//       } else {
//         toast.error("Unsupported file type");
//         return;
//       }

//       try {
//         const res = await uploadMedia(formData).unwrap();
//         const url = selectedFile.type.startsWith("image")
//           ? res?.data?.images?.[0]
//           : res?.data?.videos?.[0];

//         setFileURL(url);
//       } catch (err) {
//         toast.error("Media upload failed");
//       }
//     };

//     upload();
//   }, [selectedFile, uploadMedia]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setSelectedFile(file);
//     setFileType(file.type.startsWith("image") ? "image" : "video");

//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title || !description || !fileURL) {
//       toast.error("All fields are required");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         title: title.trim(),
//         description: description.trim(),
//         content,
//         banner_url: baseURL + fileURL,
//         banner_type: bannerType,
//       };

//       const res = await createBlog(payload).unwrap();

//       if (res?.success) {
//         toast.success("Blog created successfully");
//         router.push("/dashboard/blog-management");
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to create blog");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className='min-h-screen'>
//       <div className='container mx-auto max-w-2xl py-6'>
//         {/* Header */}
//         <div className='flex items-center gap-4 mb-6'>
//           <Button variant='ghost' size='sm' onClick={() => router.back()}>
//             <ArrowLeft />
//           </Button>
//           <h1 className='text-2xl font-semibold'>Add New Blog</h1>
//         </div>

//         <form onSubmit={handleSubmit} className='space-y-6'>
//           <Input
//             placeholder='Blog title'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <Textarea
//             placeholder='Blog description'
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />

//           {/* Quill */}
//           <div ref={editorRef} className='h-[50vh] bg-white' />

//           {/* Upload */}
//           <input
//             type='file'
//             accept='image/*,video/*'
//             onChange={handleFileChange}
//           />

//           {preview && fileType === "image" && (
//             <Image src={preview} alt='preview' width={200} height={200} />
//           )}

//           {preview && fileType === "video" && (
//             <video src={preview} controls className='h-48' />
//           )}

//           {isUploading && <Loader2 className='animate-spin' />}

//           <RadioGroup
//             value={bannerType}
//             onValueChange={(v) => setBannerType(v as "image" | "video")}
//           >
//             <RadioGroupItem value='image' /> Image
//             <RadioGroupItem value='video' /> Video
//           </RadioGroup>

//           <Button type='submit' disabled={isSubmitting}>
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }
