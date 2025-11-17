"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  User,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircleMore,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingDrawer } from "@/components/dashboard/agent/BookingDrawer";
import { AddArtistModal } from "@/components/dashboard/agent/AddArtistModal";
import {
  useDeleteArtistByAgentMutation,
  useGetMyArtistRequestsQuery,
} from "@/redux/features/agent/agentAPI";
import Link from "next/link";
import { toast } from "sonner";
import { ArtistRequestsInAgentPage } from "@/components/dashboard/agent/RequestsTable";
import { NewArtistTableInAgentPage } from "@/components/dashboard/agent/NewArtistTable";
import { useAgentOffersQuery } from "@/redux/features/organizer/organizerAPI";
import ConfirmedRequestPage from "@/components/dashboard/organizer/ConfirmedRequest";
import OfferRequest from "@/components/dashboard/organizer/OfferRequest";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  email: string;
  availability: string[]; // Array of ISO 8601 date strings
}

interface Agent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  availability: string[]; // Array of ISO 8601 date strings
}

interface IAgentOffer {
  id: string;
  created_at: string;
  updated_at: string;
  status: "PENDING" | "APPROVED" | "CANCELLED";
  approved_at: string | null;
  cancelled_at: string | null;
  amount: number;
  start_date: string;
  end_date: string;
  agent_id: string;
  artist_id: string;
  organizer_id: string;
  location: string;
  artist: Artist; // Nested artist object
  agent: Agent; // Nested agent object
}

export default function ArtistBooking() {
  const [activeTab, setActiveTab] = useState<
    "new" | "confirmed" | "offer-request"
  >("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<IAgentOffer | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);
  const [showDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteArtistMutation] = useDeleteArtistByAgentMutation();

  const handleCloseDialog = () => setOpenDeleteDialog(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: agentOffer, isFetching } = useAgentOffersQuery({
    page,
    limit,
    search: searchQuery,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  const totalArtists = agentOffer?.meta?.total || 0;
  const totalPages = Math.ceil(totalArtists / limit);

  const handleBookArtist = (artist: IAgentOffer) => {
    setSelectedArtist(artist);
    setShowBookingDrawer(true);
  };

  const handleDeleteArtistConfirm = async () => {
    try {
      const res = await deleteArtistMutation({
        artist_id: deleteId,
      }).unwrap();

      console.log(res, deleteId);

      if (res?.success) {
        toast.success("Artist deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
      toast.error("Error deleting artist");
    } finally {
      setOpenDeleteDialog(false);
    }
  };

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

  if (!agentOffer?.data?.length)
    return (
      <p className='text-center text-muted-foreground py-6'>No data found.</p>
    );

  return (
    <div className='min-h-screen bg-background'>
      {/* Search Bar */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-8'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => setActiveTab("new")}
            className={`relative text-sm font-medium transition-colors border-2 ${
              activeTab === "new" ? "!border-[#235789]" : "border-gray-300"
            } px-4 py-2 rounded-3xl cursor-pointer ${
              activeTab === "new"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            New
          </button>

          <button
            onClick={() => setActiveTab("confirmed")}
            className={`relative text-sm font-medium transition-colors border-2 ${
              activeTab === "confirmed"
                ? "!border-[#235789]"
                : "border-gray-300"
            } px-4 py-2 rounded-3xl cursor-pointer ${
              activeTab === "confirmed"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setActiveTab("offer-request")}
            className={`relative text-sm font-medium transition-colors border-2 ${
              activeTab === "offer-request"
                ? "!border-[#235789]"
                : "border-gray-300"
            } px-4 py-2 rounded-3xl cursor-pointer ${
              activeTab === "offer-request"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Offer Request
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
        {activeTab === "new" && (
          <div className='bg-card rounded-lg border border-border overflow-hidden'>
            {!agentOffer?.data?.length ? (
              <p className='text-center text-muted-foreground py-6 lg:py-20'>
                No data found.
              </p>
            ) : (
              <div className='hidden md:grid md:grid-cols-6 bg-[#235789] text-primary-foreground p-4 font-medium'>
                <div>Artist</div>
                <div>Genre</div>
                <div>Location</div>
                <div>Availability</div>
                <div>Price/Rate</div>
                <div>Actions</div>
              </div>
            )}

            {isFetching ? (
              <div className='p-8 text-center text-muted-foreground'>
                Loading...
              </div>
            ) : (
              <div className='divide-y divide-border'>
                {agentOffer?.data?.map((request: IAgentOffer) => (
                  <div
                    key={request.id}
                    className='p-4 hover:bg-muted/50 transition-colors'
                  >
                    <div className='hidden md:grid md:grid-cols-6 items-center'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              request.artist.avatar
                            }
                            alt={request.artist.name}
                          />
                          <AvatarFallback>
                            {request.artist.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className='font-medium'>
                          {request.artist.name}
                        </span>
                      </div>
                      <div>{request.artist?.genre || "N/A"}</div>
                      <div>{request.artist?.location || "N/A"}</div>
                      <div className='flex items-center gap-2'>
                        {request.artist.availability[0]?.split("T")[0]}{" "}
                        <button
                          onClick={() => handleBookArtist(request)}
                          className='cursor-pointer'
                        >
                          <Eye className='h-4 w-4' />
                        </button>
                      </div>
                      <div>{request.amount}</div>
                      <div className='flex items-center gap-2 lg:gap-4'>
                        <Link
                          href={`/dashboard/Organizer/message/`}
                          className='h-8 w-8 flex items-center justify-center bg-[#235789] text-white hover:bg-[#235789]/80 transform transition-colors duration-200 ease-in-out rounded-2xl'
                        >
                          <MessageCircleMore className='h-4 w-4' />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "confirmed" && (
          <ConfirmedRequestPage searchQuery={searchQuery} />
        )}
        {activeTab === "offer-request" && (
          <OfferRequest searchQuery={searchQuery} />
        )}
      </main>

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

      <AddArtistModal open={showAddModal} onOpenChange={setShowAddModal} />
      <BookingDrawer
        open={showBookingDrawer}
        onOpenChange={setShowBookingDrawer}
        artist={selectedArtist}
      />

      <AlertDialog open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our databases.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleCloseDialog()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteArtistConfirm()}
              className='bg-red-500 cursor-pointer'
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
