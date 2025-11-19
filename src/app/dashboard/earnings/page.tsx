"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetSubscriptionInfoQuery } from "@/redux/features/admin/adminAPI";

interface ISubscription {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  features: string[];
  price: number;
  isHot: boolean;
  subscribed_user_count: number;
  subscription_interval: "MONTHLY" | "YEARLY";
  isOwned: boolean;
}

export default function UserListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: users } = useGetSubscriptionInfoQuery({
    page: page,
    limit: limit,
    search: searchTerm,
  });

  const pagination = users?.meta?.pagination;
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalUsers = pagination?.total || 0;

  return (
    <div className='min-h-screen bg-transparent'>
      <div className='w-full'>
        {/* Header */}
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-2.5'>
          <h1 className='text-2xl font-semibold text-gray-900'>Earning List</h1>
          <div className='relative w-full sm:w-80 bg-transparent rounded-xl'>
            <Search className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <Input
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className='pr-10 text-black'
            />
          </div>
        </div>

        {/* Table Container */}
        <div className='overflow-hidden rounded-sm bg-white shadow'>
          {/* Desktop Table */}
          <div className='hidden md:block'>
            <table className='w-full'>
              <thead className='!bg-table-header-bg'>
                <tr className='!bg-[#235789]'>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Subscription
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Total Subscriber
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Date
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Per Price
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {users?.data?.map((user: ISubscription) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.name || "N/A"}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.subscription_interval || "N/A"}
                    </td>
                    <td className='px-6 py-4 text-base text-black font-medium'>
                      <span className='border-2 border-green-500 px-2 rounded-2xl'>
                        {user.subscribed_user_count || "N/A"}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.created_at.split("T")[0] || "N/A"}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.price || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className='md:hidden'>
            <div className='bg-orange-400 px-4 py-3'>
              <h2 className='text-sm font-medium text-white'>User List</h2>
            </div>
            <div className='divide-y divide-gray-200'>
              {users?.data?.map((user: ISubscription) => (
                <div key={user.id} className='p-4'>
                  <div className='flex items-start gap-3'>
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-medium text-gray-900'>
                          {user.name}
                        </h3>
                      </div>
                      <div className='space-y-1 text-base text-gray-900'>
                        <p className='font-medium'>
                          Subscription:{" "}
                          <span className='font-normal'>
                            {user.subscription_interval}
                          </span>
                        </p>
                        <p className='font-medium'>
                          Total Subscriber: {user.subscribed_user_count}
                        </p>
                        <p className='font-medium'>Price: {user.price}</p>
                        <p className='font-medium'>
                          Date: {user.created_at.split("T")[0]}
                        </p>
                      </div>
                      <div className='flex items-center justify-between pt-2'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className='mt-6 flex items-center justify-center gap-3'>
          <Button
            variant='outline'
            size='sm'
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Previous
          </Button>

          <span className='text-sm font-medium'>
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant='outline'
            size='sm'
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>

        {/* Results info */}
        <div className='mt-2 text-center text-gray-600 text-sm'>
          Showing {users?.data?.length} of {totalUsers} users
        </div>
      </div>
    </div>
  );
}
