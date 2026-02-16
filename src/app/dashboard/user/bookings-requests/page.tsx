"use client";
import { useState } from "react";
import { Search, CheckCircle, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface BookingRequest {
  id: number;
  title: string;
  dateTime: string;
  artistAgent?: string;
  location?: string;
  status: "confirmed" | "pending" | "cancelled";
  price: string;
  type: "artist" | "venue";
}

const bookingRequests: BookingRequest[] = [
  {
    id: 1,
    title: "DJ Nova Live",
    dateTime: "Aug 25, 9:00 PM",
    artistAgent: "DJ Nova (via TalentX Agency)",
    status: "confirmed",
    price: "$12,400",
    type: "artist",
  },
  {
    id: 2,
    title: "Sunset Arena",
    dateTime: "Aug 25",
    location: "New York, USA",
    status: "pending",
    price: "$12,400",
    type: "venue",
  },
  {
    id: 3,
    title: "Sunset Arena",
    dateTime: "Aug 25",
    location: "New York, USA",
    status: "cancelled",
    price: "$12,400",
    type: "venue",
  },
  {
    id: 4,
    title: "DJ Nova Live",
    dateTime: "Aug 25, 9:00 PM",
    artistAgent: "DJ Nova (via TalentX Agency)",
    status: "confirmed",
    price: "$12,400",
    type: "artist",
  },
  {
    id: 5,
    title: "Sunset Arena",
    dateTime: "Aug 25",
    location: "New York, USA",
    status: "pending",
    price: "$12,400",
    type: "venue",
  },
  {
    id: 6,
    title: "Sunset Arena",
    dateTime: "Aug 25",
    location: "New York, USA",
    status: "cancelled",
    price: "$12,400",
    type: "venue",
  },
];

export default function BookingRequestLists() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = bookingRequests.filter(
    (request) =>
      request.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      (request.artistAgent &&
        request.artistAgent
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase())) ||
      (request.location &&
        request.location?.toLowerCase().includes(searchQuery?.toLowerCase())),
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className='h-4 w-4 text-green-600' />;
      case "pending":
        return <Clock className='h-4 w-4 text-yellow-600' />;
      case "cancelled":
        return <X className='h-4 w-4 text-red-600' />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const handleMessageClick = (request: BookingRequest) => {};

  const handleCancelClick = (request: BookingRequest) => {};

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-6'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
          <h1 className='text-2xl font-medium text-[#222222]'>
            Booking request lists
          </h1>
          <div className='relative max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Search for artist...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>
      </div>

      {/* Booking Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredRequests.map((request) => (
          <Card
            key={request.id}
            className='bg-white border border-gray-200 hover:shadow-md transition-shadow'
          >
            <CardContent className='px-6'>
              {/* Card Header */}
              <div className='mb-4'>
                <h3 className='text-xl font-semibold text-[#1E1E1E] mb-3'>
                  {request.title}
                </h3>

                {/* Details List */}
                <div className='space-y-2 text-sm'>
                  <div className='flex items-start gap-2'>
                    <span className='text-[#1E1E1E] min-w-0'>•</span>
                    <span className='text-[#1E1E1E]'>
                      <span className='font-medium'>Date & Time:</span>{" "}
                      {request.dateTime}
                    </span>
                  </div>

                  {request.artistAgent && (
                    <div className='flex items-start gap-2'>
                      <span className='text-[#1E1E1E] min-w-0'>•</span>
                      <span className='text-[#1E1E1E]'>
                        <span className='font-medium'>Artist / Agent:</span>{" "}
                        {request.artistAgent}
                      </span>
                    </div>
                  )}

                  {request.location && (
                    <div className='flex items-start gap-2'>
                      <span className='text-[#1E1E1E] min-w-0'>•</span>
                      <span className='text-[#1E1E1E]'>
                        <span className='font-medium'>Location:</span>{" "}
                        {request.location}
                      </span>
                    </div>
                  )}

                  <div className='flex items-center gap-2'>
                    <span className='text-[#1E1E1E] min-w-0'>•</span>
                    <span className='text-[#1E1E1E] font-medium'>Status:</span>
                    <div className='flex items-center gap-1'>
                      {getStatusIcon(request.status)}
                      <span className='text-[#1E1E1E]'>
                        {getStatusText(request.status)}
                      </span>
                    </div>
                  </div>

                  <div className='flex items-start gap-2'>
                    <span className='text-[#1E1E1E] min-w-0'>•</span>
                    <span className='text-[#1E1E1E]'>
                      <span className='font-medium'>Price/rate:</span>{" "}
                      {request.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-5'>
                <Button
                  onClick={() => handleMessageClick(request)}
                  className='w-full h-11 bg-[#DFEBF7] hover:bg-[#dfebf7c5] text-[#235789] font-semibold border-0'
                  variant='outline'
                >
                  Message {request.type === "artist" ? "Artist" : "Venue"}
                </Button>
                <Button
                  onClick={() => handleCancelClick(request)}
                  variant='outline'
                  className='w-full border-[#D00000] text-[#D00000] hover:bg-red-50 hover:border-red-300'
                >
                  Cancel Request
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
