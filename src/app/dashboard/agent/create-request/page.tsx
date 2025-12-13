"use client";

import { useState } from "react";
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
import { Calendar, ChevronDown, ChevronUp, Upload } from "lucide-react";
import { useGetAllOffersQuery } from "@/redux/features/organizer/offers/offersAPI";

type Offer = {
  id: string;
  price: number;
  location: string;
  date: string;
  is_fully_accepted: boolean;
  organizer_document_url: string | null;
  organizer: {
    name: string;
    email: string;
  };
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<
    "total" | "new" | "completed" | "pending"
  >("pending");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectRole, setSelectRole] = useState<string>("Select a role");

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

  const offers: Offer[] = data?.data ?? [];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatus = (offer: Offer) =>
    offer.is_fully_accepted ? "Completed" : "New";

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
                      <strong>Document:</strong>{" "}
                      {offer.organizer_document_url! ? (
                        <a
                          href={
                            process.env.NEXT_PUBLIC_API_URL! +
                            offer.organizer_document_url!
                          }
                          target='_blank'
                          className='text-primary underline'
                        >
                          View PDF
                        </a>
                      ) : (
                        "Not uploaded"
                      )}
                    </div>

                    <form className='space-y-5 pt-4'>
                      <div className='space-y-2'>
                        <Label>Agent</Label>
                        <Select
                          value={selectRole}
                          onValueChange={setSelectRole}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select Agent' />
                          </SelectTrigger>
                          <SelectContent className='w-full'>
                            <SelectItem value='Artist'>Artist</SelectItem>
                            <SelectItem value='Venue'>Venue</SelectItem>
                            <SelectItem value='Organizer'>Organizer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='space-y-2'>
                        <Label>Date</Label>
                        <div className='relative'>
                          <Input
                            value={new Date(offer.date).toLocaleDateString()}
                            readOnly
                          />
                          <Calendar className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
                        </div>
                      </div>

                      <div className='flex justify-end gap-2 pt-4'>
                        <Button variant='outline'>Download</Button>
                        <Button>Accept & Send</Button>
                      </div>
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
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar, ChevronDown, ChevronUp, Upload } from "lucide-react";
// import { useGetAllOffersQuery } from "@/redux/features/organizer/offers/offersAPI";

// // Sample booking data
// type Booking = {
//   id: number;
//   organizerName: string;
//   priceRange: string;
//   date: string;
//   status: "New" | "Completed";
//   agent?: string;
//   artist?: string;
//   venue?: string;
//   location?: string;
//   time?: string;
//   totalAmount?: string;
//   document?: string;
// };

// const initialBookings: Booking[] = [
//   {
//     id: 1,
//     organizerName: "XYZ",
//     priceRange: "$1250",
//     date: "12 May 2025",
//     status: "New",
//   },
//   {
//     id: 2,
//     organizerName: "XYZ",
//     priceRange: "$1250",
//     date: "12 May 2025",
//     status: "Completed",
//   },
//   {
//     id: 3,
//     organizerName: "XYZ",
//     priceRange: "$1250",
//     date: "12 May 2025",
//     status: "Completed",
//   },
//   {
//     id: 4,
//     organizerName: "ABC Corp",
//     priceRange: "$2000",
//     date: "15 May 2025",
//     status: "New",
//   },
//   {
//     id: 5,
//     organizerName: "DEF Ltd",
//     priceRange: "$1500",
//     date: "18 May 2025",
//     status: "Completed",
//   },
// ];

// export default function BookingsPage() {
//   const [activeTab, setActiveTab] = useState<"total" | "new" | "completed">(
//     "total"
//   );
//   const [expandedId, setExpandedId] = useState<number | null>(null);
//   const [bookings, setBookings] = useState<Booking[]>(initialBookings);

//   const { data } = useGetAllOffersQuery({
//     page: 1,
//     limit: 10,
//     tab: "pending",
//   });

//   const allOffers = data?.data;

//   console.log({ allOffers });

//   // Filter bookings based on active tab
//   const filteredBookings = bookings.filter((booking) => {
//     if (activeTab === "new") return booking.status === "New";
//     if (activeTab === "completed") return booking.status === "Completed";
//     return true; // total
//   });

