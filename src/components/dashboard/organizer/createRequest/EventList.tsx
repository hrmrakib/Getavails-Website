"use client";

import { useAcceptOfferMutation } from "@/redux/features/organizer/offers/offersAPI";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "sonner";

export type Event = {
  id: string;
  agent: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  amountRange: string;
  status: "accepted" | "pending" | "completed";
  documents?: string[];
};

interface EventsListProps {
  events: Event[];
  tab: string;
}

export default function EventsList({ events, tab }: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const selectedEventRef = useRef<any>(null);

  const [acceptOfferMutation, { isLoading }] = useAcceptOfferMutation();

  const getTabTitle = () => {
    switch (tab) {
      case "total":
        return "All Events";
      case "pending":
        return "Pending Events";
      case "completed":
        return "Completed Events";
      default:
        return "Events";
    }
  };

  if (events?.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground text-lg'>
          No {getTabTitle().toLowerCase()} found
        </p>
      </div>
    );
  }

  const downloadFileFromUrl = async (fileUrl: string, fileName?: string) => {
    try {
      // Fetch as blob
      const response = await fetch(fileUrl, { method: "GET", mode: "cors" });
      const blob = await response.blob();

      // Create object URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create anchor element and download
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName || fileUrl.split("/").pop() || "download";
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const handleAccept = (event: any) => {
    selectedEventRef.current = event;
    fileInputRef.current?.click(); // open file explorer
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const event = selectedEventRef.current;
    if (!event) return;

    console.log("event", event);

    try {
      const data = {
        offer_id: event?.id,
      };

      const formData = new FormData();

      formData.append("data", JSON.stringify(data));
      formData.append("document", file);

      const res = await acceptOfferMutation(formData).unwrap();
      console.log(res);

      if (res?.success) {
        toast.success("Offer accepted successfully ✅");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to accept offer ❌");
    } finally {
      // reset input so same file can be re-selected
      e.target.value = "";
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold text-foreground mb-6'>
        {getTabTitle()}
      </h2>
      <div className='grid gap-4 md:gap-6'>
        {events?.map((event: any) => (
          <div
            key={event.id}
            className='bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-md transition-all'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              {/* Left Column */}
              <div className='space-y-4'>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Agent Name
                  </p>
                  <p className='text-lg font-medium text-foreground'>
                    {event?.agent?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Agent Email
                  </p>
                  <p className='text-lg font-medium text-foreground'>
                    {event?.agent?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Location
                  </p>
                  <p className='text-foreground'>{event?.location}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-4'>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Agent Avater
                  </p>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL +
                        event?.agent?.avatar || ""
                    }
                    width={50}
                    height={50}
                    alt='Agent Avater'
                    className='rounded-full'
                  />
                </div>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Date & Time
                  </p>
                  <p className='text-foreground'>
                    {event?.date?.split("T")[0]}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {event?.time?.split("T")[1]}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-muted-foreground uppercase mb-1'>
                    Amount Range
                  </p>
                  <p className='text-foreground font-semibold'>
                    {event?.price}
                  </p>
                </div>

                {tab === "pending" && (
                  <div className='flex items-center gap-4'>
                    <button
                      onClick={async () => {
                        await downloadFileFromUrl(
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                            event?.organizer_document_url
                        );
                      }}
                      className='px-3 py-1 text-black cursor-pointer border border-gray-400 rounded-sm'
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleAccept(event)}
                      disabled={isLoading}
                      className='px-3 py-1 bg-[#235789] text-white cursor-pointer rounded-sm'
                    >
                      Accept {isLoading && <Loader className='animate-spin' />}
                      <input
                        type='file'
                        ref={fileInputRef}
                        accept='image/*,application/pdf'
                        className='hidden'
                        onChange={(e) => handleFileSelected(e)}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
