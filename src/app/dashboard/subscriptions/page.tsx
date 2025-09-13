"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  SubscriptionCard,
  type Subscription,
} from "@/components/dashboard/subscriptions/SubscriptionCard";

const initialSubscriptions: Subscription[] = [
  {
    id: "1",
    title: "Personal",
    description:
      "For individuals who want to launch a simple portfolio or landing page.",
    price: "Free",
    features: [
      "Fully responsive Webflow template",
      "Fully responsive Webflow template",
      "Fully responsive Webflow template",
      "Fully responsive Webflow template",
    ],
    icon: "user",
  },
  {
    id: "2",
    title: "Starter",
    description:
      "For teams who want to build stylish websites fast with Webflow.",
    price: 299,
    period: "month",
    features: [
      "Includes Figma + Webflow files",
      "Includes Figma + Webflow files",
      "Includes Figma + Webflow files",
      "Includes Figma + Webflow files",
    ],
    icon: "rocket",
    badge: "Save 65%",
    moneyBackGuarantee: true,
  },
  {
    id: "3",
    title: "Premium",
    description:
      "For companies who need advanced features and top-tier support.",
    price: 699,
    period: "month",
    features: [
      "Access to all template collections",
      "Access to all template collections",
      "Access to all template collections",
      "Access to all template collections",
    ],
    icon: "crown",
    badge: "Save 75%",
    moneyBackGuarantee: true,
  },
];

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(initialSubscriptions);

  const handleDelete = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  const handleEdit = (id: string) => {
    // Navigate to edit page - will be implemented
    console.log("Edit subscription:", id);
  };

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>

        <div className='text-center'>
          <Link href='/dashboard/subscriptions/add-subscription'>
            <Button
              size='lg'
              className='bg-[#235789] hover:bg-[#2379c9] text-white px-8 py-3 rounded-full cursor-pointer'
            >
              <Plus className='w-7 h-7 mr-2 text-white border-2 border-white rounded-full' />
              Add New Subscription
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