//   const toggleExpand = (id: number) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleFormSubmit = (id: number, action: string) => {
//     console.log(`${action} booking ${id}`);
//     // Handle form submission logic here
//   };

//   return (
//     <div className='min-h-screen bg-background p-4 md:p-6 lg:p-8'>
//       <div className='mx-auto max-w-5xl'>
//         {/* Tabs */}
//         <div className='mb-6 flex flex-wrap gap-2'>
//           <Button
//             variant={activeTab === "total" ? "default" : "secondary"}
//             onClick={() => setActiveTab("total")}
//             className='rounded-full'
//           >
//             Total ({bookings.length})
//           </Button>
//           <Button
//             variant={activeTab === "new" ? "default" : "secondary"}
//             onClick={() => setActiveTab("new")}
//             className='rounded-full'
//           >
//             New ({bookings.filter((b) => b.status === "New").length})
//           </Button>
//           <Button
//             variant={activeTab === "completed" ? "default" : "secondary"}
//             onClick={() => setActiveTab("completed")}
//             className='rounded-full'
//           >
//             Completed ({bookings.filter((b) => b.status === "Completed").length}
//             )
//           </Button>
//         </div>

//         {/* Bookings List */}
//         <div className='space-y-4'>
//           {filteredBookings.map((booking, index) => (
//             <div
//               key={booking.id}
//               className='overflow-hidden rounded-lg border border-border bg-card'
//             >
//               {/* Collapsed View */}
//               <button
//                 onClick={() => toggleExpand(booking.id)}
//                 className='flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-accent/50 md:p-5'
//               >
//                 <div className='flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-6'>
//                   <span className='text-sm text-muted-foreground md:text-base'>
//                     {index + 1}.
//                   </span>
//                   <div className='grid min-w-0 flex-1 grid-cols-1 gap-2 text-sm md:grid-cols-3 md:gap-4 md:text-base'>
//                     <span className='truncate'>
//                       <span className='font-medium'>Organizer Name:</span>{" "}
//                       {booking.organizerName}
//                     </span>
//                     <span className='truncate'>
//                       <span className='font-medium'>Price Range:</span>{" "}
//                       {booking.priceRange}
//                     </span>
//                     <span className='truncate'>
//                       <span className='font-medium'>Date:</span> {booking.date}
//                     </span>
//                   </div>
//                   <span
//                     className={`self-start whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium md:self-center ${
//                       booking.status === "New"
//                         ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
//                         : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
//                     }`}
//                   >
//                     {booking.status}
//                   </span>
//                 </div>
//                 <div className='flex-shrink-0'>
//                   {expandedId === booking.id ? (
//                     <ChevronUp className='h-5 w-5 text-muted-foreground' />
//                   ) : (
//                     <ChevronDown className='h-5 w-5 text-muted-foreground' />
//                   )}
//                 </div>
//               </button>

//               {/* Expanded View */}
//               {expandedId === booking.id && (
//                 <div className='border-t border-border bg-muted/30 p-4 md:p-6'>
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       handleFormSubmit(booking.id, "submit");
//                     }}
//                     className='space-y-5'
//                   >
//                     {/* Agent */}
//                     <div className='space-y-2'>
//                       <Label
//                         htmlFor={`agent-${booking.id}`}
//                         className='font-medium'
//                       >
//                         Agent
//                       </Label>
//                       <Select>
//                         <SelectTrigger id={`agent-${booking.id}`}>
//                           <SelectValue placeholder='Select Agent' />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value='agent1'>Agent 1</SelectItem>
//                           <SelectItem value='agent2'>Agent 2</SelectItem>
//                           <SelectItem value='agent3'>Agent 3</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     {/* Artist */}
//                     <div className='space-y-2'>
//                       <Label
//                         htmlFor={`artist-${booking.id}`}
//                         className='font-medium'
//                       >
//                         Artist
//                       </Label>
//                       <div className='relative'>
//                         <Input
//                           id={`artist-${booking.id}`}
//                           placeholder='Write here'
//                           className='pr-28'
//                         />
//                         <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary'>
//                           Enter Amount
//                         </span>
//                       </div>
//                     </div>

