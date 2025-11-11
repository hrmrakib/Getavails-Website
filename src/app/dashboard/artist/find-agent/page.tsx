/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Search, Trash2, Eye, MapPin } from "lucide-react";

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

const mockBookings: BookingRequest[] = [
  {
    id: "SL-001",
    buyerName: "John Lees",
    buyerAvatar: "/client.png",
    buyerContact: "(212) 658-3916",
    buyerEmail: "john.lees@email.com",
    artistName: "Kate Morrison",
    artistAvatar: "/client.png",
    artistLocation: "Buenos Aires, Argentina",
    artistRate: "$600 per event",
    artistSpecialty: "Jazz Guitarist",
    date: "25-06-2025",
    status: "Open",
  },
  {
    id: "SL-002",
    buyerName: "Ayesha Rahman",
    buyerAvatar: "/client.png",
    buyerContact: "(646) 421-7788",
    buyerEmail: "ayesha.rahman@email.com",
    artistName: "Diego Álvarez",
    artistAvatar: "/client.png",
    artistLocation: "Madrid, Spain",
    artistRate: "$1,200 per event",
    artistSpecialty: "Flamenco Guitarist",
    date: "02-07-2025",
    status: "Confirmed",
  },
  {
    id: "SL-003",
    buyerName: "Michael Turner",
    buyerAvatar: "/client.png",
    buyerContact: "(415) 903-1120",
    buyerEmail: "michael.turner@email.com",
    artistName: "Luna Chen",
    artistAvatar: "/client.png",
    artistLocation: "Taipei, Taiwan",
    artistRate: "$900 per event",
    artistSpecialty: "Pop Vocalist",
    date: "15-07-2025",
    status: "Full",
  },
  {
    id: "SL-004",
    buyerName: "Fatima Noor",
    buyerAvatar: "/client.png",
    buyerContact: "(718) 204-5567",
    buyerEmail: "fatima.noor@email.com",
    artistName: "Arjun Mehta",
    artistAvatar: "/client.png",
    artistLocation: "Mumbai, India",
    artistRate: "$1,500 per event",
    artistSpecialty: "Bollywood DJ",
    date: "20-07-2025",
    status: "Open",
  },
  {
    id: "SL-005",
    buyerName: "Santiago Pérez",
    buyerAvatar: "/client.png",
    buyerContact: "(305) 442-9811",
    buyerEmail: "santiago.perez@email.com",
    artistName: "Nora Ibrahim",
    artistAvatar: "/client.png",
    artistLocation: "Cairo, Egypt",
    artistRate: "$800 per event",
    artistSpecialty: "Oud Player",
    date: "28-07-2025",
    status: "Confirmed",
  },
  {
    id: "SL-006",
    buyerName: "Leah Kim",
    buyerAvatar: "/client.png",
    buyerContact: "(512) 345-7702",
    buyerEmail: "leah.kim@email.com",
    artistName: "Marcus Reed",
    artistAvatar: "/client.png",
    artistLocation: "Austin, United States",
    artistRate: "$1,000 per event",
    artistSpecialty: "Indie Band",
    date: "30-07-2025",
    status: "Open",
  },
  {
    id: "SL-007",
    buyerName: "Omar Khalid",
    buyerAvatar: "/client.png",
    buyerContact: "(773) 610-2844",
    buyerEmail: "omar.khalid@email.com",
    artistName: "Sofia Petrova",
    artistAvatar: "/client.png",
    artistLocation: "Sofia, Bulgaria",
    artistRate: "$700 per event",
    artistSpecialty: "Classical Violinist",
    date: "05-08-2025",
    status: "Full",
  },
  {
    id: "SL-008",
    buyerName: "Priya Sen",
    buyerAvatar: "/client.png",
    buyerContact: "(347) 219-6630",
    buyerEmail: "priya.sen@email.com",
    artistName: "Mahfuz Anwar",
    artistAvatar: "/client.png",
    artistLocation: "Dhaka, Bangladesh",
    artistRate: "$500 per event",
    artistSpecialty: "Bengali Folk Singer",
    date: "10-08-2025",
    status: "Confirmed",
  },
  {
    id: "SL-009",
    buyerName: "David Osei",
    buyerAvatar: "/client.png",
    buyerContact: "(404) 712-9086",
    buyerEmail: "david.osei@email.com",
    artistName: "Ama Boateng",
    artistAvatar: "/client.png",
    artistLocation: "Accra, Ghana",
    artistRate: "$650 per event",
    artistSpecialty: "Afrobeats Singer",
    date: "12-08-2025",
    status: "Open",
  },
  {
    id: "SL-010",
    buyerName: "Emily Stone",
    buyerAvatar: "/client.png",
    buyerContact: "(206) 592-4313",
    buyerEmail: "emily.stone@email.com",
    artistName: "Hans Müller",
    artistAvatar: "/client.png",
    artistLocation: "Berlin, Germany",
    artistRate: "$1,300 per event",
    artistSpecialty: "Techno DJ",
    date: "15-08-2025",
    status: "Confirmed",
  },
  {
    id: "SL-011",
    buyerName: "Jacob Cohen",
    buyerAvatar: "/client.png",
    buyerContact: "(702) 889-3345",
    buyerEmail: "jacob.cohen@email.com",
    artistName: "Yasmin Farah",
    artistAvatar: "/client.png",
    artistLocation: "Dubai, United Arab Emirates",
    artistRate: "$2,400 per event",
    artistSpecialty: "Wedding Singer",
    date: "18-08-2025",
    status: "Open",
  },
  {
    id: "SL-012",
    buyerName: "Lucie Dubois",
    buyerAvatar: "/client.png",
    buyerContact: "(617) 233-9055",
    buyerEmail: "lucie.dubois@email.com",
    artistName: "Marco Rossi",
    artistAvatar: "/client.png",
    artistLocation: "Milan, Italy",
    artistRate: "$1,100 per event",
    artistSpecialty: "Saxophonist",
    date: "22-08-2025",
    status: "Full",
  },
  {
    id: "SL-013",
    buyerName: "Chen Wei",
    buyerAvatar: "/client.png",
    buyerContact: "(858) 771-6612",
    buyerEmail: "chen.wei@email.com",
    artistName: "Anita Kapoor",
    artistAvatar: "/client.png",
    artistLocation: "Singapore, Singapore",
    artistRate: "$1,600 per event",
    artistSpecialty: "Bollywood Dance Troupe",
    date: "25-08-2025",
    status: "Confirmed",
  },
  {
    id: "SL-014",
    buyerName: "Carlos Silva",
    buyerAvatar: "/client.png",
    buyerContact: "(310) 499-2208",
    buyerEmail: "carlos.silva@email.com",
    artistName: "Fernanda Lima",
    artistAvatar: "/client.png",
    artistLocation: "São Paulo, Brazil",
    artistRate: "$950 per event",
    artistSpecialty: "Samba Band",
    date: "27-08-2025",
    status: "Open",
  },
  {
    id: "SL-015",
    buyerName: "Hiro Tanaka",
    buyerAvatar: "/client.png",
    buyerContact: "(971) 358-4455",
    buyerEmail: "hiro.tanaka@email.com",
    artistName: "Mika Sato",
    artistAvatar: "/client.png",
    artistLocation: "Tokyo, Japan",
    artistRate: "$1,800 per event",
    artistSpecialty: "Pianist",
    date: "30-08-2025",
    status: "Confirmed",
  },
  {
    id: "SL-016",
    buyerName: "Maya Johnson",
    buyerAvatar: "/client.png",
    buyerContact: "(414) 276-0198",
    buyerEmail: "maya.johnson@email.com",
    artistName: "Kwame Nkrumah",
    artistAvatar: "/client.png",
    artistLocation: "Kumasi, Ghana",
    artistRate: "$750 per event",
    artistSpecialty: "Drumming Ensemble",
    date: "02-09-2025",
    status: "Full",
  },
  {
    id: "SL-017",
    buyerName: "Sara Ali",
    buyerAvatar: "/client.png",
    buyerContact: "(646) 878-9921",
    buyerEmail: "sara.ali@email.com",
    artistName: "Rafiq Chowdhury",
    artistAvatar: "/client.png",
    artistLocation: "Chittagong, Bangladesh",
    artistRate: "$550 per event",
    artistSpecialty: "Qawwali Group",
    date: "05-09-2025",
    status: "Open",
  },
  {
    id: "SL-018",
    buyerName: "George Parker",
    buyerAvatar: "/client.png",
    buyerContact: "(303) 761-1129",
    buyerEmail: "george.parker@email.com",
    artistName: "Elena Popescu",
    artistAvatar: "/client.png",
    artistLocation: "Bucharest, Romania",
    artistRate: "$900 per event",
    artistSpecialty: "Opera Singer",
    date: "08-09-2025",
    status: "Confirmed",
  },
  {
    id: "SL-019",
    buyerName: "Noah Williams",
    buyerAvatar: "/client.png",
    buyerContact: "(416) 782-4456",
    buyerEmail: "noah.williams@email.com",
    artistName: "Olivia Brown",
    artistAvatar: "/client.png",
    artistLocation: "Toronto, Canada",
    artistRate: "$1,200 per event",
    artistSpecialty: "Acoustic Duo",
    date: "10-09-2025",
    status: "Open",
  },
  {
    id: "SL-020",
    buyerName: "Zara Khan",
    buyerAvatar: "/client.png",
    buyerContact: "(281) 634-2217",
    buyerEmail: "zara.khan@email.com",
    artistName: "Tomás García",
    artistAvatar: "/client.png",
    artistLocation: "Mexico City, Mexico",
    artistRate: "$1,400 per event",
    artistSpecialty: "Mariachi Band",
    date: "12-09-2025",
    status: "Confirmed",
  },
];

