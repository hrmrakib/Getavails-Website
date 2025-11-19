"use client";

import { useState } from "react";
import { Search, Info, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/features/admin/adminAPI";
import { toast } from "sonner";

interface IAgent {
  id: string;
  created_at: string;
  updated_at: string;
  role: "AGENT";
  email: string;
  is_verified: boolean;
  is_active: boolean;
  is_admin: boolean;
  avatar: string;
  name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  location: string;
  balance: number;
  is_stripe_connected: boolean;
  subscription_name: string | null;
  experience: string;
  availability: string[];
  price: string;
  agent_artists: string[];
  agent_pending_artists: string[];
}

export default function AgentListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<IAgent | null>(null);
  const [deleteUserMutation, { isLoading: isDeleting }] =
    useDeleteUserMutation();
  const limit = 10;

  const { data: users, refetch } = useGetUsersQuery({
    role: "AGENT",
    page: page,
    limit: limit,
    search: searchTerm,
  });

  console.log(users);

  const pagination = users?.meta?.pagination;
  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalUsers = pagination?.total || 0;

  const handleActionClick = (user: IAgent) => {
    setSelectedUser(user);
    setActionModalOpen(true);
  };

  const handleUserDelete = async () => {
    try {
      const res = await deleteUserMutation({
        userId: deleteUserId,
      }).unwrap();

      console.log(res);

      if (res?.success) {
        refetch();
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteModalOpen(false);
      setActionModalOpen(false);
    }
  };

  return (
    <div className='min-h-screen bg-transparent'>
      <div className='w-full'>
        {/* Header */}
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-2.5'>
          <h1 className='text-2xl font-semibold text-gray-900'>User List</h1>
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
                    Sl no.
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Profile
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Email
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Location
                  </th>
                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Is Verified
                  </th>

                  <th className='px-6 py-4 text-left text-base font-medium text-[#fff]'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {users?.data?.map((user: IAgent) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.id}
                    </td>
                    <td className='px-6 py-4'>
                      <Avatar className='h-10 w-10'>
                        <AvatarImage
                          src={process.env.NEXT_PUBLIC_API_URL + user.avatar}
                          alt={user.name}
                          width={40}
                          height={40}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.name || "N/A"}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.email || "N/A"}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.location || "N/A"}
                    </td>
                    <td className='px-6 py-4 text-base text-table-color font-medium'>
                      {user.is_verified ? "✅ Verified" : "❌ Not Verified"}
                    </td>

                    <td className='px-6 py-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-10 w-10 p-0 cursor-pointer'
                        onClick={() => handleActionClick(user)}
                      >
                        <Info className='h-6 w-6 text-[#235789]' />
                      </Button>
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
              {users?.data?.map((user: IAgent) => (
                <div key={user.id} className='p-4'>
                  <div className='flex items-start gap-3'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={process.env.NEXT_PUBLIC_API_URL + user.avatar}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-medium text-gray-900'>
                          {user.name}
                        </h3>
                        <span className='text-xs text-gray-500'>{user.id}</span>
                      </div>
                      <div className='space-y-1 text-sm text-gray-600'>
                        <p>{user.email}</p>
                        <p>{user.is_verified}</p>
                      </div>
                      <div className='flex items-center justify-between pt-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                          onClick={() => handleActionClick(user)}
                        >
                          <Info className='h-4 w-4 text-gray-400' />
                        </Button>
                      </div>
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

        <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader className='flex flex-row items-center justify-center space-y-0 pb-4'>
              <DialogTitle className='text-lg text-center font-semibold text-black'>
                Detail of {selectedUser?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className='space-y-4'>
                <div className='flex flex-col gap-5 text-sm'>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      User Id:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.id}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      User Name:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.name}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Email Address:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.email}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Is Verified:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.is_verified
                        ? "✅ Verified"
                        : "❌ Not Verified"}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Gender:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.gender}
                    </p>
                  </div>
                  <div className='flex items-center justify-between border-b pb-5'>
                    <Label className='text-[#333338] text-xl font-medium'>
                      Payment Method:
                    </Label>
                    <p className='text-[#3e3e41] text-base font-medium'>
                      {selectedUser.is_stripe_connected
                        ? "✅ Connected"
                        : "❌ Not Connected"}
                    </p>
                  </div>
                </div>

                <div className='space-y-4 pt-4'>
                  <div className='flex items-center justify-between'>
                    <Label
                      htmlFor='delete-account'
                      className='text-[#333338] text-xl font-medium'
                    >
                      Delete User Account
                    </Label>
                    <Button
                      onClick={() => {
                        setDeleteModalOpen(true);
                        setDeleteUserId(selectedUser.id);
                      }}
                      className='bg-red-500'
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent className='sm:max-w-[400px]'>
            <DialogHeader>
              <DialogTitle className='text-red-600'>
                Delete Confirmation
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to <b>delete this item</b>? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>

              <Button variant='destructive' onClick={handleUserDelete}>
                Yes, Delete{" "}
                {isDeleting ? <Loader2 className='animate-spin' /> : ""}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
