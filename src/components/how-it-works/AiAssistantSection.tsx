"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function AIAssistantSection() {
  const [inputValue, setInputValue] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");

  const exampleQueries = [
    "Find available rock artists in Austin",
    "Send contract to Venue X for Aug 12",
    "What time is Artist Y free?",
  ];

  const handleQueryClick = (query: string) => {
    setSelectedQuery(query);
    setInputValue(query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Simulate AI response
      console.log("[v0] AI Assistant query:", inputValue);
      setInputValue("");
      setSelectedQuery("");
    }
  };

  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* Header */}
        <h2 className='text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-balance'>
          Talk to Your Assistant. Book in Minutes.
        </h2>
        <p className='text-gray-600 text-lg mb-12 max-w-2xl mx-auto text-pretty'>
          Need to find talent, check availability, confirm a venue, or send a
          contract? Getavails AI Assistant helps you do it faster - just like
          texting a team member.
        </p>

        {/* Chat Interface */}
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto'>
          {/* Assistant Message */}
          <div className='mb-6'>
            <div className='text-left mb-4'>
              <div className='inline-block bg-gray-100 rounded-lg px-4 py-2 text-gray-700'>
                Your Role-Based AI Assistant Is Ready.
              </div>
            </div>

            {/* Example Query Buttons */}
            <div className='flex flex-wrap gap-2 justify-center mb-6'>
              {exampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant='outline'
                  size='sm'
                  onClick={() => handleQueryClick(query)}
                  className={`text-sm hover:bg-blue-50 hover:border-blue-200 transition-colors ${
                    selectedQuery === query ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className='flex gap-2'>
            <Input
              type='text'
              placeholder='Need to find talent, check availability, confirm a venue, or send a contract?'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='flex-1 px-4 py-3 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500'
            />
            <Button
              type='submit'
              size='icon'
              className='bg-blue-600 hover:bg-blue-700 px-4 py-3 h-auto'
              disabled={!inputValue.trim()}
            >
              <Send className='h-5 w-5' />
              <span className='sr-only'>Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