export default function BookingRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState(mockBookings);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.artistName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (booking: BookingRequest) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return (
          <Badge
            variant='secondary'
            className='bg-green-300 text-gray-900 hover:bg-yellow-100'
          >
            Open
          </Badge>
        );
      case "Full":
        return (
          <Badge
            variant='secondary'
            className='bg-red-400 text-gray-100 hover:bg-red-100'
          >
            Full
          </Badge>
        );
      default:
        return <Badge variant='secondary'>Unknown</Badge>;
    }
  };

  return (
    <div className='min-h-screen bg-transparent'>
      {/* Search and Table Container */}
      <div className='bg-white rounded-lg'>
        {/* Search Header */}
        <div className='py-4 lg:pb-8'>
          <div className='relative max-w-md ml-auto'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              placeholder='Search for artist....'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 h-12 bg-muted border-border'
            />
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto rounded-lg'>
          <table className='w-full'>
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
            <tbody className='divide-y divide-gray-200'>
              {filteredBookings.map((booking, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-6 w-6'>
                        <AvatarImage
                          src={booking.artistAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {booking.artistName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-base'>{booking.artistName}</span>
                    </div>
                  </td>
                  <td className='px-4 py-3 text-base'>{booking.buyerEmail}</td>
                  <td className='px-4 py-3 text-base'>
                    {booking.artistLocation}
                  </td>
                  <td className='px-4 py-3 text-base'>
                    {getStatusBadge(booking.status)}
                    {/* {booking.status} */}
                  </td>
                  <td className='px-4 py-3 hidden md:table-cell'>
                    10% per event
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => handleViewDetails(booking)}
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-center gap-2 p-4 border-t'>
          <Button variant='ghost' size='sm'>
            ← Previous
          </Button>
          <div className='flex gap-1'>
            <Button variant='ghost' size='sm'>
              1
            </Button>
            <Button variant='ghost' size='sm'>
              2
            </Button>
            <Button variant='default' size='sm'>
              3
            </Button>
            <span className='px-2 text-sm text-gray-500'>...</span>
            <Button variant='ghost' size='sm'>
              10
            </Button>
          </div>
          <Button variant='ghost' size='sm'>
            Next →
          </Button>
        </div>
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
  );
}
