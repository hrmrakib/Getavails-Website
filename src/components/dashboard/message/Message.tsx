"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Mic, Send, CheckCheck } from "lucide-react";
import { useSocket } from "@/provider/SocketProvider";
import { useParams, useRouter } from "next/navigation";
import {
  useGetInboxChatsQuery,
  useGetMessagesQuery,
} from "@/redux/features/chat/chatAPI";
import { TMessagesResponse } from "./interface";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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

export default function MessagePage() {
  const { socket, onlineUsers } = useSocket();
  const { id: chat_id } = useParams<{ id: string }>();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<IChat | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const { data: messagesResponse, refetch: refetchMessages } =
    useGetMessagesQuery<{
      data: TMessagesResponse;
    }>({ page: 1, limit: 10, chat_id, search: undefined }, { skip: !chat_id });

  const { data: inboxChats } = useGetInboxChatsQuery(
    {
      page: 1,
      limit: 10,
      search: searchTerm,
      unread: activeTab,
    },
    { skip: false }
  );

  const messages = messagesResponse?.data;

  useEffect(() => {
    if (!inboxChats?.data) return;
    const contact = inboxChats.data.find((c: IChat) => c.id === chat_id);
    if (contact) {
      setSelectedContact(contact);
      if (window.innerWidth < 640) setIsMobileView(true);
    }
  }, [chat_id, inboxChats]);

  const handleSendMessage = () => {
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handler = (payload: any) => {
      const message = JSON.parse(payload).data;
      if (message.chat_id === chat_id) {
        refetchMessages();
      }
    };

    socket.on("new_message", handler);

    return () => {
      socket.off("new_message", handler);
    };
  }, [socket, chat_id, refetchMessages]);

  const handleSelectContact = (contact: IChat) => {
    setSelectedContact(contact);

    if (window.innerWidth < 640) {
      setIsMobileView(true);
    }

    router.push(`/dashboard/artist/message/${contact.id}`);
  };

  const formatTime = (ts?: string) => {
    if (!ts) return "";
    const parts = ts.split("T")[1]?.split(".")[0];
    return parts || "";
  };

  return (
    <div className='bg-transparent flex flex-col'>
      <div className='flex-1 flex overflow-hidden'>
        <div
          className={`w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col ${
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className='flex-1 overflow-y-auto'>
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
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {onlineUsers.includes(contact.user_id) && (
                      <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full' />
                    )}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between text-sm'>
                      <p className='font-medium truncate'>{contact.name}</p>
                      <span>{formatTime(contact.timestamp)}</span>
                    </div>
                    <p className='text-gray-600 truncate text-sm mt-1'>
                      {contact.last_message.slice(0, 30)}
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
                  ←
                </button>

                <Avatar>
                  <AvatarImage src={selectedContact.avatar} />
                  <AvatarFallback>
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className='font-medium'>{selectedContact.name}</p>
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
              </div>

              {/* Input */}
              <div className='bg-white border-t p-4'>
                <div className='flex items-center gap-2 relative'>
                  <Input
                    placeholder='Write your message...'
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className='pr-20 h-12 bg-gray-50 border-gray-200'
                  />

                  <div className='absolute right-2 top-1/2 -translate-y-1/2 flex gap-2'>
                    <Button variant='ghost' size='icon'>
                      <Mic className='h-4 w-4 text-gray-400' />
                    </Button>

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

// "use client";

// import type React from "react";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Search, Mic, Send, CheckCheck } from "lucide-react";
// import { useSocket } from "@/provider/SocketProvider";
// import { useParams, useRouter } from "next/navigation";
// import {
//   useGetInboxChatsQuery,
//   useGetMessagesQuery,
// } from "@/redux/features/chat/chatAPI";
// import { TMessagesResponse } from "./interface";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { tr } from "date-fns/locale";
// dayjs.extend(relativeTime);

// interface IChat {
//   id: string;
//   name: string;
//   user_id: string;
//   avatar: string;
//   last_message: string;
//   timestamp: string;
//   unread: boolean;
//   unread_count: number;
// }

// export default function MessagePage() {
//   const { socket, onlineUsers } = useSocket();
//   const { id: chat_id } = useParams<{ id: string }>();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedContact, setSelectedContact] = useState<IChat | null>();
//   const [messageInput, setMessageInput] = useState("");
//   const [activeTab, setActiveTab] = useState<boolean>(false);
//   const [isMobileView, setIsMobileView] = useState(false);
//   const router = useRouter();

//   // Todo handle pagination
//   const { data: messagesResponse, refetch: refetchMessages } =
//     useGetMessagesQuery<{
//       data: TMessagesResponse;
//     }>({ page: 1, limit: 10, chat_id, search: undefined }, { skip: !chat_id });

//   const { data: inboxChats } = useGetInboxChatsQuery(
//     {
//       page: 1,
//       limit: 10,
//       search: searchTerm,
//       unread: activeTab,
//     },
//     { skip: !chat_id }
//   );

//   console.log(inboxChats?.data);
//   const pagination = messagesResponse?.meta.pagination;
//   const messages = messagesResponse?.data;

//   const handleSendMessage = () => {
//     if (messageInput.trim()) {
//       console.log("[v0] Sending message:", messageInput);
//       setMessageInput("");

//       //? send message
//       socket?.emit(
//         "send_message",
//         {
//           chat_id,
//           text: messageInput,
//         },
//         refetchMessages
//       );
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   //? HANDLE sOCKET
//   useEffect(() => {
//     //? skip if socket is undefined
//     if (!socket) return;

//     //? listen for new messages
//     socket.on("new_message", (data) => {
//       const message = JSON.parse(data).data;

//       //? skip if message is not for this chat
//       if (message.chat_id !== chat_id) return;

//       refetchMessages();
//     });
//   }, [socket, refetchMessages, chat_id]);

//   const handleSelectContact = (contact: IChat) => {
//     setSelectedContact(contact);
//     setIsMobileView(false);
//     router.push(`/dashboard/artist/message/${contact.id}`);
//   };

//   return (
//     <div className='bg-transparent flex flex-col'>
//       <div className='flex-1 flex overflow-hidden'>
//         {/* Contacts Sidebar */}
//         <div
//           className={`w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col ${
//             selectedContact && isMobileView ? "hidden sm:flex" : "flex"
//           }`}
//         >
//           {/* Search */}
//           <div className='p-4 border-b border-gray-200'>
//             <div className='relative'>
//               <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
//               <Input
//                 placeholder='Search messages or contacts...'
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className='pl-10 bg-gray-50 border-gray-200'
//               />
//             </div>
//           </div>

//           {/* Filter Tabs */}
//           <div className='px-4 py-2 border-b border-gray-200'>
//             <div className='flex gap-6'>
//               <button
//                 onClick={() => setActiveTab(false)}
//                 className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
//                   activeTab === false
//                     ? "text-[#235789] border-[#235789]"
//                     : "text-gray-500 border-transparent hover:text-gray-700"
//                 }`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setActiveTab(true)}
//                 className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
//                   activeTab === true
//                     ? "text-[#235789] border-[#235789]"
//                     : "text-gray-500 border-transparent hover:text-gray-700"
//                 }`}
//               >
//                 Unread
//               </button>
//             </div>
//           </div>

//           {/* Contacts List */}
//           <div className='flex-1 overflow-y-auto'>
//             {inboxChats?.data?.map((contact: IChat) => (
//               <div
//                 key={contact.id}
//                 onClick={() => handleSelectContact(contact)}
//                 className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
//                   selectedContact?.id === contact.id
//                     ? "bg-blue-50 border-blue-100"
//                     : ""
//                 }`}
//               >
//                 <div className='flex items-center gap-3'>
//                   <div className='relative'>
//                     <Avatar className='h-10 w-10'>
//                       <AvatarImage
//                         src={process.env.NEXT_PUBLIC_IMAGE_URL + contact.avatar}
//                       />
//                       <AvatarFallback>
//                         {contact.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                     {onlineUsers.includes(contact.user_id) && (
//                       <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
//                     )}
//                   </div>
//                   <div className='flex-1 min-w-0'>
//                     <div className='flex  items-center justify-between'>
//                       <p className='text-sm font-medium text-gray-900 truncate'>
//                         {contact.name}
//                       </p>
//                       {contact.timestamp.split("T")[1].split(".")[0]}
//                     </div>
//                     <p className='text-sm text-gray-600 truncate mt-0.5'>
//                       {contact.last_message.slice(0, 30)}
//                     </p>
//                   </div>
//                   {contact.unread_count > 0 && (
//                     <div className='bg-[#235789] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
//                       {contact.unread_count}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div
//           className={`flex-1 flex flex-col ${
//             !selectedContact || (!isMobileView && window.innerWidth < 640)
//               ? "hidden sm:flex"
//               : "flex"
//           }`}
//         >
//           {selectedContact ? (
//             <>
//               {/* Chat Header */}
//               <div className='sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3'>
//                 <button
//                   onClick={() => setIsMobileView(false)}
//                   className='sm:hidden text-gray-600'
//                 >
//                   ←
//                 </button>
//                 <Avatar className='h-10 w-10'>
//                   <AvatarImage
//                     src={selectedContact.avatar || "/placeholder.svg"}
//                   />
//                   <AvatarFallback>
//                     {selectedContact.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className='font-medium text-gray-900'>
//                     {selectedContact.name}
//                   </p>
//                   <p className='text-sm text-gray-500'>
//                     Last seen{" "}
//                     {selectedContact.timestamp.split("T")[1].split(".")[0]}
//                   </p>
//                 </div>
//               </div>

//               {/* Messages */}
//               <div className='relative h-full border-4 flex-1 overflow-y-auto p-4 space-y-4 overflow-x-hidden'>
//                 <div className='text-center'>
//                   <span className='text-xs text-[#235789] bg-blue-50 px-2 py-1 rounded'>
//                     25 April
//                   </span>
//                 </div>

//                 <div className='flex flex-col justify-end h-[90%]'>
//                   {messages?.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex items-end  justify-end ${
//                         message.isOwner ? "justify-end" : "justify-start"
//                       } mb-2`}
//                     >
//                       <div
//                         className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                           message.isOwner
//                             ? "bg-[#235789] text-white"
//                             : "bg-gray-100 text-gray-900"
//                         }`}
//                       >
//                         <p className='text-sm'>{message.text}</p>
//                         <div
//                           className={`flex items-center gap-1 mt-1 ${
//                             message.isOwner ? "justify-end" : "justify-start"
//                           }`}
//                         >
//                           <span
//                             className={`text-xs ${
//                               message.isOwner
//                                 ? "text-blue-100"
//                                 : "text-gray-500"
//                             }`}
//                           >
//                             {dayjs(
//                               message.updated_at ?? message.created_at
//                             ).fromNow()}
//                           </span>
//                           {message.isOwner && message.seen_by.length > 1 && (
//                             <CheckCheck className='text-blue-200' />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Message Input */}
//               <div className='h-max bg-white border-t border-gray-200 p-4'>
//                 <div className='flex items-center gap-2'>
//                   <div className='flex-1 relative'>
//                     <Input
//                       placeholder='Write your message...'
//                       value={messageInput}
//                       onChange={(e) => setMessageInput(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       className='pr-20 h-12 bg-gray-50 border-gray-200'
//                     />
//                     <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1'>
//                       <Button
//                         variant='ghost'
//                         size='icon'
//                         className='h-8 w-8 text-gray-400'
//                       >
//                         <Mic className='h-4 w-4' />
//                       </Button>
//                       <Button
//                         onClick={handleSendMessage}
//                         size='icon'
//                         className='h-8 w-8 bg-[#235789] hover:bg-[#235789]'
//                       >
//                         <Send className='h-4 w-4' />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             // <div className='relative flex flex-col h-screen'>
//             //   {/* Chat Header */}
//             //   <div className='sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3'>
//             //     <button
//             //       onClick={() => setIsMobileView(false)}
//             //       className='sm:hidden text-gray-600'
//             //     >
//             //       ←
//             //     </button>
//             //     <Avatar className='h-10 w-10'>
//             //       <AvatarImage
//             //         src={selectedContact.avatar || "/placeholder.svg"}
//             //       />
//             //       <AvatarFallback>
//             //         {selectedContact.name
//             //           .split(" ")
//             //           .map((n) => n[0])
//             //           .join("")}
//             //       </AvatarFallback>
//             //     </Avatar>
//             //     <div>
//             //       <p className='font-medium text-gray-900'>
//             //         {selectedContact.name}
//             //       </p>
//             //       <p className='text-sm text-gray-500'>
//             //         Last seen{" "}
//             //         {selectedContact.timestamp.split("T")[1].split(".")[0]}
//             //       </p>
//             //     </div>
//             //   </div>
//             //   {/* Messages Section */}
//             //   <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
//             //     <div className='text-center'>
//             //       <span className='text-xs text-[#235789] bg-blue-50 px-2 py-1 rounded'>
//             //         {messages?.length} messages
//             //       </span>
//             //     </div>

//             //     <div className='flex flex-col gap-2'>
//             //       {messages?.map((message) => (
//             //         <div
//             //           key={message.id}
//             //           className={`flex items-end ${
//             //             message.isOwner ? "justify-end" : "justify-start"
//             //           }`}
//             //         >
//             //           <div
//             //             className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//             //               message.isOwner
//             //                 ? "bg-[#235789] text-white"
//             //                 : "bg-gray-100 text-gray-900"
//             //             }`}
//             //           >
//             //             <p className='text-sm'>{message.text}</p>
//             //             <div
//             //               className={`flex items-center gap-1 mt-1 ${
//             //                 message.isOwner ? "justify-end" : "justify-start"
//             //               }`}
//             //             >
//             //               <span
//             //                 className={`text-xs ${
//             //                   message.isOwner
//             //                     ? "text-blue-100"
//             //                     : "text-gray-500"
//             //                 }`}
//             //               >
//             //                 {dayjs(
//             //                   message.updated_at ?? message.created_at
//             //                 ).fromNow()}
//             //               </span>
//             //               {message.isOwner && message.seen_by.length > 1 && (
//             //                 <CheckCheck className='text-blue-200' />
//             //               )}
//             //             </div>
//             //           </div>
//             //         </div>
//             //       ))}
//             //     </div>
//             //   </div>
//             //   {/* Message Input - fixed at bottom */}
//             //   <div className='fixed bottom-0 left-0 w-64 bg-white border-t border-gray-200 p-4 z-20'>
//             //     <div className='flex items-center gap-2'>
//             //       <div className='flex-1 relative'>
//             //         <Input
//             //           placeholder='Write your message...'
//             //           value={messageInput}
//             //           onChange={(e) => setMessageInput(e.target.value)}
//             //           onKeyPress={handleKeyPress}
//             //           className='pr-20 h-12 bg-gray-50 border-gray-200'
//             //         />
//             //         <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1'>
//             //           <Button
//             //             variant='ghost'
//             //             size='icon'
//             //             className='h-8 w-8 text-gray-400'
//             //           >
//             //             <Mic className='h-4 w-4' />
//             //           </Button>
//             //           <Button
//             //             onClick={handleSendMessage}
//             //             size='icon'
//             //             className='h-8 w-8 bg-[#235789] hover:bg-[#235789]'
//             //           >
//             //             <Send className='h-4 w-4' />
//             //           </Button>
//             //         </div>
//             //       </div>
//             //     </div>
//             //   </div>
//             // </div>
//             <div className='flex flex-col h-screen'>
//               {" "}
//               {/* full viewport height */}
//               {/* Chat Header */}
//               <div className='sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10'>
//                 <button
//                   onClick={() => setIsMobileView(false)}
//                   className='sm:hidden text-gray-600'
//                 >
//                   ←
//                 </button>
//                 <Avatar className='h-10 w-10'>
//                   <AvatarImage
//                     src={selectedContact.avatar || "/placeholder.svg"}
//                   />
//                   <AvatarFallback>
//                     {selectedContact.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className='font-medium text-gray-900'>
//                     {selectedContact.name}
//                   </p>
//                   <p className='text-sm text-gray-500'>
//                     Last seen{" "}
//                     {selectedContact.timestamp.split("T")[1].split(".")[0]}
//                   </p>
//                 </div>
//               </div>
//               {/* Messages */}
//               <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
//                 <div className='text-center'>
//                   <span className='text-xs text-[#235789] bg-blue-50 px-2 py-1 rounded'>
//                     25 April
//                   </span>
//                 </div>

//                 <div className='flex flex-col justify-end gap-2'>
//                   {messages?.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex items-end ${
//                         message.isOwner ? "justify-end" : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                           message.isOwner
//                             ? "bg-[#235789] text-white"
//                             : "bg-gray-100 text-gray-900"
//                         }`}
//                       >
//                         <p className='text-sm'>{message.text}</p>
//                         <div
//                           className={`flex items-center gap-1 mt-1 ${
//                             message.isOwner ? "justify-end" : "justify-start"
//                           }`}
//                         >
//                           <span
//                             className={`text-xs ${
//                               message.isOwner
//                                 ? "text-blue-100"
//                                 : "text-gray-500"
//                             }`}
//                           >
//                             {dayjs(
//                               message.updated_at ?? message.created_at
//                             ).fromNow()}
//                           </span>
//                           {message.isOwner && message.seen_by.length > 1 && (
//                             <CheckCheck className='text-blue-200' />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Message Input */}
//               <div className='bg-white border-t border-gray-200 p-4'>
//                 <div className='flex items-center gap-2'>
//                   <div className='flex-1 relative'>
//                     <Input
//                       placeholder='Write your message...'
//                       value={messageInput}
//                       onChange={(e) => setMessageInput(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       className='pr-20 h-12 bg-gray-50 border-gray-200'
//                     />
//                     <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1'>
//                       <Button
//                         variant='ghost'
//                         size='icon'
//                         className='h-8 w-8 text-gray-400'
//                       >
//                         <Mic className='h-4 w-4' />
//                       </Button>
//                       <Button
//                         onClick={handleSendMessage}
//                         size='icon'
//                         className='h-8 w-8 bg-[#235789] hover:bg-[#235789]'
//                       >
//                         <Send className='h-4 w-4' />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             // <div className='flex-1 flex items-center justify-center text-gray-500'>
//             //   <p>Select a conversation to start messaging</p>
//             // </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
