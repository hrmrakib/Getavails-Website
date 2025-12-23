"use client";

import { useState, useEffect } from "react";
import { X, Check, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  useAgentRequestQuery,
  useApproveAgentMutation,
  useRejectAgentMutation,
} from "@/redux/features/artist/artistAPI";
import { useRouter } from "next/navigation";
import { useNewChatMutation } from "@/redux/features/chat/chatAPI";

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
  agent_artists: string[];
  agent_pending_artists: string[];
}

export function RequestsTable({ searchQuery }: { searchQuery: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [newChat] = useNewChatMutation();
  const router = useRouter();

  // ✅ Fetch paginated data from backend
  const {
    data: agentRequest,
    refetch,
    isLoading,
  } = useAgentRequestQuery({
    page: currentPage,
    limit,
    search: searchQuery,
  });

  const [approveAgentMutation] = useApproveAgentMutation();
  const [rejectAgentMutation] = useRejectAgentMutation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = agentRequest?.meta?.totalPages || 1;
  const totalRequests = agentRequest?.meta?.pagination?.total || 0;

  const handleMessageCreate = async (opponentId: string) => {
    const data = await newChat({ user_id: opponentId }).unwrap();
    const chatId = data?.data?.id;

    if (!chatId) return; //? skip

    router.push(`/dashboard/artist/message/${chatId}`);
  };

  const handleApproveAgent = async (agent_id: string) => {
    try {
      await approveAgentMutation(agent_id).unwrap();
      toast.success("Agent approved successfully!");
      refetch();
    } catch (error) {
      toast.error("Error approving agent");
      console.error("Error approving agent:", error);
    }
  };

  const handleDeclineAgent = async (agent_id: string) => {
    try {
      await rejectAgentMutation(agent_id).unwrap();
      toast.success("Agent declined successfully!");
      refetch();
    } catch (error) {
      toast.error("Error declining agent");
      console.error("Error declining agent:", error);
    }
  };

  if (isLoading)
    return (
      <p className='text-center text-muted-foreground py-6'>
        Loading agent requests...
      </p>
    );

  if (totalRequests === 0)
    return (
      <p className='text-center text-muted-foreground py-6'>
        No agent requests found.
      </p>
    );

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
                Role
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
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL + request.avatar ||
                        "/placeholder.svg"
                      }
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
                    <button
                      onClick={() => handleMessageCreate(request.id)}
                      type='button'
                      className='h-8 w-8 flex items-center justify-center bg-[#235789] text-white hover:bg-[#235789]/80 rounded-2xl transition-colors cursor-pointer'
                    >
                      <MessageCircleMore className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => handleDeclineAgent(request.id)}
                      className='p-1 border border-red-500 hover:bg-muted rounded-lg transition-colors'
                      title='Decline'
                    >
                      <X className='h-5 w-5 text-red-500' />
                    </button>
                    <button
                      onClick={() => handleApproveAgent(request.id)}
                      className='p-1 border border-green-500 hover:bg-muted rounded-lg transition-colors'
                      title='Approve'
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

      {/* Pagination */}
      {totalRequests > 0 && (
        <div className='flex flex-wrap items-center justify-center gap-2 pt-4'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className='flex items-center gap-2 px-3 py-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-sm'
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className='flex items-center gap-2 px-3 py-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-sm'
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
