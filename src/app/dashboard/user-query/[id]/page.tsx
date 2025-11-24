"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Copy, Check } from "lucide-react";
import {
  useGetSingleMailQuery,
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

export default function MessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState<Inquiry | null>(null);
  const [copied, setCopied] = useState(false);
  const [markAsReadMutation] = useMarkAsReadMutation();
  const { data: mail, isLoading, refetch } = useGetSingleMailQuery(params.id);

  const msg = (mail?.data as Inquiry) || [];

  useEffect(() => {
    setMessage(msg);
  }, [mail]);

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

  useEffect(() => {
    if (!isLoading && mail?.data?.unread) {
      handleMarkAsRead(params.id as string);
    }
  }, [mail, isLoading]);

  const copyToClipboard = () => {
    if (!message) return;
    const text = `Name: ${message.name}\nEmail: ${message.email}\nRole: ${message.remarks}\n\nMessage:\n${message.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "USER":
        return "bg-pink-800 text-gray-100";
      case "ARTIST":
        return "bg-blue-100 text-blue-800";
      case "AGENT":
        return "bg-purple-100 text-purple-800";
      case "VENUE":
        return "bg-green-100 text-green-800";
      case "ORGANIZER":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatFullDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='animate-pulse space-y-6'>
            <div className='h-10 bg-slate-200 rounded w-1/4'></div>
            <div className='space-y-4'>
              <div className='h-20 bg-slate-200 rounded'></div>
              <div className='h-40 bg-slate-200 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!msg) {
    return (
      <div className='min-h-screen bg-white p-4 sm:p-6 flex items-center justify-center'>
        <Card className='p-8 text-center max-w-md'>
          <h2 className='text-2xl font-bold text-slate-900 mb-2'>
            Message Not Found
          </h2>
          <p className='text-slate-600 mb-6'>
            The message you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/admin/messages")}
            className='bg-[#235789] hover:bg-[#13599b] text-white'
          >
            Back to Messages
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='bg-white sticky top-0 z-10'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <Button
            variant='ghost'
            onClick={() => router.push("/dashboard/user-query")}
            className='flex items-center gap-2 text-slate-600 hover:text-slate-900 -ml-2'
          >
            <ArrowLeft className='w-5 h-5' />
            <span className='text-sm sm:text-base'>Back to Messages</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Message Card */}
        <Card className='bg-white mb-6'>
          {/* Sender Info */}
          <div className='bg-gradient-to-r from-blue-50 to-blue-100 px-6 sm:px-8 py-6 border-b border-blue-200'>
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-2'>
                  {msg.name}
                </h1>
                <a
                  href={`mailto:${msg.email}`}
                  className='text-blue-600 hover:underline text-sm sm:text-base mb-3 inline-block'
                >
                  {msg.email}
                </a>
                <div className='flex items-center gap-3'>
                  <Badge className={`${getRoleBadgeColor(msg.remarks)}`}>
                    {msg.remarks}
                  </Badge>
                  <span className='text-xs sm:text-sm text-slate-600'>
                    {formatFullDate(msg.timestamp.split("T")[0])}
                  </span>
                </div>
              </div>

              <Button
                variant='outline'
                onClick={copyToClipboard}
                className='w-full sm:w-auto bg-transparent'
              >
                {copied ? (
                  <>
                    <Check className='w-4 h-4 mr-2' />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className='w-4 h-4 mr-2' />
                    Copy Info
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Message Content */}
          <div className='px-6 sm:px-8 py-6 border-b border-slate-200'>
            <h2 className='text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3'>
              Message
            </h2>
            <div className='bg-slate-50 rounded-lg p-4 border border-slate-200'>
              <p className='text-slate-800 text-base leading-relaxed whitespace-pre-wrap'>
                {msg.message}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
