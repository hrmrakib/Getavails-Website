"use client";

import { useState } from "react";
import {
  MessageCircle,
  Trash2,
  X,
  Check,
  MessageCircleMore,
} from "lucide-react";
import Image from "next/image";
import {
  useAgentRequestQuery,
  useApproveAgentMutation,
  useRejectAgentMutation,
} from "@/redux/features/artist/artistAPI";
import { toast } from "sonner";
import Link from "next/link";

interface Request {
  id: string;
  agentName: string;
  location: string;
  eventDuration: string;
  offerPrice: string;
  status: "pending" | "confirm";
  image: string;
}

interface IAgent {
  id: string;
  role: "AGENT";
  email: string;
  avatar: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  location: string;
  experience: string;
  availability: string[];
  price: string;
  agent_artists: string[]; // Array of artist IDs
  agent_pending_artists: string[]; // Array of pending artist IDs
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
  const itemsPerPage = 10;
  const totalPages = Math.ceil(MOCK_REQUESTS.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = MOCK_REQUESTS.slice(
    startIdx,
    startIdx + itemsPerPage
  );
  const { data: agentRequest, refetch } = useAgentRequestQuery("");
  const [approveAgentMutation] = useApproveAgentMutation();
  const [rejectAgentMutation] = useRejectAgentMutation();

  const handleApproveAgent = async (agent_id: string) => {
    try {
      await approveAgentMutation(agent_id).unwrap();
      refetch();
    } catch (error) {
      toast.error("Error approving agent");
      console.error("Error approving agent:", error);
    }
  };

  const handleDeclineAgent = async (agent_id: string) => {
    try {
      await rejectAgentMutation(agent_id).unwrap();
      refetch();
    } catch (error) {
      toast.error("Error declining agent");
      console.error("Error declining agent:", error);
    }
  };

  console.log("agentRequest", agentRequest?.data);

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
                Agent
              </th>
              <th className='px-6 py-4 text-left text-sm font-semibold'>
                Experience
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
              <th className='px-6 py-4 text-center text-sm font-semibold'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {agentRequest?.data?.map((request: IAgent) => (
              <tr
                key={request.id}
                className='hover:bg-muted/50 transition-colors'
              >
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={process.env.NEXT_PUBLIC_IMAGE_URL + request.avatar}
                      alt={request.name}
                      width={40}
                      height={40}
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <span className='text-sm font-medium'>{request.name}</span>
                  </div>
                </td>
                <td className='px-6 py-4 text-sm'>{request.experience}</td>
                <td className='px-6 py-4 text-sm'>{request.location}</td>
                <td className='px-6 py-4 text-sm'>{request.role}</td>
                <td className='px-6 py-4 text-sm font-medium'>
                  {request.price}
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center justify-center gap-3 lg:gap-5'>
                    <Link
                      href={`/dashboard/artist/message/${request.id}`}
                      className='h-8 w-8 flex items-center justify-center bg-[#235789] text-white hover:bg-[#235789]/80 transform transition-colors duration-200 ease-in-out rounded-2xl'
                    >
                      <MessageCircleMore className='h-4 w-4' />
                    </Link>
                    <button
                      onClick={() => handleApproveAgent(request.id)}
                      className='p-1 hover:bg-muted rounded-lg transition-colors border border-red-500'
                      title='Decline'
                    >
                      <X className='h-5 w-5 text-red-500' />
                    </button>
                    <button
                      onClick={() => handleDeclineAgent(request.id)}
                      className='p-1 hover:bg-muted rounded-lg transition-colors border border-green-500'
                      title='Accept'
                    >
                      <Check className='h-5 w-5 text-green-500' />
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
