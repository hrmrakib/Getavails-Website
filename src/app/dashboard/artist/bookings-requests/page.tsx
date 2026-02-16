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
import { Search, Trash2, Eye, Users } from "lucide-react";
import Image from "next/image";

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
  status: "Pending" | "Confirmed" | "Cancelled";
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
    status: "Pending",
  },
  {
    id: "SL-002",
    buyerName: "Ayesha Rahman",
    buyerAvatar: "/client.png",
    buyerContact: "(646) 421-7788",
    buyerEmail: "ayesha.rahman@email.com",
    artistName: "Diego Álvarez",
    artistAvatar: "/diverse-man-portrait.png",
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
    status: "Cancelled",
  },
  {
    id: "SL-004",
    buyerName: "Fatima Noor",
    buyerAvatar: "/client.png",
    buyerContact: "(718) 204-5567",
    buyerEmail: "fatima.noor@email.com",
    artistName: "Arjun Mehta",
    artistAvatar: "/diverse-man-portrait.png",
    artistLocation: "Mumbai, India",
    artistRate: "$1,500 per event",
    artistSpecialty: "Bollywood DJ",
    date: "20-07-2025",
    status: "Pending",
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
    artistAvatar: "/diverse-man-portrait.png",
    artistLocation: "Austin, United States",
    artistRate: "$1,000 per event",
    artistSpecialty: "Indie Band",
    date: "30-07-2025",
    status: "Pending",
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
    status: "Cancelled",
  },
  {
    id: "SL-008",
    buyerName: "Priya Sen",
    buyerAvatar: "/client.png",
    buyerContact: "(347) 219-6630",
    buyerEmail: "priya.sen@email.com",
    artistName: "Mahfuz Anwar",
    artistAvatar: "/diverse-man-portrait.png",
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
    status: "Pending",
  },
  {
    id: "SL-010",
    buyerName: "Emily Stone",
    buyerAvatar: "/client.png",
    buyerContact: "(206) 592-4313",
    buyerEmail: "emily.stone@email.com",
    artistName: "Hans Müller",
    artistAvatar: "/diverse-man-portrait.png",
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
    status: "Pending",
  },
  {
    id: "SL-012",
    buyerName: "Lucie Dubois",
    buyerAvatar: "/client.png",
    buyerContact: "(617) 233-9055",
    buyerEmail: "lucie.dubois@email.com",
    artistName: "Marco Rossi",
    artistAvatar: "/diverse-man-portrait.png",
    artistLocation: "Milan, Italy",
    artistRate: "$1,100 per event",
    artistSpecialty: "Saxophonist",
    date: "22-08-2025",
    status: "Cancelled",
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
    status: "Pending",
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
    artistAvatar: "/diverse-man-portrait.png",
    artistLocation: "Kumasi, Ghana",
    artistRate: "$750 per event",
    artistSpecialty: "Drumming Ensemble",
    date: "02-09-2025",
    status: "Cancelled",
  },
  {
    id: "SL-017",
    buyerName: "Sara Ali",
    buyerAvatar: "/client.png",
    buyerContact: "(646) 878-9921",
    buyerEmail: "sara.ali@email.com",
    artistName: "Rafiq Chowdhury",
    artistAvatar: "/diverse-man-portrait.png",
    artistLocation: "Chittagong, Bangladesh",
    artistRate: "$550 per event",
    artistSpecialty: "Qawwali Group",
    date: "05-09-2025",
    status: "Pending",
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
    status: "Pending",
  },
  {
    id: "SL-020",
    buyerName: "Zara Khan",
    buyerAvatar: "/client.png",
    buyerContact: "(281) 634-2217",
    buyerEmail: "zara.khan@email.com",
    artistName: "Tomás García",
    artistAvatar: "/diverse-man-portrait.png",
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
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState(mockBookings);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.buyerName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      booking.artistName?.toLowerCase().includes(searchTerm?.toLowerCase()),
  );

  const handleStatusChange = (
    bookingIndex: number,
    newStatus: "Confirmed" | "Cancelled",
  ) => {
    const updatedBookings = [...bookings];
    updatedBookings[bookingIndex].status = newStatus;
    setBookings(updatedBookings);
    setIsDrawerOpen(false);
  };

  const handleViewDetails = (booking: BookingRequest) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge
            variant='secondary'
            className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
          >
            Pending
          </Badge>
        );
      case "Confirmed":
        return (
          <Badge
            variant='secondary'
            className='bg-green-100 text-green-800 hover:bg-green-100'
          >
            Confirm
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge
            variant='secondary'
            className='bg-red-100 text-red-800 hover:bg-red-100'
          >
            Cancel
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
                  Request Id
                </th>
                <th className='px-4 py-3 text-left text-base font-medium'>
                  Buyer name
                </th>
                <th className='px-4 py-3 text-left text-base font-medium'>
                  Artist name
                </th>
                <th className='px-4 py-3 text-left text-base font-medium'>
                  Date
                </th>
                <th className='px-4 py-3 text-left text-base font-medium hidden md:table-cell'>
                  Status
                </th>
                <th className='px-4 py-3 text-left text-base font-medium'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredBookings.map((booking, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='px-4 py-3 text-base'>{booking.id}</td>
                  <td className='px-4 py-3 text-base'>{booking.buyerName}</td>
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
                  <td className='px-4 py-3 text-base'>{booking.date}</td>
                  <td className='px-4 py-3 hidden md:table-cell'>
                    {getStatusBadge(booking.status)}
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
              <div className='bg-transparent rounded-lg p-4'>
                <h2 className='font-medium text-center text-2xl lg:text-[32px] text-[#222222] mb-3'>
                  Summer Beats Fest
                </h2>
                <p className='text-[#1E1E1E] text-center '>
                  Date & Time: {selectedBooking.date}
                </p>

                <div className='my-4'>
                  <h2 className='text-xl text-[#1E1E1E] font-medium text-center mb-4'>
                    Sunset Arena
                  </h2>
                  <div className='flex items-center justify-center gap-2 text-sm'>
                    <Users className='h-4 w-4' />
                    <span>Capicity: </span>
                    <span>1200+ </span>
                  </div>
                </div>

                <div>
                  <Image
                    src={"/location-map.png"}
                    alt={selectedBooking.artistName}
                    width={600}
                    height={600}
                    className='w-full h-full object-cover rounded-md'
                  />
                </div>

                <div className='flex flex-col items-center justify-center gap-3 mb-3'>
                  <Avatar className='h-16 w-16'>
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
                    <p className='font-medium text-[#1E1E1E]'>
                      {selectedBooking.buyerName}
                    </p>
                  </div>
                </div>
                <div className='space-y-1 text-center text-sm text-[#6B7280]'>
                  <p>Contact: {selectedBooking.buyerContact}</p>
                  <p>Email: {selectedBooking.buyerEmail}</p>
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

                <div className='flex gap-3'>
                  <Button
                    className='flex-1 h-11 bg-[#235789] hover:bg-[#235789]'
                    onClick={() =>
                      handleStatusChange(
                        bookings.findIndex((b) => b === selectedBooking),
                        "Confirmed",
                      )
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    variant='outline'
                    className='flex-1 h-11 text-[#E00101] border-[#E00101] hover:bg-[#e00101] hover:text-white bg-transparent'
                    onClick={() =>
                      handleStatusChange(
                        bookings.findIndex((b) => b === selectedBooking),
                        "Cancelled",
                      )
                    }
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
