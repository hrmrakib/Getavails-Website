"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, ChevronDown, ChevronUp, Loader } from "lucide-react";
import {
  useGetAllOffersQuery,
  useSearchUserByRoleQuery,
} from "@/redux/features/organizer/offers/offersAPI";
import Image from "next/image";
import { toast } from "sonner";

type Offer = {
  id: string;
  price: number;
  location: string;
  date: string;
  is_fully_accepted: boolean;
  organizer_document_url: string | null;
  artist_document_url: string | null;
  venue_document_url: string | null;
  agent_document_url: string | null;
  organizer: {
    name: string;
    email: string;
  };
};

type Assignment = {
  artist?: any;
  venue?: any;
  organizer?: any;
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<
    "total" | "new" | "completed" | "pending"
  >("new");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState([]);
  const [openListModal, setOpenListModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [document, setDocument] = useState<File | null>(null);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, Assignment>>(
    {}
  );

  const tabMap: Record<typeof activeTab, string> = {
    total: "all",
    new: "pending",
    completed: "completed",
    pending: "pending",
  };

  const { data, isLoading } = useGetAllOffersQuery({
    page: 1,
    limit: 10,
    tab: tabMap[activeTab],
  });

  const { data: user, isFetching: isUserLoading } = useSearchUserByRoleQuery(
    {
      role,
      search,
    },
    { skip: !role }
  );

  useEffect(() => {
    if (user?.data) {
      setAllUsers(user?.data);
    }
  }, [user]);

  console.log({ user });

  const offers: Offer[] = data?.data ?? [];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatus = (offer: Offer) =>
    offer.is_fully_accepted ? "Completed" : "New";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    // image and pdf only
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(files[0].type)) {
      toast.error("Only image and pdf files are allowed");
      return;
    }

    if (files && files.length > 0) {
      setDocument(files[0]);
    }
  };

  const handleFetchRole = (role: string, offerId: string) => {
    setAllUsers([]);
    setRole(role);
    setActiveOfferId(offerId);
    setOpenListModal(true);
  };

  const handleSelectUser = (user: any) => {
    if (!activeOfferId) return;

    setAssignments((prev) => ({
      ...prev,
      [activeOfferId]: {
        ...prev[activeOfferId],
        artist: role === "ARTIST" ? user : prev[activeOfferId]?.artist,
        venue: role === "VENUE" ? user : prev[activeOfferId]?.venue,
        organizer: role === "ORGANIZER" ? user : prev[activeOfferId]?.organizer,
      },
    }));

    setOpenListModal(false);
  };

  return (
    <div className='min-h-screen bg-background p-4 md:p-6 lg:p-8'>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-6 flex flex-wrap gap-2'>
          <Button
            variant={activeTab === "total" ? "default" : "secondary"}
            onClick={() => setActiveTab("total")}
            className='rounded-full'
          >
            Total
          </Button>
          <Button
            variant={activeTab === "new" ? "default" : "secondary"}
            onClick={() => setActiveTab("new")}
            className='rounded-full'
          >
            New
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "secondary"}
            onClick={() => setActiveTab("completed")}
            className='rounded-full'
          >
            Completed
          </Button>
        </div>

        {isLoading && (
          <div className='text-center py-10 text-muted-foreground'>
            Loading offers...
          </div>
        )}

        <div className='space-y-4'>
          {offers.map((offer, index) => {
            const status = getStatus(offer);
            const assignment = assignments[offer.id] || {};

            return (
              <div
                key={offer.id}
                className='overflow-hidden rounded-lg border border-border bg-card'
              >
                <button
                  onClick={() => toggleExpand(offer.id)}
                  className='flex w-full items-center justify-between gap-4 p-4 hover:bg-accent/50'
                >
                  <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm'>
                    <span>
                      <strong>Organizer:</strong> {offer.organizer?.name}
                    </span>
                    <span>
                      <strong>Price:</strong> ${offer.price}
                    </span>
                    <span>
                      <strong>Date:</strong>{" "}
                      {new Date(offer.date).toLocaleDateString()}
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      status === "New"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {status}
                  </span>

                  {expandedId === offer.id ? (
                    <ChevronUp className='h-5 w-5' />
                  ) : (
                    <ChevronDown className='h-5 w-5' />
                  )}
                </button>

                {expandedId === offer.id && (
                  <div className='border-t bg-muted/30 p-6 space-y-4'>
                    <div>
                      <strong>Location:</strong> {offer.location}
                    </div>

                    <div>
                      <strong>Organizer Email:</strong> {offer.organizer?.email}
                    </div>

                    <div>
                      {offer?.venue_document_url && (
                        <div>
                          <strong>Venue Document:</strong>{" "}
                          {offer.venue_document_url! ? (
                            <a
                              href={
                                process.env.NEXT_PUBLIC_API_URL! +
                                offer?.venue_document_url!
                              }
                              target='_blank'
                              className='text-primary underline'
                            >
                              View Docs
                            </a>
                          ) : (
                            "Not uploaded"
                          )}
                        </div>
                      )}

                      {offer?.agent_document_url && (
                        <div>
                          <strong>Agent Document:</strong>{" "}
                          {offer.agent_document_url! ? (
                            <a
                              href={
                                process.env.NEXT_PUBLIC_API_URL! +
                                offer?.agent_document_url!
                              }
                              target='_blank'
                              className='text-primary underline'
                            >
                              View Docs
                            </a>
                          ) : (
                            "Not uploaded"
                          )}
                        </div>
                      )}

                      {offer?.artist_document_url && (
                        <div>
                          <strong>Artist Document:</strong>{" "}
                          {offer.artist_document_url! ? (
                            <a
                              href={
                                process.env.NEXT_PUBLIC_API_URL! +
                                offer?.artist_document_url!
                              }
                              target='_blank'
                              className='text-primary underline'
                            >
                              View Docs
                            </a>
                          ) : (
                            "Not uploaded"
                          )}
                        </div>
                      )}

                      {offer?.organizer_document_url && (
                        <div>
                          <strong>Venue Document:</strong>{" "}
                          {offer.organizer_document_url! ? (
                            <a
                              href={
                                process.env.NEXT_PUBLIC_API_URL! +
                                offer?.organizer_document_url!
                              }
                              target='_blank'
                              className='text-primary underline'
                            >
                              View Docs
                            </a>
                          ) : (
                            "Not uploaded"
                          )}
                        </div>
                      )}
                    </div>

                    <form className='space-y-5 pt-4'>
                      {/* select role to assign */}
                      <div className='flex items-center justify-between gap-5'>
                        <div>
                          <label className='block text-sm font-semibold mb-2'>
                            Select Artist to assign
                          </label>
                          <button
                            type='button'
                            onClick={() => handleFetchRole("ARTIST", offer.id)}
                            className='w-full h-11 flex items-center px-4 py-3 border rounded-lg bg-card hover:bg-muted transition'
                          >
                            {assignment.artist ? (
                              <div className='flex items-center gap-3'>
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${assignment.artist.avatar}`}
                                  alt={assignment.artist.name}
                                  width={40}
                                  height={40}
                                  className='rounded-full border p-1'
                                />
                                <span className='font-medium'>
                                  {assignment.artist.name}
                                </span>
                              </div>
                            ) : (
                              <span className='text-muted-foreground'>
                                Click to select an artist
                              </span>
                            )}
                          </button>
                        </div>

                        <div>
                          <label className='block text-sm font-semibold mb-2'>
                            Select Venue to assign
                          </label>
                          <button
                            type='button'
                            onClick={() => handleFetchRole("VENUE", offer.id)}
                            className='w-full h-11 flex items-center justify-between px-4 py-3 border rounded-lg bg-card hover:bg-muted transition'
                          >
                            {assignment.venue ? (
                              <div className='flex items-center gap-3'>
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${assignment.venue.avatar}`}
                                  alt={assignment.venue.name}
                                  width={40}
                                  height={40}
                                  className='rounded-full border p-1'
                                />
                                <span className='font-medium'>
                                  {assignment.venue?.name}
                                </span>
                              </div>
                            ) : (
                              <span className='text-muted-foreground'>
                                Click to select an venue
                              </span>
                            )}
                          </button>
                        </div>

                        <div>
                          <label className='block text-sm font-semibold mb-2'>
                            Select Organizer to assign
                          </label>
                          <button
                            type='button'
                            onClick={() =>
                              handleFetchRole("ORGANIZER", offer.id)
                            }
                            className='w-full h-11 flex items-center justify-between px-4 py-3 border rounded-lg bg-card hover:bg-muted transition'
                          >
                            {assignment.organizer ? (
                              <div className='flex items-center gap-3'>
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${assignment.organizer.avatar}`}
                                  alt={assignment.organizer.name}
                                  width={40}
                                  height={40}
                                  className='rounded-full border p-1'
                                />
                                <span className='font-medium'>
                                  {assignment.organizer?.name}
                                </span>
                              </div>
                            ) : (
                              <span className='text-muted-foreground'>
                                Click to select an organizer
                              </span>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className='flex items-center justify-end gap-3 pt-4'>
                        {/* Download Button */}
                        <Button variant='outline'>Download</Button>

                        {/* Upload Button (Styled Like Button) */}
                        <label className='flex items-center gap-2 px-4 py-2 border border-dashed border-muted-foreground rounded-md cursor-pointer hover:bg-muted transition'>
                          <input
                            type='file'
                            multiple
                            className='hidden'
                            onChange={handleFileUpload}
                          />

                          <svg
                            className='w-5 h-5 text-muted-foreground'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                            />
                          </svg>

                          <span className='text-sm text-muted-foreground'>
                            Upload file
                          </span>
                        </label>

                        {/* Accept Button */}
                        <Button>Accept & Send</Button>
                      </div>

                      {/* Uploaded Files */}
                      {document && (
                        <div className='mt-4'>
                          <div className='flex items-center justify-between p-3 bg-muted rounded-lg'>
                            <div className='flex flex-col'>
                              <span className='text-sm font-medium text-foreground'>
                                📄 {document.name}
                              </span>
                              <span className='text-xs text-muted-foreground'>
                                {(document.size / 1024).toFixed(2)} KB
                              </span>
                            </div>

                            <button
                              type='button'
                              onClick={() => setDocument(null)}
                              className='text-destructive hover:text-destructive/80 text-sm font-semibold'
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isLoading && offers.length === 0 && (
          <div className='rounded-lg border p-12 text-center'>
            <p className='text-muted-foreground'>
              No bookings found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Select Options */}
      <Dialog open={openListModal} onOpenChange={setOpenListModal}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>{role} Details</DialogTitle>
            <DialogDescription>List of {role} information</DialogDescription>

            {allUsers?.length > 0 && (
              <Input
                type='text'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full px-4 py-3 border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all'
              />
            )}
          </DialogHeader>

          <div className='flex flex-col gap-4 max-h-[400px] overflow-y-auto py-2'>
            {isUserLoading && (
              <p className='text-center text-sm text-muted-foreground'>
                Loading users <Loader className='animate-spin' />
              </p>
            )}

            {allUsers?.map((item: any) => (
              <div
                key={item.id}
                className='flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer'
                onClick={() => handleSelectUser(item)}
              >
                <Image
                  alt={item.name}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.avatar}`}
                  className='w-14 h-14 rounded-full object-cover border'
                  width={100}
                  height={100}
                />

                <div className='flex flex-col w-full'>
                  <div className='flex justify-between items-center'>
                    <p className='text-lg font-semibold'>{item.name}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded font-semibold ${
                        item.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className='text-sm text-muted-foreground'>{item.email}</p>

                  <div className='flex justify-between mt-2 text-sm font-medium'>
                    <p>📍 {item.location}</p>
                    <p>💰 {item.price}</p>
                  </div>

                  <p className='mt-1 text-sm'>
                    {item.is_verified ? (
                      <span className='text-green-600 font-semibold'>
                        ✔ Verified
                      </span>
                    ) : (
                      <span className='text-red-600 font-semibold'>
                        ✘ Not Verified
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
