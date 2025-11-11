"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

interface Agent {
  id: string;
  name: string;
  email: string;
  location: string;
  availability: string;
  rate: string;
  image: string;
  genre?: string;
}

const MOCK_AGENTS: Agent[] = Array.from({ length: 15 }, (_, i) => ({
  id: `AG.${String(i + 1).padStart(2, "0")}`,
  name: "Kate Morrison",
  email: "name@gmail.com",
  location: "NY, USA",
  availability: "25-06-2025",
  rate: "$580 per event",
  image: "/kate-morrison.jpg",
  genre: "Rock Music",
}));

export function AgentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(MOCK_AGENTS.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = MOCK_AGENTS.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className='space-y-6'>
      {/* Desktop Table */}
      <div className='hidden md:block overflow-x-auto rounded-lg border border-border'>
        <table className='w-full'>
          <thead>
            <tr className='bg-primary text-primary-foreground'>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Agent
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Email
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Location
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Availability
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Rate
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {paginatedAgents.map((agent) => (
              <tr
                key={agent.id}
                className='hover:bg-muted/50 transition-colors'
              >
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      height={40}
                      width={40}
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <span className='text-sm font-medium'>{agent.name}</span>
                  </div>
                </td>
                <td className='px-6 py-4 text-sm text-muted-foreground'>
                  {agent.email}
                </td>
                <td className='px-6 py-4 text-sm'>{agent.location}</td>
                <td className='px-6 py-4 text-sm'>{agent.availability}</td>
                <td className='px-6 py-4 text-sm font-medium'>{agent.rate}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <button className='p-2 hover:bg-muted rounded-lg transition-colors'>
                      <MessageCircle className='h-5 w-5 text-muted-foreground hover:text-foreground' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className='md:hidden space-y-4'>
        {paginatedAgents.map((agent) => (
          <div
            key={agent.id}
            className='rounded-lg border border-border bg-card p-4 space-y-3'
          >
            <div className='flex items-start justify-between'>
              <div className='flex items-center gap-3 flex-1'>
                <Image
                  src={agent.image || "/placeholder.svg"}
                  alt={agent.name}
                  width={40}
                  height={40}
                  className='h-10 w-10 rounded-full object-cover'
                />
                <div className='flex-1 min-w-0'>
                  <p className='font-medium text-sm'>{agent.name}</p>
                  <p className='text-xs text-muted-foreground truncate'>
                    {agent.email}
                  </p>
                </div>
              </div>
              <button className='p-1.5 hover:bg-muted rounded'>
                <MessageCircle className='h-4 w-4' />
              </button>
            </div>

            <div className='grid grid-cols-2 gap-2 text-xs'>
              <div>
                <p className='text-muted-foreground'>Location</p>
                <p className='font-medium'>{agent.location}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Availability</p>
                <p className='font-medium'>{agent.availability}</p>
              </div>
              <div className='col-span-2'>
                <p className='text-muted-foreground'>Rate</p>
                <p className='font-medium'>{agent.rate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex flex-wrap items-center justify-center gap-2 pt-4'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className='flex items-center gap-2 px-3 py-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-sm'
        >
          ← Previous
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-muted"
              }`}
            >
              {page}
            </button>
          )
        )}

        {totalPages > 5 && <span className='px-2 py-2'>...</span>}

        {totalPages > 5 && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-muted"
            }`}
          >
            {totalPages}
          </button>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className='flex items-center gap-2 px-3 py-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-sm'
        >
          Next →
        </button>
      </div>
    </div>
  );
}
