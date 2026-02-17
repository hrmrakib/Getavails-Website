/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import Image from "next/image";
import {
  useCreateNewChatWithSessionMutation,
  useGetChatHistoryBySessionIdQuery,
  usePublicChatMutation,
} from "@/redux/features/aiChat/aiChatAPI";

const exampleQueries = [
  "Find available rock artists in Austin",
  "Send contract to Venue X for Aug 12",
  "What time is Artist Y free?",
];

export function AIAssistantInterface() {
  const [currentQuery, setCurrentQuery] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const historyInitializedRef = useRef(false);
  const isSendingRef = useRef(false);

  const [publicChatMutation, { isLoading }] = usePublicChatMutation();
  const [createNewChatWithSessionMutation] =
    useCreateNewChatWithSessionMutation();

  // Get full chat history
  const { data: historyData } = useGetChatHistoryBySessionIdQuery(
    { session_id: sessionId },
    { skip: !sessionId },
  );

  // When history loads → set messages
  useEffect(() => {
    if (
      historyData?.messages &&
      !historyInitializedRef.current &&
      !isSendingRef.current
    ) {
      historyInitializedRef.current = true;
      setMessages(historyData.messages);
    }
  }, [historyData]);
  // useEffect(() => {
  //   if (historyData?.messages) {
  //     setMessages(historyData.messages);
  //   }
  // }, [historyData]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [messages]);

  // Auto rotate example queries (fixed)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuery((prev) => (prev + 1) % exampleQueries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue;
    setInputValue(""); // Reset immediately

    // Mark as sending so historyData effect won't overwrite
    isSendingRef.current = true;

    const userMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    const loadingMessage = {
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
      loading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    try {
      let activeSessionId = sessionId;

      // Create session if needed
      if (!sessionId) {
        const sessionRes = await createNewChatWithSessionMutation({}).unwrap();
        activeSessionId = sessionRes.session_id;
        historyInitializedRef.current = true;
        setSessionId(sessionRes.session_id);
      }

      const chatRes = await publicChatMutation({
        message: messageText,
        session_id: activeSessionId,
      }).unwrap();

      // Replace loading message with real response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                role: chatRes.role,
                content: chatRes.content,
                timestamp: chatRes.timestamp,
              }
            : msg,
        ),
      );
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                role: "assistant",
                content: "Something went wrong. Please try again.",
                timestamp: new Date().toISOString(),
              }
            : msg,
        ),
      );
    }
  };

  return (
    <div className='min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8'>
      <div className='text-center mb-12 max-w-6xl'>
        <h1 className='text-2xl md:text-5xl font-bold text-[#235789] mb-6 text-balance'>
          Talk to Your Assistant. Book in Minutes.
        </h1>
        <p className='text-lg md:text-xl text-[#6B7280] leading-relaxed text-pretty'>
          Need to find talent, check availability, confirm a venue, or send a
          contract?
          <br />
          Getavails AI Assistant helps you do it faster - just like texting a
          team member.
        </p>
      </div>

      <div className='w-full max-w-4xl bg-[#a4a4a400] border border-[#5F7F9E4D] rounded-3xl p-8 md:p-12 lg:p-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#235789] mb-14 text-balance'>
            Seamless Event Planning
            <br />
            with AI Assistance.
          </h2>
        </div>

        {/* Messages Display */}
        <div className='mb-10 max-h-80 overflow-y-auto space-y-3'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[70%] text-sm ${
                  msg.role === "user"
                    ? "bg-[#235789] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.loading ? (
                  <Loader2 className='h-5 w-5 animate-spin text-gray-500' />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {/* 👇 scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className='relative mt-10'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Need to find talent, check availability, confirm a venue, or send a contract?'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='w-full h-16 px-6 pr-16 text-lg lg:text-xl rounded-2xl border-2 border-[#1602114D] bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-[#A4A4A4] placeholder:text-lg'
            />
            <Button
              type='submit'
              size='icon'
              className='absolute right-2 top-2 h-12 w-12 bg-[#333] transition-colors duration-200'
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className='h-8 w-8 text-[#ebebeb]' />
              <span className='sr-only'>Send message</span>
            </Button>
          </div>
        </form>

        <div className='absolute top-0 right-0 w-32 h-32 pointer-events-none'>
          <Image
            src='/chat-bg-tr.png'
            alt='AI Assistant'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
}
