/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Mic, Send, CheckCheck, ArrowLeft } from "lucide-react";
import { useSocket } from "@/provider/SocketProvider";
import { useParams, useRouter } from "next/navigation";
import {
  useGetInboxChatsQuery,
  useGetMessagesQuery,
} from "@/redux/features/chat/chatAPI";
import { TMessagesResponse } from "./interface";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
dayjs.extend(relativeTime);

interface IChat {
  id: string;
  name: string;
  user_id: string;
  avatar: string;
  last_message: string;
  timestamp: string;
  unread: boolean;
  unread_count: number;
}

interface IMessage {
  id: string;
  created_at: string;
  updated_at: string;
  chat_id: string;
  parent_id: string | null;
  user_id: string;
  text: string;
  media_urls: string[];
  isDeleted: boolean;
  seen_by: string[];
  isOwner: boolean;
}

export default function MessagePage() {
  const [userInfo, setUserInfo] = useState({
    isAdmin: false,
    role: "",
  });
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { socket, onlineUsers } = useSocket();
  const { id: chat_id } = useParams<{ id: string }>();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<IChat | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { data: profile, isFetching } = useGetProfileQuery(undefined, {
    skip: !localStorage.getItem("access_token"),
  });
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data: messagesResponse, refetch: refetchMessages } =
    useGetMessagesQuery<{
      data: TMessagesResponse;
    }>({ page, limit, chat_id, search: undefined }, { skip: !chat_id });

  const { data: inboxChats, refetch: inboxRefetch } = useGetInboxChatsQuery(
    {
      page: 1,
      limit: 10,
      search: searchTerm,
      unread: activeTab,
    },
    { skip: false }
  );

  const messagesData = messagesResponse?.data || [];
  const totalPages = messagesResponse?.meta?.pagination?.totalPages;

  // ?scroll bottom
  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const prevLengthRef = useRef(0);

  useEffect(() => {
    // New message added (not pagination)
    if (messages.length > prevLengthRef.current) {
      scrollToBottom(true);
    }

    prevLengthRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    if (!messagesData?.length) return;

    setMessages((prev) => {
      const newItems = messagesData.filter(
        (msg) => !prev.some((p) => p.id === msg.id)
      );

      return [...prev, ...newItems];
    });
  }, [messagesData]);

  // Smoothest Infinity Scroll — IntersectionObserver
  useEffect(() => {
    if (isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px", // preload early
        threshold: 0.1,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [isFetching, messages]);

  /* =======================
     🔥 5s DEBOUNCE LOGIC
     ======================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setUserInfo({
      isAdmin: profile?.data?.is_admin || false,
      role: profile?.data?.role || "",
    });
  }, [profile?.data]);

  useEffect(() => {
    if (!inboxChats?.data) return;
    const contact = inboxChats.data.find((c: IChat) => c.id === chat_id);
    if (contact) {
      setSelectedContact(contact);
      if (window.innerWidth < 640) setIsMobileView(true);
    }
  }, [chat_id, inboxChats]);

  // ✅ Always returns a valid path (never undefined)
  const getRoleBasePath = () => {
    const isAdmin = profile?.data?.is_admin;
    const role = profile?.data?.role?.toLowerCase() || "";

    if (isAdmin) return "/dashboard/message";

    const map: Record<string, string> = {
      artist: "/dashboard/artist/message",
      agent: "/dashboard/agent/message",
      organizer: "/dashboard/organizer/message",
      venue: "/dashboard/venue/message",
      user: "/dashboard/user/message",
    };

    return map[role] || "/dashboard/user/message";
  };

  const handleSendMessageOLD = () => {
    if (!messageInput.trim()) return;

    socket?.emit(
      "send_message",
      {
        chat_id,
        text: messageInput,
      },
      () => refetchMessages()
    );

    setMessageInput("");
  };
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    if (!socket || !chat_id) return;

    const tempMessage: IMessage = {
      id: crypto.randomUUID(),
      chat_id: String(chat_id),
      text: messageInput,
      user_id: profile?.data?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      parent_id: null,
      media_urls: [],
      isDeleted: false,
      seen_by: [],
      isOwner: true,
    };

    setMessages((prev) => [...prev, tempMessage]);

    socket.emit("send_message", {
      chat_id: String(chat_id),
      text: messageInput,
    });

    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!socket) return;

    // const handler = (payload: any) => {
    //   const message = JSON.parse(payload).data;
    //   if (message.chat_id === chat_id) {
    //     refetchMessages();
    //   }
    // };

    const handler = (payload: any) => {
      const message = JSON.parse(payload).data;

      if (message.chat_id !== chat_id) return;

      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message]; // ✅ NEW MESSAGE BELOW
      });
    };

    socket.on("new_message", handler);

    return () => {
      socket.off("new_message", handler);
    };
  }, [socket, chat_id, refetchMessages]);

  const handleSelectContact = async (contact: IChat) => {
    inboxRefetch(); // force refetch

    setSelectedContact(contact);
    if (window.innerWidth < 640) {
      setIsMobileView(true);
    }

    router.push(`${getRoleBasePath()}/${contact.id}`);
  };

  const formatTime = (ts?: string) => {
    if (!ts) return "";
    const parts = ts.split("T")[1]?.split(".")[0];
    return parts || "";
  };

  return (
    <div className='bg-transparent flex flex-col h-[calc(100vh-140px)]'>
      <div className='flex-1 flex overflow-hidden'>
        <div
          className={`min-h-0 w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col ${
            isMobileView ? "hidden sm:flex" : "flex"
          }`}
        >
          {/* Search */}
          <div className='p-4 border-b'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Search messages or contacts...'
                value={searchTerm}
                onChange={(e) => setDebouncedSearch(e.target.value)}
                className='pl-10 bg-gray-50 border-gray-200'
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className='px-4 py-2 border-b flex gap-6'>
            <button
              onClick={() => setActiveTab(false)}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === false
                  ? "text-[#235789] border-[#235789]"
                  : "text-gray-500 border-transparent"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab(true)}
              className={`text-sm pb-2 border-b-2 ${
                activeTab === true
                  ? "text-[#235789] border-[#235789]"
                  : "text-gray-500 border-transparent"
              }`}
            >
              Unread
            </button>
          </div>

          {/* Contact List */}
          <div className='flex-1 min-h-0 overflow-y-auto'>
            {inboxChats?.data?.map((contact: IChat) => (
              <div
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedContact?.id === contact.id
                    ? "bg-blue-50 border-blue-100"
                    : ""
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div className='relative'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + contact.avatar}
                      />
                      <AvatarFallback>
                        {contact?.name
                          ?.split(" ")
                          ?.map((n) => n[0])
                          ?.join("")}
                      </AvatarFallback>
                    </Avatar>

                    {onlineUsers.includes(contact.user_id) && (
                      <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full' />
                    )}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between text-sm'>
                      <p className='font-medium truncate'>{contact?.name}</p>
                      <span>{formatTime(contact.timestamp)}</span>
                    </div>
                    <p className='text-gray-600 truncate text-sm mt-1'>
                      {contact?.last_message?.slice(0, 30)}
                    </p>
                  </div>

                  {contact.unread_count > 0 && (
                    <div className='bg-[#235789] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                      {contact.unread_count}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col ${
            !isMobileView && !selectedContact ? "hidden sm:flex" : "flex"
          }`}
        >
          {!selectedContact ? (
            <div className='flex flex-1 items-center justify-center text-gray-500'>
              Select a conversation to start messaging
            </div>
          ) : (
            <>
              {/* Header */}
              <div className='sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3'>
                <button
                  className='sm:hidden text-gray-600'
                  onClick={() => {
                    setIsMobileView(false);
                    setSelectedContact(null);
                  }}
                >
                  <ArrowLeft className='h-5 w-5 mr-2' />
                </button>

                <Avatar>
                  <AvatarImage src={selectedContact.avatar} />
                  <AvatarFallback>
                    {selectedContact?.name
                      ?.split(" ")
                      ?.map((n) => n[0])
                      ?.join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className='font-medium'>{selectedContact?.name}</p>
                  <p className='text-sm text-gray-500'>
                    Last seen {formatTime(selectedContact.timestamp)}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
                {messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.isOwner ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-lg ${
                        msg.isOwner
                          ? "bg-[#235789] text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className='text-sm'>{msg.text}</p>
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs ${
                          msg.isOwner ? "justify-end" : "justify-start"
                        }`}
                      >
                        {dayjs(msg.updated_at || msg.created_at).fromNow()}
                        {msg.isOwner && msg.seen_by.length > 1 && (
                          <CheckCheck className='text-blue-200' />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* 🔥 AUTO SCROLL TARGET */}
                <div ref={bottomRef} />

                {/* 🔥 Invisible Trigger for Smooth Infinite Scroll */}
                <div ref={loaderRef} className='h-10'></div>
              </div>

              {/* Input */}
              <div className='bg-white border-t pt-4 pl-4'>
                <div className='flex items-center gap-2 relative'>
                  <Input
                    placeholder='Write your message...'
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className='pr-20 h-12 bg-gray-50 border-gray-200'
                  />

                  <div className='absolute right-2 top-1/2 -translate-y-1/2 flex gap-2'>
                    {/* <Button variant='ghost' size='icon'>
                      <Mic className='h-4 w-4 text-gray-400' />
                    </Button> */}

                    <Button
                      onClick={handleSendMessage}
                      size='icon'
                      className='bg-[#235789] hover:bg-[#235789]'
                    >
                      <Send className='h-4 w-4 text-white' />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
