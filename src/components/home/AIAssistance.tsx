/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
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
  const [sessionId, setSessionId] = useState("");

  const [publicChatMutation] = usePublicChatMutation();
  const [createNewChatWithSessionMutation] =
    useCreateNewChatWithSessionMutation();
  const {} = useGetChatHistoryBySessionIdQuery({});

  // Auto-rotate example queries every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentQuery((prev) => (prev + 1) % exampleQueries.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Handle the query submission here
      setInputValue("");
    }
  };

  return (
    <div className='min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8'>
      {/* Header Section */}
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

      {/* Main AI Interface Card */}
      <div className='w-full max-w-4xl bg-[#a4a4a400] border border-[#5F7F9E4D] rounded-3xl p-8 md:p-12 lg:p-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#235789] mb-14 text-balance'>
            Seamless Event Planning
            <br />
            with AI Assistance.
          </h2>

          {/* Example Query Pills with Animation */}
          {/* <div className='flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 min-h-[60px]'>
            {exampleQueries.map((query, index) => (
              <Button
                key={query}
                variant='outline'
                className={`
                  px-6 py-3 rounded-full text-sm transition-all duration-500 transform
                  ${
                    index === currentQuery
                      ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                      : "bg-background/50 text-muted-foreground hover:bg-background/80 scale-95 opacity-70"
                  }
                `}
                onClick={() => handleExampleClick(query)}
              >
                {query}
              </Button>
            ))}
          </div> */}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className='relative mt-40'>
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
              disabled={!inputValue.trim()}
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

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 640px) {
          .example-queries {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
