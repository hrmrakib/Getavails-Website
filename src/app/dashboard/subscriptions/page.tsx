"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  useDeleteSubscriptionMutation,
  useGetSubscriptionInfoQuery,
} from "@/redux/features/admin/adminAPI";
import { toast } from "sonner";

export interface ISubscriptionPlan {
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

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSubscriptionId, setDeleteSubscriptionId] = useState("");

  const { data: subscriptionsResponse, refetch } = useGetSubscriptionInfoQuery({
    page,
    limit,
    search: searchTerm,
  });
  const [deleteSubscriptionMutation, { isLoading: isDeleting }] =
    useDeleteSubscriptionMutation();

  const subscriptions = subscriptionsResponse?.data || [];

  const handleDelete = (id: string) => {
    setDeleteModalOpen(true);
    setDeleteSubscriptionId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteSubscriptionMutation({
        subscription_id: deleteSubscriptionId,
      }).unwrap();

      if (res?.success) {
        toast.success("Subscription deleted successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Error deleting subscription");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {subscriptions.map((subscription: ISubscriptionPlan) => (
            <Card
              key={subscription.id}
              className='relative overflow-hidden bg-[#235789] text-white border-0 p-6 h-full flex flex-col'
            >
              {subscription.isHot && (
                <Badge
                  variant='secondary'
                  className='absolute top-4 right-4 bg-blue-500/30 text-white border-blue-400/50 hover:bg-blue-500/40'
                >
                  <p className='text-lg'>
                    {subscription.isHot ? "🏅 Hot" : "💩"}
                  </p>
                </Badge>
              )}

              <div className='flex items-center gap-3'>
                <div className='p-2 bg-white/10 rounded-lg'> 🛄 </div>
              </div>

              <h3 className='text-xl font-semibold'>{subscription.name}</h3>

              <div className='mb-6'>
                <div className='flex items-baseline gap-1'>
                  <span className='text-4xl font-bold'>
                    ${subscription.price}
                  </span>
                  {subscription.subscription_interval && (
                    <span className='text-blue-200 text-sm'>
                      /{subscription.subscription_interval}
                    </span>
                  )}
                </div>
              </div>

              <div className='flex-1 space-y-3 mb-6'>
                {subscription.features.map((feature, index: number) => (
                  <div key={index} className='flex items-center gap-3'>
                    <div className='p-1 bg-white/10 rounded-full'>
                      <Check className='w-3 h-3' />
                    </div>
                    <span className='text-sm text-blue-100'>{feature}</span>
                  </div>
                ))}
              </div>

              <div className='flex flex-col items-end justify-end'>
                <p>Created: {subscription.created_at.split("T")[0]}</p>
                <p>Updated: {subscription.updated_at.split("T")[0]}</p>
              </div>

              <div className='space-y-6'>
                <Link
                  href={`/dashboard/subscriptions/edit-subscription/${subscription?.id}`}
                >
                  <Button
                    variant='secondary'
                    className='w-full bg-gradient-to-t from-[#235789CC] to-[#2C73B899] hover:bg-blue-500/30 text-white border border-[#aac1d6] shadow-2xl cursor-pointer'
                  >
                    Edit Plan
                  </Button>
                </Link>

                <Button
                  variant='outline'
                  className='w-full bg-gradient-to-t from-[#235789CC] to-[#2C73B899] hover:bg-blue-500/30 text-red-300 border-2 !border-red-400/50 shadow-2xl cursor-pointer mt-6'
                  onClick={() => handleDelete(subscription.id)}
                >
                  Delete Plan
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className='text-center'>
          <Link href='/dashboard/subscriptions/add-subscription'>
            <Button
              size='lg'
              className='bg-[#235789] hover:bg-[#2379c9] text-white px-8 py-3 rounded-full'
            >
              <Plus className='w-7 h-7 mr-2 text-white border-2 border-white rounded-full' />
              Add New Subscription
            </Button>
          </Link>
        </div>
      </div>

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogTrigger asChild>
          <Button variant='destructive'>Delete</Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='text-red-600 text-center text-lg'>
              Are you sure?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              item.
            </DialogDescription>
          </DialogHeader>

          <div className='py-4'>
            <p className='text-sm text-gray-600'>
              Do you really want to delete this? This will remove the data
              permanently.
            </p>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>

            <Button
              variant='destructive'
              onClick={() => {
                handleConfirmDelete();
              }}
            >
              Yes, Delete{" "}
              {isDeleting ? <Loader2 className='animate-spin' /> : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
