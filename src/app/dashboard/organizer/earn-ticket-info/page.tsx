"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddArtistModal } from "@/components/dashboard/agent/AddArtistModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTicketsQuery } from "@/redux/features/events/eventsAPI";
import { RoleRedirect } from "@/utils/makePrivate";

interface Event {
  title: string;
  artist_names: string[];
  start_date: string;
  end_date: string;
  available_capacity: number;
  capacity: number;
  location: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED";
}

interface ITicket {
  id: string;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
  user_id: string;
  event_id: string;
  price: number;
  status: "PAID" | "PENDING" | "CANCELLED";
  event: Event;
}

export default function VenueManagement() {
  const [activeTab, setActiveTab] = useState<"running" | "completed">(
    "running"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: tickets, isFetching } = useGetTicketsQuery({
    page,
    limit,
    status: activeTab,
    search: searchQuery,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  const totalArtists = tickets?.meta?.total || 0;
  const totalPages = Math.ceil(totalArtists / limit);

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  if (isFetching)
    return (
      <p className='text-center text-muted-foreground py-6'>Loading ...</p>
    );

  return (
    <RoleRedirect allowedRole='ORGANIZER'>
      <div className='min-h-screen bg-background'>
        {/* Main Grid */}
        <div className='lg:max-w-[50%] flex flex-wrap gap-6 mb-8'>
          {/* Revenue Card */}
          <Card className='flex-1 border-none shadow-sm bg-[#E6F0F9]'>
            <CardHeader className=''>
              <CardTitle className='text-base font-medium text-[#1E1E1E]'>
                Total Earning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold'>
                {/* ${overview?.data?.totalRevenue || 0} */}
                $2346
              </p>
            </CardContent>
          </Card>
          <Card className='flex-1 border-none shadow-sm bg-[#E6F0F9]'>
            <CardHeader className=''>
              <CardTitle className='text-base font-medium text-[#1E1E1E]'>
                Total Ticket Sell
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold'>
                {/* {overview?.data?.totalBookedTickets || 0} */}
                543
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-8'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setActiveTab("running")}
              className={`relative text-sm font-medium transition-colors border-2 ${
                activeTab === "running"
                  ? "!border-[#235789]"
                  : "border-gray-300"
              } px-4 py-2 rounded-3xl cursor-pointer ${
                activeTab === "running"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Running
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className={`relative text-sm font-medium transition-colors border-2 ${
                activeTab === "completed"
                  ? "!border-[#235789]"
                  : "border-gray-300"
              } px-4 py-2 rounded-3xl cursor-pointer ${
                activeTab === "completed"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Completed
            </button>
          </div>

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
        </div>

        {/* Artists Table */}
        <main>
          <>
            <div className='bg-card rounded-lg border border-border overflow-hidden'>
              {/* TABLE HEADER */}
              {!tickets?.data?.length ? (
                <p className='text-center text-muted-foreground py-6 lg:py-20'>
                  No data found.
                </p>
              ) : (
                <>
                  <div className='hidden md:grid md:grid-cols-6 bg-[#235789] text-primary-foreground p-4 font-medium'>
                    <div>Event Title</div>
                    <div>Artist</div>
                    <div>Location</div>
                    <div>Capacity</div>
                    <div>Available Ticket</div>
                    <div>Status</div>
                  </div>
                </>
              )}

              {/* ROWS */}
              <div className='divide-y divide-border'>
                {tickets?.data?.map((ticket: ITicket) => (
                  <div
                    key={ticket.id}
                    className='p-4 hover:bg-muted/50 transition-colors'
                  >
                    {/* Desktop Row */}
                    <div className='hidden md:grid md:grid-cols-6 items-center'>
                      <div>{ticket.event.title || "N/A"}</div>
                      <div>
                        {ticket.event.artist_names?.join(", ") || "N/A"}
                      </div>
                      <div>{ticket.event.location || "N/A"}</div>
                      <div>{ticket.event.capacity || "N/A"}</div>
                      <div>{ticket.price || "N/A"}</div>
                      <div>{ticket.status || "N/A"}</div>
                    </div>

                    {/* Mobile Card View */}
                    <div className='md:hidden flex flex-col gap-2 bg-white rounded-lg border p-4'>
                      <p className='text-sm'>
                        <span className='font-semibold'>Event:</span>{" "}
                        {ticket.event.title}
                      </p>

                      <p className='text-sm'>
                        <span className='font-semibold'>Artist:</span>{" "}
                        {ticket.event.artist_names.join(", ")}
                      </p>

                      <p className='text-sm'>
                        <span className='font-semibold'>Location:</span>{" "}
                        {ticket.event.location}
                      </p>

                      <p className='text-sm'>
                        <span className='font-semibold'>Capacity:</span>{" "}
                        {ticket.event.capacity}
                      </p>

                      <p className='text-sm'>
                        <span className='font-semibold'>Available Ticket:</span>{" "}
                        {ticket.price}
                      </p>

                      <p className='text-sm'>
                        <span className='font-semibold'>Status:</span>{" "}
                        {ticket.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className='flex items-center justify-center gap-2 p-6'>
              <Button
                variant='ghost'
                size='sm'
                onClick={handlePrev}
                disabled={page === 1}
                className='flex items-center gap-1'
              >
                <ChevronLeft className='h-4 w-4' /> Previous
              </Button>

              <span className='text-sm text-muted-foreground'>
                Page {page} of {totalPages || 1}
              </span>

              <Button
                variant='ghost'
                size='sm'
                onClick={handleNext}
                disabled={page === totalPages}
                className='flex items-center gap-1'
              >
                Next <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </>
        </main>

        <AddArtistModal open={showAddModal} onOpenChange={setShowAddModal} />
      </div>
    </RoleRedirect>
  );
}
