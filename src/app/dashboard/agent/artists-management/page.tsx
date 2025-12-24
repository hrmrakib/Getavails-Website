"use client";

import { useState } from "react";
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
  useGetMyArtistsQuery,
} from "@/redux/features/agent/agentAPI";
import { toast } from "sonner";
import { ArtistRequestsInAgentPage } from "@/components/dashboard/agent/RequestsTable";
import { NewArtistTableInAgentPage } from "@/components/dashboard/agent/NewArtistTable";
import { RoleRedirect } from "@/utils/makePrivate";
import { useNewChatMutation } from "@/redux/features/chat/chatAPI";
import { useRouter } from "next/navigation";

interface IArtist {
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

export default function ArtistBooking() {
  const [activeTab, setActiveTab] = useState<"requests" | "newArtists" | "">(
    ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<IArtist | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBookingDrawer, setShowBookingDrawer] = useState(false);
  const [showDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteArtistMutation] = useDeleteArtistByAgentMutation();

  const handleCloseDialog = () => setOpenDeleteDialog(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: myArtists, isFetching } = useGetMyArtistsQuery({
    page,
    limit,
    search: searchQuery,
  });

  // ? it used to get artist requests length
  const { data: agentRequest } = useGetMyArtistRequestsQuery({});

  const totalArtists = myArtists?.meta?.total || 0;
  const totalPages = Math.ceil(totalArtists / limit);

  const [newChat] = useNewChatMutation();
  const router = useRouter();

  const handleMessageCreate = async (opponentId: string) => {
    const data = await newChat({ user_id: opponentId }).unwrap();
    const chatId = data?.data?.id;

    if (!chatId) return; //? skip

    router.push(`/dashboard/agent/message/${chatId}`);
  };

  const handleBookArtist = (artist: IArtist) => {
    setSelectedArtist(artist);
    setShowBookingDrawer(true);
  };

  const handleDeleteArtist = (artistId: string) => {
    setDeleteId(artistId);
    setOpenDeleteDialog(true);
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

  console.log({ myArtists });

  // if (myArtists?.data?.length === 0)
  //   return (
  //     <p className='text-center text-muted-foreground py-6'>No artist found.</p>
  //   );

  return (
    <RoleRedirect allowedRole='AGENT'>
      <div className='min-h-screen bg-background'>
        {/* Search Bar */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-8'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
            <input
              type='text'
              placeholder='Search for artist....'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>

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
              onClick={() => setActiveTab("newArtists")}
              className={`relative text-sm font-medium transition-colors border-2 ${
                activeTab === "newArtists"
                  ? "!border-[#235789]"
                  : "border-gray-300"
              } px-4 py-2 rounded-3xl cursor-pointer ${
                activeTab === "newArtists"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              See New Artists
            </button>
            <button
              onClick={() => setActiveTab("")}
              className={`relative text-sm font-medium transition-colors border-2 ${
                activeTab === "" ? "!border-[#235789]" : "border-gray-300"
              } px-4 py-2 rounded-3xl cursor-pointer ${
                activeTab === ""
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              My Artists
            </button>
          </div>
        </div>

        {/* Artists Table */}
        <main>
          {activeTab === "" && (
            <>
              {myArtists?.data?.length === 0 ? (
                <p className='text-center text-muted-foreground py-6'>
                  No artist found.
                </p>
              ) : (
                <div className='bg-card rounded-lg overflow-hidden'>
                  <div className='hidden md:grid md:grid-cols-6 bg-[#235789] text-primary-foreground p-4 font-medium'>
                    <div>Artist</div>
                    <div>Genre</div>
                    <div>Location</div>
                    <div>Availability</div>
                    <div>Price/Rate</div>
                    <div>Actions</div>
                  </div>

                  {isFetching ? (
                    <div className='p-8 text-center text-muted-foreground'>
                      Loading...
                    </div>
                  ) : (
                    <div className='divide-y divide-border'>
                      {myArtists?.data?.length === 0 && (
                        <p className='text-center text-muted-foreground py-6'>
                          No artist found.
                        </p>
                      )}

                      {myArtists?.data?.length > 0 &&
                        myArtists?.data?.map((artist: IArtist) => (
                          <div
                            key={artist.id}
                            className='p-4 hover:bg-muted/50 transition-colors border'
                          >
                            <div className='hidden md:grid md:grid-cols-6 items-center'>
                              <div className='flex items-center gap-3'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage
                                    src={artist.avatar || "/placeholder.svg"}
                                    alt={artist.name}
                                  />
                                  <AvatarFallback>
                                    {artist.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className='font-medium'>
                                  {artist.name}
                                </span>
                              </div>
                              <div>{artist.genre}</div>
                              <div>{artist.location}</div>
                              <div className='flex items-center gap-2'>
                                {artist.availability[0]?.split("T")[0]}{" "}
                                <button
                                  onClick={() => handleBookArtist(artist)}
                                  className='cursor-pointer'
                                >
                                  <Eye className='h-4 w-4' />
                                </button>
                              </div>
                              <div>{artist.price}</div>
                              <div className='flex items-center gap-2 lg:gap-4'>
                                <button
                                  onClick={() => handleMessageCreate(artist.id)}
                                  type='button'
                                  className='h-8 w-8 flex items-center justify-center bg-[#235789] text-white hover:bg-[#235789]/80 rounded-2xl transition-colors'
                                >
                                  <MessageCircleMore className='h-4 w-4' />
                                </button>
                                <Button
                                  title='Reject '
                                  variant='ghost'
                                  size='icon'
                                  onClick={() => handleDeleteArtist(artist.id)}
                                  className='h-8 w-8 text-destructive hover:text-destructive bg-destructive/10 hover:bg-destructive/30'
                                >
                                  <Trash2 className='h-6 w-6' />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

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
                </div>
              )}
            </>
          )}

          {activeTab === "requests" && (
            <ArtistRequestsInAgentPage searchQuery={searchQuery} />
          )}
          {activeTab === "newArtists" && (
            <NewArtistTableInAgentPage searchQuery={searchQuery} />
          )}
        </main>

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
    </RoleRedirect>
  );
}
