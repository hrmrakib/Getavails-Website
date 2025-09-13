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

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  date: string;
  image: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Behind the Stage Lights",
    description:
      "A closer look at what really happens before the concert begins.",
    category: "Artists",
    author: {
      name: "Lata Mangeshkar",
      avatar: "/placeholder.png",
      initials: "LM",
    },
    date: "05 Jan, 2025",
    image: "/blog/1.jpg",
  },
  {
    id: "2",
    title: "Behind the Stage Lights",
    description:
      "A closer look at what really happens before the concert begins.",
    category: "Agent",
    author: {
      name: "Lata Mangeshkar",
      avatar: "/placeholder.png",
      initials: "LM",
    },
    date: "05 Jan, 2025",
    image: "/blog/2.jpg",
  },
  {
    id: "3",
    title: "Behind the Stage Lights",
    description:
      "A closer look at what really happens before the concert begins.",
    category: "Manager",
    author: {
      name: "Lata Mangeshkar",
      avatar: "/placeholder.png",
      initials: "LM",
    },
    date: "05 Jan, 2025",
    image: "/blog/3.png",
  },
  {
    id: "4",
    title: "Behind the Stage Lights",
    description:
      "A closer look at what really happens before the concert begins.",
    category: "Venue",
    author: {
      name: "Lata Mangeshkar",
      avatar: "/placeholder.png",
      initials: "LM",
    },
    date: "05 Jan, 2025",
    image: "/blog/4.jpg",
  },
  {
    id: "5",
    title: "Behind the Stage Lights",
    description:
      "A closer look at what really happens before the concert begins.",
    category: "Agent",
    author: {
      name: "Lata Mangeshkar",
      avatar: "/placeholder.png",
      initials: "LM",
    },
    date: "05 Jan, 2025",
    image: "/blog/5.jpg",
  },
  {
    id: "6",
    title: "Behind the Stage Lights",
    description:
      "A closer look at what really happens before the concert begins.",
    category: "Artists",
    author: {
      name: "Lata Mangeshkar",
      avatar: "/placeholder.png",
      initials: "LM",
    },
    date: "05 Jan, 2025",
    image: "/blog/6.jpg",
  },
];

const categoryColors = {
  Artists: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Agent:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Manager: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Venue:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleEdit = (postId: string) => {
    console.log("Edit post:", postId);
    // Implement edit functionality here
  };

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
          <Link href='/blog-management/add-new-blog'>
            <Button className='flex items-center gap-2 bg-[#235789]'>
              <Plus className='h-4 w-4' />
              Add New Blog
            </Button>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className='overflow-hidden !border-none duration-200 pb-6'
            >
              <div className='relative rounded-2xl'>
                <Image
                  width={500}
                  height={500}
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className='w-full h-48 lg:h-64 object-cover rounded-2xl'
                />
              </div>

              <CardContent className='px-6 relative -mt-2'>
                <div className='flex items-center justify-between'>
                  <div className='top-3 left-3'>
                    <Badge
                      className={
                        categoryColors[
                          post.category as keyof typeof categoryColors
                        ]
                      }
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <div className='top-3 right-3'>
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
                          onClick={() => handleEdit(post.id)}
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
                      src={post.author.avatar || "/placeholder.png"}
                      alt={post.author.name}
                    />
                    <AvatarFallback className='text-xs'>
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <p className='text-base font-medium text-[#000000] truncate'>
                      {post.author.name}
                    </p>
                    <p className='text-xs text-muted-foreground'>{post.date}</p>
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
