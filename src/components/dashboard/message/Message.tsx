"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Mic, Send, CheckCheck } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isSent: boolean;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "X-AE-A-13b",
    avatar: "/message/1.png",
    lastMessage: "Enter your message description here...",
    timestamp: "12:25",
    isOnline: true,
  },
  {
    id: "2",
    name: "Pippins McGray",
    avatar: "/message/2.png",
    lastMessage: "Please call me back on 08193843...",
    timestamp: "12:25",
  },
  {
    id: "3",
    name: "McKinsey Vermillion",
    avatar: "/message/3.png",
    lastMessage: "Enter your message description here...",
    timestamp: "12:25",
    unreadCount: 8,
    isOnline: true,
  },
  {
    id: "4",
    name: "X-AE-A-13b",
    avatar: "/message/4.png",
    lastMessage: "Enter your message description here...",
    timestamp: "12:25",
    isOnline: true,
  },
  {
    id: "5",
    name: "Pippins McGray",
    avatar: "/message/5.png",
    lastMessage: "Please call me back on 08193843...",
    timestamp: "12:25",
  },
  {
    id: "6",
    name: "X-AE-A-13b",
    avatar: "/message/6.png",
    lastMessage: "Enter your message description here...",
    timestamp: "12:25",
    isOnline: true,
  },
  {
    id: "7",
    name: "Pippins McGray",
    avatar: "/message/7.png",
    lastMessage: "Please call me back on 08193843...",
    timestamp: "12:25",
  },
  {
    id: "8",
    name: "Oarack Babama",
    avatar: "/message/3.png",
    lastMessage: "Enter your message description here...",
    timestamp: "12:25",
    unreadCount: 2,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    content: "You viewed X_AE_A-13b",
    timestamp: "12:25",
    isRead: true,
    isSent: false,
  },
  {
    id: "2",
    senderId: "user",
    content:
      "Hey, what's up? How are you doing? am looking to make a deal with you.",
    timestamp: "11:25",
    isRead: true,
    isSent: true,
  },
];

export default function MessagePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    mockContacts[0]
  );
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Unread">("All");
  const [isMobileView, setIsMobileView] = useState(false);

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("[v0] Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='bg-transparent flex flex-col'>
      <div className='flex-1 flex overflow-hidden'>
        {/* Contacts Sidebar */}
        <div
          className={`w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col ${
            selectedContact && isMobileView ? "hidden sm:flex" : "flex"
          }`}
        >
          {/* Search */}
          <div className='p-4 border-b border-gray-200'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Search messages or contacts...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 bg-gray-50 border-gray-200'
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className='px-4 py-2 border-b border-gray-200'>
            <div className='flex gap-6'>
              <button
                onClick={() => setActiveTab("All")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === "All"
                    ? "text-[#235789] border-[#235789]"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("Unread")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === "Unread"
                    ? "text-[#235789] border-[#235789]"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                }`}
              >
                Unread
              </button>
            </div>
          </div>

          {/* Contacts List */}
          <div className='flex-1 overflow-y-auto'>
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  setIsMobileView(true);
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedContact?.id === contact.id
                    ? "bg-blue-50 border-blue-100"
                    : ""
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div className='relative'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        {contact.name}
                      </p>
                      <span className='text-xs text-gray-500'>
                        {contact.timestamp}
                      </span>
                    </div>
                    <p className='text-sm text-gray-600 truncate mt-0.5'>
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unreadCount && (
                    <div className='bg-[#235789] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                      {contact.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col ${
            !selectedContact || (!isMobileView && window.innerWidth < 640)
              ? "hidden sm:flex"
              : "flex"
          }`}
        >
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className='bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3'>
                <button
                  onClick={() => setIsMobileView(false)}
                  className='sm:hidden text-gray-600'
                >
                  ←
                </button>
                <Avatar className='h-10 w-10'>
                  <AvatarImage
                    src={selectedContact.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium text-gray-900'>
                    {selectedContact.name}
                  </p>
                  <p className='text-sm text-gray-500'>Last seen 7h ago</p>
                </div>
              </div>

              {/* Messages */}
              <div className='relative flex-1 overflow-y-auto p-4 space-y-4'>
                <div className='text-center'>
                  <span className='text-xs text-[#235789] bg-blue-50 px-2 py-1 rounded'>
                    25 April
                  </span>
                </div>

                <div className='flex flex-col justify-end h-[90%]'>
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-end  justify-end ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isSent
                            ? "bg-[#235789] text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className='text-sm'>{message.content}</p>
                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            message.isSent ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span
                            className={`text-xs ${
                              message.isSent ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {message.timestamp}
                          </span>
                          {message.isSent && (
                            <CheckCheck
                              className={`h-3 w-3 ${
                                message.isRead
                                  ? "text-blue-100"
                                  : "text-blue-200"
                              }`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className='bg-white border-t border-gray-200 p-4'>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 relative'>
                    <Input
                      placeholder='Write your message...'
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className='pr-20 h-12 bg-gray-50 border-gray-200'
                    />
                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-gray-400'
                      >
                        <Mic className='h-4 w-4' />
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        size='icon'
                        className='h-8 w-8 bg-[#235789] hover:bg-[#235789]'
                      >
                        <Send className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='flex-1 flex items-center justify-center text-gray-500'>
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
