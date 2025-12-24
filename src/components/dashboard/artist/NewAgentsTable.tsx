"use client";

import { useState } from "react";
import { MessageCircleMore, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useGetNewAgentsQuery,
  useInviteAgentByArtistMutation,
} from "@/redux/features/artist/artistAPI";
import { useNewChatMutation } from "@/redux/features/chat/chatAPI";
import { useRouter } from "next/navigation";
import { useInviteArtistByAgentMutation } from "@/redux/features/agent/agentAPI";
import { toast } from "sonner";

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

export function AgentsTable({ searchQuery }: { searchQuery: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // ✅ Fetch paginated data from backend
  const { data, isLoading, isError, refetch } = useGetNewAgentsQuery({
    page: currentPage,
    limit,
    search: searchQuery,
  });
  console.log(data);

  const agents = data?.data || [];
  const totalItems = data?.meta?.total || 0; // assume your backend sends meta info
  const totalPages = Math.ceil(totalItems / limit);
  const [newChat] = useNewChatMutation();
  const router = useRouter();
  const [inviteAgentByArtistMutation] = useInviteAgentByArtistMutation();

  const handleArtistInvite = async (agentId: string) => {
    try {
      const res = await inviteAgentByArtistMutation({
        agent_id: agentId,
      }).unwrap();

      //? handle success
      if (res?.success) {
        refetch();
        toast.success("Artist invited successfully!");
      }
    } catch (error: any) {
      console.error("Error inviting artist:", error);
      toast.error(error?.data?.message || "Failed to invite artist");
    }
  };

  const handleMessageCreate = async (opponentId: string) => {
    const data = await newChat({ user_id: opponentId }).unwrap();
    const chatId = data?.data?.id;

    if (!chatId) return; //? skip

    router.push(`/dashboard/artist/message/${chatId}`);
  };

  if (isLoading)
    return (
      <div className='text-center py-10 text-muted-foreground'>Loading...</div>
    );
  if (isError)
    return (
      <div className='text-center py-10 text-red-500'>
        Failed to load agents.
      </div>
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
            {agents.map((agent: IAgent) => (
              <tr
                key={agent.id}
                className='hover:bg-muted/50 transition-colors'
              >
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={
                        agent.avatar
                          ? process.env.NEXT_PUBLIC_API_URL + agent.avatar
                          : "/placeholder.svg"
                      }
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
                <td className='px-6 py-4 text-sm'>
                  {agent?.availability[0]?.split("T")[0]}
                </td>
                <td className='px-6 py-4 text-sm font-medium'>{agent.price}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <button
                      title='Invite Artist'
                      onClick={() => handleArtistInvite(agent.id)}
                      type='button'
                      className='h-8 w-8 flex items-center justify-center bg-[#1fa026] text-white hover:bg-[#1fa026]/80 rounded-2xl transition-colors cursor-pointer!'
                    >
                      <UserRoundPlus className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => handleMessageCreate(agent.id)}
                      type='button'
                      className='h-8 w-8 flex items-center justify-center bg-[#235789] text-white hover:bg-[#235789]/80 rounded-2xl transition-colors'
                    >
                      <MessageCircleMore className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 10 && (
        <div className='flex flex-wrap items-center justify-center gap-2 pt-4'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className='flex items-center gap-2 px-3 py-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-sm'
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 3),
              Math.min(totalPages, currentPage + 2)
            )
            .map((page) => (
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