//                     {/* Venue */}
//                     <div className='space-y-2'>
//                       <Label
//                         htmlFor={`venue-${booking.id}`}
//                         className='font-medium'
//                       >
//                         Venue
//                       </Label>
//                       <div className='relative'>
//                         <Input
//                           id={`venue-${booking.id}`}
//                           placeholder='Write here'
//                           className='pr-16'
//                         />
//                         <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-primary'>
//                           $500
//                         </span>
//                       </div>
//                     </div>

//                     {/* Location */}
//                     <div className='space-y-2'>
//                       <Label
//                         htmlFor={`location-${booking.id}`}
//                         className='font-medium'
//                       >
//                         Location
//                       </Label>
//                       <Input
//                         id={`location-${booking.id}`}
//                         placeholder='Write here'
//                       />
//                     </div>

//                     {/* Date */}
//                     <div className='space-y-2'>
//                       <Label
//                         htmlFor={`date-${booking.id}`}
//                         className='font-medium'
//                       >
//                         Date
//                       </Label>
//                       <div className='relative'>
//                         <Input
//                           id={`date-${booking.id}`}
//                           placeholder='Name'
//                           className='pr-10'
//                         />
//                         <Calendar className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
//                       </div>
//                     </div>

//                     {/* Time */}
//                     <div className='space-y-2'>
//                       <Label
//                         htmlFor={`time-${booking.id}`}
//                         className='font-medium'
//                       >
//                         Time
//                       </Label>
//                       <div className='flex items-center gap-2'>
//                         <Input
//                           id={`time-${booking.id}`}
//                           placeholder='Name'
//                           className='flex-1'
//                         />
//                         <div className='flex items-center gap-1 rounded-md border border-input bg-background'>
//                           <Input
//                             type='number'
//                             min='0'
//                             max='12'
//                             placeholder='09'
//                             className='w-14 border-0 px-2 text-center'
//                           />
//                           <span className='text-muted-foreground'>:</span>
//                           <Input
//                             type='number'
//                             min='0'
//                             max='59'
//                             placeholder='00'
//                             className='w-14 border-0 px-2 text-center'
//                           />
//                         </div>
//                         <div className='flex overflow-hidden rounded-md border border-input'>
//                           <button
//                             type='button'
//                             className='bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent'
//                           >
//                             AM
//                           </button>
//                           <button
//                             type='button'
//                             className='bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent'
//                           >
//                             PM
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Total Amount */}
//                     <div className='space-y-2'>
//                       <Label
//                         htmlFor={`total-${booking.id}`}
//                         className='font-medium'
//                       >
//                         Total Amount
//                       </Label>
//                       <Input
//                         id={`total-${booking.id}`}
//                         placeholder='Write here'
//                       />
//                     </div>

//                     {/* Upload Documents */}
//                     <div className='space-y-2'>
//                       <Label
//                         htmlFor={`upload-${booking.id}`}
//                         className='font-medium'
//                       >
//                         Upload Documents
//                       </Label>
//                       <div className='flex items-center justify-between rounded-md border border-input bg-background px-4 py-3'>
//                         <span className='text-sm text-muted-foreground'>
//                           xyz.pdf
//                         </span>
//                         <Upload className='h-5 w-5 text-muted-foreground' />
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className='flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end'>
//                       <Button
//                         type='button'
//                         variant='outline'
//                         className='w-full sm:w-auto bg-transparent'
//                         onClick={() => setExpandedId(null)}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type='button'
//                         variant='outline'
//                         className='w-full sm:w-auto bg-transparent'
//                         onClick={() => handleFormSubmit(booking.id, "download")}
//                       >
//                         Download
//                       </Button>
//                       <Button
//                         type='button'
//                         variant='outline'
//                         className='w-full sm:w-auto bg-transparent'
//                         onClick={() =>
//                           handleFormSubmit(booking.id, "send-to-artist")
//                         }
//                       >
//                         Send to Artist
//                       </Button>
//                       <Button type='submit' className='w-full sm:w-auto'>
//                         Accept & Send
//                       </Button>
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredBookings.length === 0 && (
//           <div className='rounded-lg border border-border bg-card p-12 text-center'>
//             <p className='text-muted-foreground'>
//               No bookings found in this category.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
