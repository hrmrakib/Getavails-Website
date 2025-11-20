/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreVertical, Edit, Trash2, Plus, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "@/redux/features/admin/blogAPI";
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

export default function BlogPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const router = useRouter();
  const { data: blogs, isLoading, refetch } = useGetBlogsQuery({});
  const [deleteBlogMutation, { isLoading: isDeleting }] =
    useDeleteBlogMutation();

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleBlogDeleteConfirm = async () => {
    try {
      const res = await deleteBlogMutation({
        blog_id: postToDelete,
      }).unwrap();
      console.log(res);
      if (res?.success) {
        refetch();
        toast.success("Blog deleted successfully!");
        router.push("/dashboard/blog-management");
      }
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      toast.error(error?.data?.message || "Failed to delete blog");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className='min-h-screen bg-transparent'>
      <div className='container mx-auto py-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
          <div></div>
          <Link href='/dashboard/blog-management/add-new-blog'>
            <Button className='flex items-center gap-2 bg-[#235789]'>
              <Plus className='h-4 w-4' />
              Add New Blog
            </Button>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {isLoading && (
            <div className='col-span-3 flex justify-center items-center'>
              <Loader2 className='animate-spin' />
            </div>
          )}
          {blogs?.data?.map((post: BlogPost) => (
            <Card
              key={post.id}
              className='overflow-hidden !border-none duration-200 pb-6'
            >
              <div className='relative rounded-2xl'>
                {post.banner_type === "video" ? (
                  <video
                    src={post.banner_url}
                    controls
                    className='w-full h-48 lg:h-64 object-cover rounded-2xl'
                  />
                ) : (
                  <Image
                    width={500}
                    height={500}
                    src={post.banner_url}
                    alt={post.title}
                    className='w-full h-48 lg:h-64 object-cover rounded-2xl'
                  />
                )}
              </div>

              <CardContent className='px-6 relative -mt-2'>
                <div className='flex items-center justify-between'>
                  <div className='absolute top-3 right-3 items-end'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0 bg-white/80 hover:bg-white/90 backdrop-blur-sm'
                        >
                          <MoreVertical className='h-4 w-4' />
                          <span className='sr-only'>Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end' className='w-40'>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              "/dashboard/blog-management/edit-blog/" + post.id
                            )
                          }
                          className='flex items-center gap-2 cursor-pointer'
                        >
                          <Edit className='h-4 w-4' />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(post.id)}
                          className='flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive'
                        >
                          <Trash2 className='h-4 w-4' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <h3 className='text-xl lg:text-2xl font-semibold text-[#000000] mb-2 line-clamp-2'>
                  {post.title}
                </h3>
                <p className='text-[#4D4D4D] text-base mb-4 line-clamp-2'>
                  {post.description}
                </p>

                <div className='flex items-center gap-3'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage
                      src={post.admin.avatar || "/placeholder.png"}
                      alt={post.admin.name}
                    />
                    <AvatarFallback className='text-xs'>
                      {post.admin.name.split(" ").map((name) => name[0])}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <p className='text-base font-medium text-[#000000] truncate'>
                      {post.admin.name}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {post.published_at.split("T")[0]}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className='sm:max-w-[400px]'>
            <DialogHeader>
              <DialogTitle className='text-red-600'>
                Delete Confirmation
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to <b>delete this item</b>? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleDeleteCancel} variant='outline'>
                  Cancel
                </Button>
              </DialogClose>

              <Button variant='destructive' onClick={handleBlogDeleteConfirm}>
                Yes, Delete{" "}
                {isDeleting ? <Loader2 className='animate-spin' /> : ""}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
