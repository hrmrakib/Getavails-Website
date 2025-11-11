"use client";

import { useState } from "react";
import { MessageCircle, Trash2, ChevronDown } from "lucide-react";
import Image from "next/image";

interface Request {
  id: string;
  agentName: string;
  location: string;
  eventDuration: string;
  offerPrice: string;
  status: "pending" | "confirm";
  image: string;
}

const MOCK_REQUESTS: Request[] = Array.from({ length: 15 }, (_, i) => ({
  id: `SL.${String(i + 1).padStart(2, "0")}`,
  agentName: "Kate Morrison",
  location: i % 3 === 1 ? "NY, USA" : "New York, USA",
  eventDuration: "25-06-2025, 09:30 Pm",
  offerPrice: "$2025",
  status: i === 1 ? "confirm" : "pending",
  image: "/kate-morrison.jpg",
}));

export function RequestsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(MOCK_REQUESTS.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = MOCK_REQUESTS.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const getStatusColor = (status: string) => {
    return status === "confirm" ? "text-green-500" : "text-yellow-500";
  };

  return (
    <div className='space-y-6'>
      {/* Desktop Table */}
      <div className='hidden md:block overflow-x-auto rounded-lg border border-border'>
        <table className='w-full'>
          <thead>
            <tr className='bg-primary text-primary-foreground'>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Request Id.
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Agent name
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Event Location
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Event Duration
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Offer Priced
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Status
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {paginatedRequests.map((request) => (
              <tr
                key={request.id}
                className='hover:bg-muted/50 transition-colors'
              >
                <td className='px-6 py-4 text-sm'>{request.id}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={request.image || "/placeholder.svg"}
                      alt={request.agentName}
                      width={40}
                      height={40}
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <span className='text-sm font-medium'>
                      {request.agentName}
                    </span>
                  </div>
                </td>
                <td className='px-6 py-4 text-sm'>{request.location}</td>
                <td className='px-6 py-4 text-sm'>{request.eventDuration}</td>
                <td className='px-6 py-4 text-sm font-medium'>
                  {request.offerPrice}
                </td>
                <td className='px-6 py-4 text-sm'>
                  <div className='relative inline-block'>
                    <button
                      onClick={() =>
                        setExpandedStatus(
                          expandedStatus === request.id ? null : request.id
                        )
                      }
                      className={`${getStatusColor(
                        request.status
                      )} flex items-center gap-2 font-medium hover:opacity-80 transition-opacity`}
                    >
                      {request.status === "confirm" ? "Confirm" : "Pending"}
                      {request.status === "pending" && (
                        <ChevronDown className='h-4 w-4' />
                      )}
                    </button>
                    {expandedStatus === request.id &&
                      request.status === "pending" && (
                        <div className='absolute top-full left-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg z-50'>
                          <button className='w-full px-4 py-2 text-left text-sm hover:bg-muted text-foreground'>
                            Accept
                          </button>
                          <button className='w-full px-4 py-2 text-left text-sm hover:bg-muted text-foreground border-t border-border'>
                            Decline
                          </button>
                        </div>
                      )}
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <button className='p-2 hover:bg-muted rounded-lg transition-colors'>
                      <MessageCircle className='h-5 w-5 text-muted-foreground hover:text-foreground' />
                    </button>
                    <button className='p-2 hover:bg-muted rounded-lg transition-colors'>
                      <Trash2 className='h-5 w-5 text-muted-foreground hover:text-foreground' />
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
        {paginatedRequests.map((request) => (
          <div
            key={request.id}
            className='rounded-lg border border-border bg-card p-4 space-y-3'
          >
            <div className='flex items-start justify-between'>
              <div className='flex items-center gap-3 flex-1'>
                <Image
                  src={request.image || "/placeholder.svg"}
                  alt={request.agentName}
                  width={40}
                  height={40}
                  className='h-10 w-10 rounded-full object-cover'
                />
                <div className='flex-1 min-w-0'>
                  <p className='font-medium text-sm truncate'>
                    {request.agentName}
                  </p>
                  <p className='text-xs text-muted-foreground'>{request.id}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <button className='p-1.5 hover:bg-muted rounded'>
                  <MessageCircle className='h-4 w-4' />
                </button>
                <button className='p-1.5 hover:bg-muted rounded'>
                  <Trash2 className='h-4 w-4' />
                </button>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-2 text-xs'>
              <div>
                <p className='text-muted-foreground'>Location</p>
                <p className='font-medium'>{request.location}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Duration</p>
                <p className='font-medium'>{request.eventDuration}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Price</p>
                <p className='font-medium'>{request.offerPrice}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Status</p>
                <p className={`font-medium ${getStatusColor(request.status)}`}>
                  {request.status === "confirm" ? "Confirm" : "Pending"}
                </p>
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
