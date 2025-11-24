"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Search, Filter } from "lucide-react";
import {
  useDeleteMailMutation,
  useGetUserMailQuery,
  useMarkAsReadMutation,
} from "@/redux/features/mail/mailAPI";
import { toast } from "sonner";

export interface Inquiry {
  id: string;
  timestamp: string;
  remarks: string;
  name: string;
  email: string;
  message: string;
  unread: boolean;
}

export default function AdminMessagesPage() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>("USER");
  const [filterRead, setFilterRead] = useState<boolean>(true);
  const {
    data: userMail,
    isLoading,
    refetch,
  } = useGetUserMailQuery({
    page: 1,
    limit: 10,
    search,
    unread: filterRead,
    remarks: filterRole,
  });
  const [markAsReadMutation] = useMarkAsReadMutation();
  const [deleteMailMutation] = useDeleteMailMutation();

  useEffect(() => {
    refetch();
  }, [search, filterRole, filterRead]);

  console.log("mail -> ", filterRead);

  const totalMail = userMail?.meta?.pagination?.total || 0;
  const newMail = userMail?.data?.filter(
    (mail: Inquiry) => mail.unread === true
  );

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await deleteMailMutation({
        mail_id: id,
      }).unwrap();

      if (res?.success) {
        refetch();
      }
    } catch (error) {
      console.error("Error occurred", error);
      toast.error("Unexpected error occurred!");
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await markAsReadMutation({
        mail_id: id,
      }).unwrap();

      console.log(res);
      if (res?.success) {
        refetch();
      }
    } catch (error) {
      console.error("Error occurred", error);
      toast.error("Unexpected error occurred!");
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ARTIST":
        return "bg-blue-100 text-blue-800";
      case "AGENT":
        return "bg-purple-100 text-purple-800";
      case "VENUE":
        return "bg-green-100 text-green-800";
      case "ORGANIZER":
        return "bg-orange-100 text-orange-800";
      case "USER":
        return "bg-pink-100 text-white-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (isLoading) {
    return (
      <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='animate-pulse'>
            <div className='h-8 bg-slate-200 rounded w-1/3 mb-8'></div>
            <div className='space-y-4'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='h-20 bg-slate-200 rounded'></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen !bg-white'>
      {/* Header */}
      <div className='bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-slate-900'>Messages</h1>
              <p className='text-slate-600 mt-1 text-sm'>
                {newMail?.length} unread message
                {newMail?.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className='flex gap-2'>
              <Badge
                variant='outline'
                className='bg-blue-50 text-blue-700 border-blue-200'
              >
                {totalMail} Total
              </Badge>
              {newMail?.length > 0 && (
                <Badge className='bg-red-500 text-white'>
                  {newMail?.length} New
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='!bg-white sticky top-0 z-10'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='space-y-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
              <Input
                placeholder='Search by name, email, or message content...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='pl-10'
              />
            </div>

            {/* Filters */}
            <div className='flex flex-col sm:flex-row gap-3 items-stretch sm:items-center'>
              <div className='flex items-center gap-2 text-slate-700 font-medium'>
                <Filter className='w-4 h-4' />
                <span className='text-sm'>Filter:</span>
              </div>

              <div className='flex flex-wrap gap-2'>
                {/* Role Filter */}
                {["USER", "ARTIST", "AGENT", "VENUE", "ORGANIZER"].map(
                  (role) => (
                    <Button
                      key={role}
                      variant={filterRole === role ? "default" : "outline"}
                      size='sm'
                      onClick={() =>
                        setFilterRole(filterRole === role ? null : role)
                      }
                      className={
                        filterRole === role ? "bg-[#235789] text-white" : ""
                      }
                    >
                      {role}
                    </Button>
                  )
                )}
              </div>

              {/* Read Status Filter */}
              <div className='flex gap-2 ml-auto'>
                <Button
                  variant={filterRead === true ? "default" : "outline"}
                  size='sm'
                  onClick={() => setFilterRead(true)}
                  className={
                    filterRead === true ? "bg-amber-600 text-white" : ""
                  }
                >
                  Unread
                </Button>
                <Button
                  variant={filterRead === false ? "default" : "outline"}
                  size='sm'
                  onClick={() => setFilterRead(false)}
                  className={
                    filterRead === false ? "bg-green-600 text-white" : ""
                  }
                >
                  Read
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className='max-w-6xl mx-auto !bg-white px-4 sm:px-6 lg:px-8 py-8'>
        {userMail?.data?.length === 0 ? (
          <Card className='p-12 text-center'>
            <p className='text-slate-600 text-lg'>No messages found</p>
            <p className='text-slate-400 text-sm mt-2'>
              Try adjusting your filters or search terms
            </p>
          </Card>
        ) : (
          <div className='space-y-6'>
            {userMail?.data?.map((msg: Inquiry) => (
              <Link
                key={msg.id}
                href={`/dashboard/user-query/${msg.id}`}
                // onClick={() => handleMarkAsRead(msg.id)}
              >
                <Card
                  className={`!bg-white p-4 hover:shadow-md transition-all cursor-pointer border-l-4 mb-2 ${
                    msg.unread
                      ? "border-l-slate-300"
                      : "border-l-[#235789] shadow-sm"
                  }`}
                >
                  <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
                    {/* Left Content */}
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-start gap-2 mb-2'>
                        <div className='flex-1'>
                          <h3 className='font-semibold text-slate-900 text-sm sm:text-base truncate'>
                            {msg.name}
                          </h3>
                          <p className='text-xs sm:text-sm text-slate-500 truncate'>
                            {msg.email}
                          </p>
                        </div>
                        {!msg.unread && (
                          <div className='flex-shrink-0 w-2 h-2 rounded-full bg-[#235789] mt-2'></div>
                        )}
                      </div>

                      {/* Role and Message Preview */}
                      <div className='mb-2'>
                        <Badge
                          className={`${getRoleBadgeColor(
                            msg.remarks
                          )} text-xs mb-2`}
                        >
                          {msg.remarks}
                        </Badge>
                        <p className='text-slate-700 text-sm line-clamp-2'>
                          {msg.message}
                        </p>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className='flex items-center justify-between sm:flex-col gap-2 sm:gap-3 sm:text-right flex-shrink-0'>
                      <span className='text-xs text-slate-500 whitespace-nowrap'>
                        {formatDate(msg.timestamp.split("T")[0])}
                      </span>

                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={(e) => {
                            e.preventDefault();
                            handleMarkAsRead(msg.id);
                          }}
                          className='hidden sm:inline-flex'
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={(e) => handleDelete(msg.id, e)}
                          className='text-red-600 hover:bg-red-50 hover:text-red-700'
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
