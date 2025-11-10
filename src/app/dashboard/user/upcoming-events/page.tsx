"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConcertEvent {
  id: number;
  type: string;
  dateTime: string;
  image: string;
  title: string;
  description: string;
  location: string;
  price: string;
  artist: string;
  defaultPurchased?: boolean;
}

const CONCERT_EVENTS: ConcertEvent[] = [
  {
    id: 1,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
  {
    id: 2,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
    defaultPurchased: true,
  },
  {
    id: 3,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
  {
    id: 4,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
  {
    id: 5,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
  {
    id: 6,
    type: "Live Concert",
    dateTime: "25 December 2025, 7:00 PM – 11:00 PM",
    image: "/concert-stage-with-musicians-performing-live-music.jpg",
    title: "Summer Beats 2025",
    description:
      "Join the biggest open-air concert of the year featuring top Bangladeshi bands and DJs. Experience music, lights, and vibes",
    location: "Army Stadium, Dhaka, Bangladesh",
    price: "$1250",
    artist: "Arijit, Sunney Leon",
  },
];

export default function Home() {
  const [purchasedEvents, setPurchasedEvents] = useState<number[]>(
    CONCERT_EVENTS.filter((e) => e.defaultPurchased).map((e) => e.id)
  );

  const handlePurchase = (eventId: number) => {
    setPurchasedEvents((prev) => [...prev, eventId]);
  };

  const isPurchased = (eventId: number) => purchasedEvents.includes(eventId);

  return (
    <main className='min-h-screen bg-background py-8 px-4 md:px-6 lg:px-8'>
      <div className='container mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-12'>
          Live Concert Events
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {CONCERT_EVENTS.map((event) => (
            <div
              key={event.id}
              className='flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300'
            >
              {/* Header Badge and DateTime */}
              <div className='p-4 pb-2'>
                <div className='inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-2'>
                  {event.type}
                </div>
                <p className='text-muted-foreground text-sm'>
                  {event.dateTime}
                </p>
              </div>

              {/* Event Image */}
              <div className='relative w-full h-48 px-4'>
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className='object-cover rounded'
                />
              </div>

              {/* Content */}
              <div className='flex-1 flex flex-col p-4'>
                {/* Title and Price */}
                <div className='flex items-start justify-between gap-2 mb-2'>
                  <h2 className='text-lg font-bold text-foreground flex-1'>
                    {event.title}
                  </h2>
                  <span className='text-primary font-semibold text-sm whitespace-nowrap'>
                    {event.price}
                  </span>
                </div>

                {/* Description */}
                <p className='text-muted-foreground text-sm mb-4 flex-1'>
                  {event.description}
                </p>

                {/* Location */}
                <div className='flex items-start gap-2 mb-4'>
                  <MapPin className='w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5' />
                  <span className='text-sm text-muted-foreground'>
                    {event.location}
                  </span>
                </div>

                {/* Artist */}
                <div className='mb-6'>
                  <p className='text-sm font-semibold text-foreground mb-1'>
                    Artist
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {event.artist}
                  </p>
                </div>

                {/* Button */}
                <div className='mt-auto'>
                  {isPurchased(event.id) ? (
                    <Button
                      disabled
                      variant='outline'
                      className='w-full justify-center bg-transparent'
                    >
                      Already Purchases
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePurchase(event.id)}
                      className='w-full justify-center'
                      variant='default'
                    >
                      Buy Ticket Now
                      <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
//   DrawerClose,
// } from "@/components/ui/drawer";
// import { X, Check, Menu, Search, Users, Ticket, MapPin } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";

// interface Booking {
//   eventName: string;
//   venueName: string;
//   location: string;
//   date: string;
//   totalPrice: string;
// }

// interface Contact {
//   name: string;
//   role: string;
//   phone: string;
//   email: string;
//   avatar: string;
// }

// const upcomingEvents: Booking[] = [
//   {
//     eventName: "DJ Nova Live",
//     venueName: "Electric Hall",
//     location: "New York, USA",
//     date: "Aug 25",
//     totalPrice: "$12,400",
//   },
//   {
//     eventName: "Rock Fusion Night",
//     venueName: "Sunset Arena",
//     location: "Los Angeles, USA",
//     date: "Sep 3",
//     totalPrice: "$18,900",
//   },
//   {
//     eventName: "Symphony Classics",
//     venueName: "Grand Theatre",
//     location: "Chicago, USA",
//     date: "Oct 12",
//     totalPrice: "$9,750",
//   },
//   {
//     eventName: "Hip-Hop Vibes",
//     venueName: "Metro Dome",
//     location: "Houston, USA",
//     date: "Nov 5",
//     totalPrice: "$15,200",
//   },
//   {
//     eventName: "Indie Nights",
//     venueName: "Luna Club",
//     location: "San Francisco, USA",
//     date: "Sep 20",
//     totalPrice: "$7,600",
//   },
//   {
//     eventName: "Jazz Evening",
//     venueName: "Blue Note Hall",
//     location: "New Orleans, USA",
//     date: "Oct 7",
//     totalPrice: "$5,800",
//   },
//   {
//     eventName: "Pop Sensation Tour",
//     venueName: "Galaxy Stadium",
//     location: "Miami, USA",
//     date: "Dec 15",
//     totalPrice: "$22,000",
//   },
//   {
//     eventName: "Classical Harmony",
//     venueName: "Royal Concert Hall",
//     location: "Boston, USA",
//     date: "Aug 30",
//     totalPrice: "$11,450",
//   },
//   {
//     eventName: "EDM Blast",
//     venueName: "Pulse Arena",
//     location: "Las Vegas, USA",
//     date: "Sep 14",
//     totalPrice: "$19,800",
//   },
//   {
//     eventName: "Country Roads Festival",
//     venueName: "Oakwood Park",
//     location: "Nashville, USA",
//     date: "Oct 21",
//     totalPrice: "$13,600",
//   },
//   {
//     eventName: "Latin Nights",
//     venueName: "Havana Club",
//     location: "Miami, USA",
//     date: "Nov 9",
//     totalPrice: "$10,250",
//   },
//   {
//     eventName: "Metal Madness",
//     venueName: "Iron Arena",
//     location: "Detroit, USA",
//     date: "Sep 28",
//     totalPrice: "$16,900",
//   },
//   {
//     eventName: "R&B Grooves",
//     venueName: "Soul Theatre",
//     location: "Atlanta, USA",
//     date: "Dec 2",
//     totalPrice: "$8,700",
//   },
//   {
//     eventName: "Festival of Lights",
//     venueName: "Central Park",
//     location: "New York, USA",
//     date: "Dec 31",
//     totalPrice: "$25,500",
//   },
//   {
//     eventName: "Acoustic Sessions",
//     venueName: "Harmony Hall",
//     location: "Seattle, USA",
//     date: "Oct 18",
//     totalPrice: "$6,300",
//   },
// ];

// const contactInfo: Contact = {
//   name: "Sarah Williams",
//   role: "Rock Music Guitarist",
//   phone: "(212) 658-3916",
//   email: "name@gmail.com",
//   avatar: "/client.png",
// };

// export default function UpcomingEvents() {
//   const [events, setEvents] = useState<Booking[]>(upcomingEvents);
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleDelete = (bookingId: string) => {
//     // setBookings(bookings.filter((booking) => booking.id !== bookingId));
//   };

//   const handleViewDetails = (booking: Booking) => {
//     setSelectedBooking(booking);
//     setIsDrawerOpen(true);
//   };

//   const handleMessageBuyer = () => {
//     console.log("Message buyer clicked");
//   };

//   const SidebarContent = () => (
//     <Card className='bg-white !border-none !shadow-none'>
//       <CardContent className='p-6'>
//         <div className='border border-gray-200 rounded-3xl shadow-md pt-6 mb-8'>
//           <div className='flex flex-col items-center text-center'>
//             <h2 className='text-lg font-semibold text-[#1E1E1E] mb-4'>
//               Artist Information
//             </h2>
//             <Avatar className='h-20 w-20 mb-4'>
//               <AvatarImage
//                 src={contactInfo.avatar || "/placeholder.svg"}
//                 alt={contactInfo.name}
//               />
//               <AvatarFallback>SW</AvatarFallback>
//             </Avatar>

//             <h4 className='text-xl font-semibold text-[#1E1E1E] mb-1'>
//               {contactInfo.name}
//             </h4>
//             <p className='text-sm text-[#6B7280] mb-4'>{contactInfo.role}</p>

//             <div className='text-sm text-[#6B7280] mb-6 space-y-1'>
//               <p>
//                 Contact: {contactInfo.phone}, Email: {contactInfo.email}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className='mb-6 flex flex-col items-center justify-center'>
//           <h3 className='text-2xl font-medium text-[#1E1E1E] mb-4'>
//             Sunset Arena
//           </h3>

//           <div className='space-y-1.5 text-base text-center'>
//             <div className='flex items-center justify-center gap-2'>
//               <Users className='h-4 w-4 text-[#1E1E1E]' />
//               <div>
//                 <span className='text-[#1E1E1E]'>Capacity:</span>{" "}
//                 <span className='text-[#1E1E1E]'> 1200+</span>
//               </div>
//             </div>

//             <div className='flex items-center justify-center gap-2'>
//               <Ticket className='h-4 w-4 text-[#1E1E1E]' />
//               <div>
//                 <span className='text-[#1E1E1E]'>Price/rate:</span>{" "}
//                 <span className='text-[#1E1E1E]'>$2,500</span>
//               </div>
//             </div>

//             <div className='flex items-center justify-center gap-2'>
//               <div className='flex flex-wrap items-center justify-center gap-2'>
//                 <span className='text-[#1E1E1E]'>Phone: +1 212-555-0193,</span>
//                 <span className='text-[#1E1E1E]'>
//                   Email: aurora.dj@email.com
//                 </span>
//               </div>
//             </div>

//             <div className='flex items-center justify-center gap-2'>
//               <MapPin className='h-4 w-4 text-[#1E1E1E]' />
//               <div>
//                 <span className='text-[#1E1E1E]'>Location:</span>{" "}
//                 <span className='text-[#1E1E1E]'>New York, USA</span>
//               </div>
//             </div>

//             <div>
//               <Image
//                 src={"/location-map.png"}
//                 alt={"Venue Location Map"}
//                 width={500}
//                 height={500}
//                 className='w-full h-full object-cover rounded-md'
//               />
//             </div>
//             <p className='text-sm text-[#222429] mt-4'>View Location</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className='min-h-screen bg-transparent'>
//       <div className='container mx-auto'>
//         <div className='mb-6 flex items-center justify-between'>
//           {/* Venue Upcoming Events Header */}
//           <div className='w-full flex items-center justify-between'>
//             <h2 className='text-lg lg:text-2xl font-semibold text-[#1C1C1C]'>
//               Upcoming event lists
//             </h2>
//             <div className='relative'>
//               <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
//               <Input
//                 placeholder='Search for artist...'
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className='pl-10 max-w-md lg: rounded-md border border-gray-200 focus:border-blue-500 focus:ring-blue-500'
//               />
//             </div>
//           </div>

//           <div className='flex items-center gap-2 lg:hidden shadow-2xl'>
//             <Drawer
//               open={isDrawerOpen}
//               onOpenChange={setIsDrawerOpen}
//               direction='right'
//             >
//               <DrawerTrigger asChild>
//                 <Button variant='ghost' size='icon'>
//                   <Menu className='h-5 w-5' />
//                 </Button>
//               </DrawerTrigger>
//               <DrawerContent className='w-80 sm:w-96'>
//                 <DrawerHeader className='flex flex-row items-center justify-between'>
//                   <DrawerTitle></DrawerTitle>
//                   <DrawerClose asChild>
//                     <Button variant='ghost' size='icon'>
//                       <X className='h-5 w-5' />
//                     </Button>
//                   </DrawerClose>
//                 </DrawerHeader>
//                 <div className='p-4 pt-0'>
//                   <SidebarContent />
//                 </div>
//               </DrawerContent>
//             </Drawer>
//           </div>
//         </div>

//         <div className='flex flex-col gap-6 lg:flex-row'>
//           <div className='flex-1'>
//             <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
//               {events.map((event) => (
//                 <Card
//                   key={event.eventName}
//                   className='overflow-hidden border border-gray-200 bg-white'
//                 >
//                   <CardContent className='px-6'>
//                     <h3 className='mb-4 text-xl font-semibold text-[#1E1E1E]'>
//                       {event.eventName}
//                     </h3>

//                     <div className='space-y-3 text-sm'>
//                       <div className='flex items-start gap-2'>
//                         <span className='text-[#1E1E1E]'>•</span>
//                         <div>
//                           <span className='font-medium text-[#1E1E1E]'>
//                             Venue:
//                           </span>{" "}
//                           <span className='text-[#1E1E1E]'>
//                             {event.venueName}
//                           </span>
//                         </div>
//                       </div>

//                       <div className='flex items-start gap-2'>
//                         <span className='text-[#1E1E1E]'>•</span>
//                         <div className='flex items-center gap-2'>
//                           <span className='font-medium text-[#1E1E1E]'>
//                             Location:
//                           </span>
//                           <div className='flex items-center gap-1'>
//                             <span className='text-[#1E1E1E] capitalize'>
//                               {event.location}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className='flex items-start gap-2'>
//                         <span className='text-[#1E1E1E]'>•</span>
//                         <div>
//                           <span className='font-medium text-[#1E1E1E]'>
//                             Date:
//                           </span>{" "}
//                           <span className='text-[#1E1E1E]'>
//                             {event.date.toLocaleString()}
//                           </span>
//                         </div>
//                       </div>

//                       <div className='flex items-start gap-2'>
//                         <span className='text-[#1E1E1E]'>•</span>
//                         <div>
//                           <span className='font-medium text-[#1E1E1E]'>
//                             Total Spend:
//                           </span>{" "}
//                           <span className='text-[#1E1E1E]'>
//                             {event.totalPrice}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className='mt-6 space-y-2'>
//                       <Button
//                         variant='secondary'
//                         className='w-full h-[38px] bg-[#DFEBF7] text-[#235789] hover:bg-blue-100'
//                         onClick={() => handleViewDetails(event)}
//                       >
//                         View Details
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
