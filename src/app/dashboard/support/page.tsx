"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";

interface SupportQuery {
  id: string;
  title: string;
  agent: string;
  email: string;
  description: string;
  avatar: string;
  status: "open" | "in-progress" | "resolved";
}

const mockSupportQueries: SupportQuery[] = [
  {
    id: "1",
    title: "Payment Issue - US",
    agent: "Agent",
    email: "hello@gmail.com",
    description:
      "You want a real system where it saves and shows support messages automatically.",
    avatar: "/client.jpg",
    status: "open",
  },
  {
    id: "2",
    title: "Account Access Problem",
    agent: "Agent",
    email: "support@gmail.com",
    description:
      "User unable to access their account after password reset. Needs immediate assistance.",
    avatar: "/client.jpg",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Feature Request - Dashboard",
    agent: "Agent",
    email: "hello@gmail.com",
    description:
      "Request for additional dashboard features and improved user interface elements.",
    avatar: "/client.jpg",
    status: "open",
  },
  {
    id: "4",
    title: "Billing Inquiry - EU",
    agent: "Agent",
    email: "billing@gmail.com",
    description:
      "Questions about billing cycle and payment methods for European customers.",
    avatar: "/client.jpg",
    status: "resolved",
  },
  {
    id: "5",
    title: "Technical Support - API",
    agent: "Agent",
    email: "tech@gmail.com",
    description:
      "Developer needs help with API integration and authentication setup.",
    avatar: "/client.jpg",
    status: "in-progress",
  },
  {
    id: "6",
    title: "Data Export Request",
    agent: "Agent",
    email: "hello@gmail.com",
    description:
      "Customer requesting full data export in compliance with privacy regulations.",
    avatar: "/client.jpg",
    status: "open",
  },
  {
    id: "7",
    title: "Data Export Request",
    agent: "Agent",
    email: "hello@gmail.com",
    description:
      "Customer requesting full data export in compliance with privacy regulations.",
    avatar: "/client.jpg",
    status: "open",
  },
  {
    id: "8",
    title: "Data Export Request",
    agent: "Agent",
    email: "hello@gmail.com",
    description:
      "Customer requesting full data export in compliance with privacy regulations.",
    avatar: "/client.jpg",
    status: "open",
  },
  {
    id: "9",
    title: "Data Export Request",
    agent: "Agent",
    email: "hello@gmail.com",
    description:
      "Customer requesting full data export in compliance with privacy regulations.",
    avatar: "/client.jpg",
    status: "open",
  },
];

export default function SupportPage() {
  const [queries] = useState<SupportQuery[]>(mockSupportQueries);
  const [selectedQuery, setSelectedQuery] = useState<SupportQuery | null>(null);

  const handleQueryClick = (query: SupportQuery) => {
    setSelectedQuery(query);
  };

  const handleBackClick = () => {
    setSelectedQuery(null);
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  if (selectedQuery) {
    return (
      <div className='min-h-screen bg-transparent p-4 md:p-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center gap-4 mb-6'>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleBackClick}
              className='flex items-center gap-2'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to Support
            </Button>
          </div>

          <Card className='p-6 md:p-8'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='flex-shrink-0'>
                <Image
                  width={64}
                  height={64}
                  src={selectedQuery.avatar || "/placeholder.svg"}
                  alt='Agent'
                  className='w-16 h-16 rounded-full object-cover'
                />
              </div>

              <div className='flex-1'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4'>
                  <div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                      {selectedQuery.title}
                    </h1>
                    <p className='text-sm text-[#235789] font-medium mb-1'>
                      {selectedQuery.agent}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleEmailClick(selectedQuery.email)}
                    className='flex items-center gap-2 bg-[#235789] hover:bg-[#235789]'
                  >
                    <Mail className='h-4 w-4' />
                    {selectedQuery.email}
                  </Button>
                </div>

                <div className='prose max-w-none'>
                  <p className='text-[#6B7280] text-base leading-relaxed'>
                    {selectedQuery.description}
                  </p>
                </div>

                {/* <div className='mt-6 pt-6 border-t border-gray-200'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500'>Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuery.status === "open"
                          ? "bg-red-100 text-red-800"
                          : selectedQuery.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedQuery.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-6'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {queries.map((query) => (
            <Card
              key={query.id}
              className='p-6 bg-[#E7F0F9] border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer'
              onClick={() => handleQueryClick(query)}
            >
              <div className='mb-4'>
                <h3 className='text-2xl font-semibold text-[#000000] mb-1'>
                  Support Queries
                </h3>
              </div>

              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0'>
                  <Image
                    width={48}
                    height={48}
                    src={query.avatar || "/placeholder.svg"}
                    alt='Agent'
                    className='w-12 h-12 rounded-full object-cover'
                  />
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between mb-2'>
                    <h4 className='font-semibold text-[#030712] text-base'>
                      {query.title}
                    </h4>
                    <Button
                      variant='link'
                      size='sm'
                      className='text-[#235789] hover:text-[#235789] p-0 h-auto font-normal text-sm'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEmailClick(query.email);
                      }}
                    >
                      {query.email}
                    </Button>
                  </div>

                  <p className='inline-flex text-xs text-[#235789] bg-[#53799c4d] font-medium rounded-full mb-3 px-3 py-1'>
                    {query.agent}
                  </p>

                  <p className='text-sm text-gray-600 leading-relaxed line-clamp-3'>
                    {query.description}
                  </p>

                  {/* <div className='mt-3 pt-3 border-t border-blue-200'>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        query.status === "open"
                          ? "bg-red-100 text-red-800"
                          : query.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {query.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div> */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
