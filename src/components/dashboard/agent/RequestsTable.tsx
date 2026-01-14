"use client";

import { useState, useEffect } from "react";
import { X, Check, MessageCircleMore, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useAcceptArtistByAgentMutation,
  useGetMyArtistRequestsQuery,
  useRejectArtistByAgentMutation,
} from "@/redux/features/agent/agentAPI";
import { BookingDrawer } from "./BookingDrawer";
import { useNewChatMutation } from "@/redux/features/chat/chatAPI";
import { useRouter } from "next/navigation";

interface IAgent {
  id: string;
  role: "ARTIST";
  email: string;
  avatar: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  location: string;
  genre: string;
  availability: string[];
  price: string;
  artist_agents: string[];
  artist_pending_agents: string[];
}

export function ArtistRequestsInAgentPage({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<IAgent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [newChat] = useNewChatMutation();
  const router = useRouter();

  const handleMessageCreate = async (opponentId: string) => {
    const data = await newChat({ user_id: opponentId }).unwrap();
    const chatId = data?.data?.id;

    if (!chatId) return; //? skip

    router.push(`/dashboard/agent/message/${chatId}`);
  };

  const {
    data: agentRequest,
    refetch,
    isLoading,
  } = useGetMyArtistRequestsQuery({
    page: currentPage,
    limit,
    search: searchQuery,
  });

  const [approveAgentMutation] = useAcceptArtistByAgentMutation();
  const [rejectAgentMutation] = useRejectArtistByAgentMutation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = agentRequest?.meta?.totalPages || 1;
  const totalRequests = agentRequest?.meta?.pagination?.total || 0;

  const handleApproveAgent = async (artist_id: string) => {
    try {
      const res = await approveAgentMutation({ artist_id }).unwrap();
      if (res?.success) {
        toast.success("Agent approved successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Error approving agent");
    }
  };

  const handleBookArtist = (artist: IAgent) => {
    setSelectedArtist(artist);
    setShowBookingDrawer(true);
  };

  const handleDeclineAgent = async (artist_id: string) => {
    try {
      await rejectAgentMutation({ artist_id }).unwrap();
      toast.success("Agent declined successfully!");
      refetch();
    } catch (error) {
      toast.error("Error declining agent");
    }
  };

  if (isLoading)
    return (
      <p className='text-center text-muted-foreground py-6'>
        Loading agent requests...
      </p>
    );

  if (agentRequest?.data?.length === 0)
    return (
      <p className='text-center text-muted-foreground py-6'>
        No artists requests found.
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
                Genre
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
                <td className='px-6 py-4 text-sm'>{request.genre}</td>
                <td className='px-6 py-4 text-sm'>{request.location}</td>
                <td className='px-6 py-4 text-sm flex items-center gap-2'>
                  {request.availability[0]?.split("T")[0]}{" "}
                  <button onClick={() => handleBookArtist(request)}>
                    <Eye className='h-5 w-5' />
                  </button>
                </td>
                <td className='px-6 py-4 text-sm font-medium'>
                  {request.price}
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center justify-center gap-3 lg:gap-5'>
                    <button
                      onClick={() => handleMessageCreate(request.id)}
                      type='button'
                      className='h-8 w-8 flex items-center justify-center bg-[#235789] text-white hover:bg-[#235789]/80 rounded-2xl transition-colors'
                    >
                      <MessageCircleMore className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedArtistId(request.id);
                        setOpenRejectModal(true);
                      }}
                      className='p-1 border border-red-500 hover:bg-muted rounded-lg transition-colors'
                      title='Decline'
                    >
                      <X className='h-5 w-5 text-red-500' />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedArtistId(request.id);
                        setOpenAcceptModal(true);
                      }}
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
      {totalRequests > 8 && (
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

      <BookingDrawer
        open={showBookingDrawer}
        onOpenChange={setShowBookingDrawer}
        artist={selectedArtist}
      />

      {/* Accept Modal */}
      <AlertDialog open={openAcceptModal} onOpenChange={setOpenAcceptModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Artist?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this artist request?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={async () => {
                if (selectedArtistId) {
                  await handleApproveAgent(selectedArtistId);
                }
                setOpenAcceptModal(false);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Modal */}
      <AlertDialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Artist?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this artist request?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className='bg-red-600 text-white hover:bg-red-700'
              onClick={async () => {
                if (selectedArtistId) {
                  await handleDeclineAgent(selectedArtistId);
                }
                setOpenRejectModal(false);
              }}
            >
              Confirm Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
