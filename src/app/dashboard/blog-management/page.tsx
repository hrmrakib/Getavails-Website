"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreVertical, Edit, Trash2, Plus, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const categoryColors = {
  Artists: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Agent:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Manager: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Venue:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const router = useRouter();
  const { data: blogs } = useGetBlogsQuery({});

  console.log(blogs?.data);

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      setBlogPosts((prev) => prev.filter((post) => post.id !== postToDelete));
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
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
          <DialogContent className='sm:max-w-md'>
            <DialogHeader className='text-center'>
              <div className='mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center'>
                <AlertTriangle className='h-6 w-6 text-red-600 dark:text-red-400' />
              </div>
              <DialogTitle className='text-lg font-semibold'>
                Delete Blog
              </DialogTitle>
              <DialogDescription className='text-muted-foreground'>
                Are you sure you want to delete this blog?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex flex-col-reverse sm:flex-row gap-2 sm:gap-0'>
              <Button
                variant='outline'
                onClick={handleDeleteCancel}
                className='flex-1 bg-transparent'
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                onClick={handleDeleteConfirm}
                className='flex-1'
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
