/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Search, MapPin, MessageCircleMore, UserRoundPlus } from "lucide-react";
import { RequestsTable } from "@/components/dashboard/artist/RequestsTable";
import { AgentsTable } from "@/components/dashboard/artist/NewAgentsTable";
import {
  useAgentRequestQuery,
  useGetMyAgentsQuery,
} from "@/redux/features/artist/artistAPI";
import { Skeleton } from "@/components/ui/skeleton";
import { AvailabilityModal } from "@/components/dashboard/artist/AvailabilityModal";
import Link from "next/link";
import { RoleRedirect } from "@/utils/makePrivate";
import { toast } from "sonner";
import { useNewChatMutation } from "@/redux/features/chat/chatAPI";
import { useRouter } from "next/navigation";

interface BookingRequest {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  buyerContact: string;
  buyerEmail: string;
  artistName: string;
  artistAvatar: string;
  artistLocation: string;
  artistRate: string;
  artistSpecialty: string;
  date: string;
  status: "Open" | "Confirmed" | "Cancelled" | "Full";
}

interface IAgent {
  id: string;
  role: "AGENT";
  avatar: string;
  name: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  location: string;
  experience: string;
  availability: string[];
  price: string;
  agent_artists: string[];
  agent_pending_artists: string[];
}

export default function BookingRequestsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"requests" | "agents" | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  const [newChat] = useNewChatMutation();
  const router = useRouter();

  const { data: artists, isLoading } = useGetMyAgentsQuery("");
  const {
    data: agentRequest,
    isLoading: agentRequestLoading,
    refetch,
  } = useAgentRequestQuery("");

  const totalPages = artists?.meta?.totalPages || 1;
  const totalAgents = artists?.meta?.pagination?.total || 0;

  const handleViewDetails = (booking: BookingRequest) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleMessageCreate = async (opponentId: string) => {
    const data = await newChat({ user_id: opponentId }).unwrap();
    const chatId = data?.data?.id;

    if (!chatId) return; //? skip

    router.push(`/dashboard/artist/message/${chatId}`);
  };

  if (agentRequestLoading)
    return (
      <p className='text-center text-muted-foreground py-6'>Loading ...</p>
    );

  return (
    <RoleRedirect allowedRole='ARTIST'>
      <div className='min-h-screen bg-transparent'>
        {/* Search and Table Container */}
        <div className='bg-white rounded-lg'>
          {/* Search Header */}

          <header className='sticky top-0 z-40  bg-background mb-5'>
            <div className='px-4 py-6 sm:px-6 lg:px-8'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                {/* Search Bar */}
                <div className='relative flex-1 max-w-md'>
                  <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search for artist....'
                    className='w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                </div>

                {/* Tabs */}
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => setActiveTab("requests")}
                    className={`relative text-sm font-medium transition-colors border-2 ${
                      activeTab === "requests"
                        ? "!border-[#235789]"
                        : "border-gray-300"
                    } px-4 py-2 rounded-3xl cursor-pointer ${
                      activeTab === "requests"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    New Request{" "}
                    <span className='ml-2 inline-block rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-white'>
                      {agentRequest?.data?.length || 0}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("agents")}
                    className={`relative text-sm font-medium transition-colors border-2 ${
                      activeTab === "agents"
                        ? "!border-[#235789]"
                        : "border-gray-300"
                    } px-4 py-2 rounded-3xl cursor-pointer ${
                      activeTab === "agents"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    See New Agent
                  </button>
                  <button
                    onClick={() => setActiveTab("")}
                    className={`relative text-sm font-medium transition-colors border-2 ${
                      activeTab === "" ? "!border-[#235789]" : "border-gray-300"
                    } px-4 py-2 rounded-3xl cursor-pointer ${
                      activeTab === "agents"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    My Agents
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Table */}
          <main className='px-4 py-6 sm:px-6 lg:px-8'>
            {activeTab === "" && (
              <div className='overflow-x-auto rounded-lg'>
                <table className='w-full'>
                  {agentRequest?.data?.length ? (
                    <td className='text-center text-muted-foreground py-6'>
                      No agent requests found.
                    </td>
                  ) : (
                    <thead className='bg-[#235789] text-white p-4 font-medium'>
                      <tr>
                        <th className='px-4 py-3 text-left text-base font-medium'>
                          Agent
                        </th>
                        <th className='px-4 py-3 text-left text-base font-medium'>
                          Email
                        </th>
                        <th className='px-4 py-3 text-left text-base font-medium'>
                          Location
                        </th>
                        <th className='px-4 py-3 text-left text-base font-medium'>
                          Availability
                        </th>
                        <th className='px-4 py-3 text-left text-base font-medium hidden md:table-cell'>
                          Commission Rate
                        </th>
                        <th className='px-4 py-3 text-left text-base font-medium'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                  )}

                  <tbody className='divide-y divide-gray-200'>
                    {isLoading
                      ? Array(10)
                          .fill(0)
                          .map((_, index) => (
                            <tr key={index} className='hover:bg-gray-50'>
                              <td className='px-4 py-3'>
                                <div className='flex items-center gap-2'>
                                  <Skeleton className='h-6 w-6 rounded-full' />
                                  <Skeleton className='h-4 w-24' />
                                </div>
                              </td>
                              <td className='px-4 py-3'>
                                <Skeleton className='h-4 w-24' />
                              </td>
                              <td className='px-4 py-3'>
                                <Skeleton className='h-4 w-24' />
                              </td>
                              <td className='px-4 py-3'>
                                <Skeleton className='h-4 w-24' />
                              </td>
                              <td className='px-4 py-3 hidden md:table-cell'>
                                <Skeleton className='h-4 w-24' />
                              </td>
                              <td className='px-4 py-3'>
                                <div className='flex items-center gap-2'>
                                  <Skeleton className='h-6 w-6 rounded-full' />
                                  <Skeleton className='h-6 w-6 rounded-full' />
                                </div>
                              </td>
                            </tr>
                          ))
                      : artists?.data?.map((agent: IAgent) => (
                          <tr key={agent.id} className='hover:bg-gray-50'>
                            <td className='px-4 py-3'>
                              <div className='flex items-center gap-2'>
                                <Avatar className='h-6 w-6'>
                                  <AvatarImage
                                    src={
                                      process.env.NEXT_PUBLIC_API_URL +
                                      agent.avatar
                                    }
                                  />
                                  <AvatarFallback>
                                    {agent.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className='text-base'>{agent.name}</span>
                              </div>
                            </td>
                            <td className='px-4 py-3 text-base'>
                              {agent?.email || "N/A"}
                            </td>
                            <td className='px-4 py-3 text-base'>
                              {agent?.location || "N/A"}
                            </td>

                            <td className='px-4 py-3 text-base'>
                              {agent?.availability &&
                              agent.availability.length > 0 ? (
                                <AvailabilityModal
                                  availability={agent.availability}
                                  onSelect={(iso) => {
                                    console.log("picked:", iso);
                                  }}
                                />
                              ) : (
                                <span className='text-gray-400'>
                                  No availability
                                </span>
                              )}
                            </td>

                            <td className='px-4 py-3 hidden md:table-cell'>
                              {agent?.price || "N/A"}
                            </td>
                            <td className='px-4 py-3'>
                              <div className='flex items-center pl-4'>
                                <button
                                  onClick={() => handleMessageCreate(agent.id)}
                                  type='button'
                                  className='h-8 w-8 flex items-center justify-center bg-[#235789] text-white hover:bg-[#235789]/80 rounded-2xl transition-colors cursor-pointer'
                                >
                                  <MessageCircleMore className='h-4 w-4' />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>

                <div className='flex flex-wrap items-center justify-center gap-2 pt-4'>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className='flex items-center gap-2 px-3 py-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-sm'
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
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

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className='flex items-center gap-2 px-3 py-2 rounded border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed text-sm'
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <RequestsTable searchQuery={searchQuery} />
            )}
            {activeTab === "agents" && (
              <AgentsTable searchQuery={searchQuery} />
            )}
          </main>
        </div>

        {/* Drawer */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent className='w-full sm:max-w-md'>
            <SheetHeader>
              <div className='flex items-center justify-between'>
                <SheetTitle></SheetTitle>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsDrawerOpen(false)}
                ></Button>
              </div>
            </SheetHeader>

            {selectedBooking && (
              <div className='mt-6 space-y-6 px-8'>
                {/* Buyer Information */}
                <div className='bg-transparent shadow-md rounded-lg p-4'>
                  <div className='flex flex-col items-center justify-center gap-3 mb-3'>
                    <Avatar className='h-36 w-36'>
                      <AvatarImage
                        src={selectedBooking.buyerAvatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {selectedBooking.buyerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-xl font-medium text-[#1E1E1E]'>
                        {selectedBooking.buyerName}
                      </p>
                    </div>
                  </div>
                  <div className='space-y-1 text-center text-sm text-[#6B7280]'>
                    <div className='flex items-center justify-center gap-2'>
                      <MapPin className='h-4 w-4' />
                      <p>Location: NY, USA</p>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                      <svg
                        width='16'
                        height='11'
                        viewBox='0 0 16 11'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14.3281 0.351562C14.4893 0.351562 14.6406 0.379972 14.7822 0.43679C14.9238 0.493608 15.0483 0.576468 15.1558 0.685369C15.2632 0.794271 15.3462 0.915009 15.4048 1.04759C15.4634 1.18016 15.4951 1.32694 15.5 1.48793V9.2152C15.5 9.37145 15.4707 9.51823 15.4121 9.65554C15.3535 9.79285 15.2681 9.91359 15.1558 10.0178C15.0435 10.1219 14.9189 10.2024 14.7822 10.2592C14.6455 10.3161 14.4941 10.3468 14.3281 10.3516H1.67188C1.51074 10.3516 1.35938 10.3232 1.21777 10.2663C1.07617 10.2095 0.95166 10.1267 0.844238 10.0178C0.736816 9.90885 0.653809 9.78812 0.595215 9.65554C0.536621 9.52296 0.504883 9.37618 0.5 9.2152V1.48793C0.5 1.33168 0.529297 1.1849 0.587891 1.04759C0.646484 0.910275 0.731934 0.789536 0.844238 0.685369C0.956543 0.581203 1.08105 0.50071 1.21777 0.443892C1.35449 0.387074 1.50586 0.356297 1.67188 0.351562H14.3281ZM1.67188 1.26065C1.60352 1.26065 1.54736 1.28196 1.50342 1.32457C1.45947 1.36719 1.4375 1.42164 1.4375 1.48793V3.07884H14.5625V1.48793C14.5625 1.42164 14.5405 1.36719 14.4966 1.32457C14.4526 1.28196 14.3965 1.26065 14.3281 1.26065H1.67188ZM14.3281 9.44247C14.3965 9.44247 14.4526 9.42117 14.4966 9.37855C14.5405 9.33594 14.5625 9.28149 14.5625 9.2152V3.98793H1.4375V9.2152C1.4375 9.28149 1.45947 9.33594 1.50342 9.37855C1.54736 9.42117 1.60352 9.44247 1.67188 9.44247H14.3281ZM10.8125 6.7152H12.6875V7.62429H10.8125V6.7152Z'
                          fill='#6B7280'
                        />
                      </svg>
                      <p>Contact: Rate: 10% per Event</p>
                    </div>
                    <p>Contact: (212) 658-3916, Email: name@gmail.com</p>
                    <p>Experience: 2 Year+</p>
                  </div>
                </div>

                {/* Actions */}
                <div className='space-y-3'>
                  <Button
                    className='w-full h-11 bg-[#DEEBF7] text-[#235789]'
                    variant='outline'
                  >
                    Message Artist
                  </Button>

                  <Button
                    className='w-full h-11 border border-[#235789] text-[#235789] hover:bg-[#2358890e]'
                    variant='outline'
                  >
                    Send Request
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </RoleRedirect>
  );
}
