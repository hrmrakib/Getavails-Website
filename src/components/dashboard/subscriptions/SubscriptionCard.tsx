"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Rocket, Crown, Check, Shield } from "lucide-react";

export interface Subscription {
  id: string;
  title: string;
  description: string;
  price: number | "Free";
  period?: string;
  features: string[];
  icon: "user" | "rocket" | "crown";
  badge?: string;
  moneyBackGuarantee?: boolean;
}

interface SubscriptionCardProps {
  subscription: Subscription;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const iconMap = {
  user: User,
  rocket: Rocket,
  crown: Crown,
};

export function SubscriptionCard({
  subscription,
  onDelete,
  onEdit,
}: SubscriptionCardProps) {
  const IconComponent = iconMap[subscription.icon];

  return (
    <Card className='relative overflow-hidden bg-[#235789] text-white border-0 p-6 h-full flex flex-col'>
      {subscription.badge && (
        <Badge
          variant='secondary'
          className='absolute top-4 right-4 bg-blue-500/30 text-white border-blue-400/50 hover:bg-blue-500/40'
        >
          {subscription.badge}
        </Badge>
      )}

      <div className='flex items-center gap-3 mb-4'>
        <div className='p-2 bg-white/10 rounded-lg'>
          <IconComponent className='w-6 h-6' />
        </div>
        <div>
          <h3 className='text-xl font-semibold'>{subscription.title}</h3>
        </div>
      </div>

      <p className='text-blue-100 text-sm mb-6 leading-relaxed'>
        {subscription.description}
      </p>

      <div className='mb-6'>
        {subscription.price === "Free" ? (
          <div className='text-4xl font-bold'>Free</div>
        ) : (
          <div className='flex items-baseline gap-1'>
            <span className='text-4xl font-bold'>${subscription.price}</span>
            {subscription.period && (
              <span className='text-blue-200 text-sm'>
                /{subscription.period}
              </span>
            )}
          </div>
        )}
      </div>

      <div className='flex-1 space-y-3 mb-6'>
        {subscription.features.map((feature, index) => (
          <div key={index} className='flex items-center gap-3'>
            <div className='p-1 bg-white/10 rounded-full'>
              <Check className='w-3 h-3' />
            </div>
            <span className='text-sm text-blue-100'>{feature}</span>
          </div>
        ))}
      </div>

      {subscription.moneyBackGuarantee && (
        <div className='flex items-center gap-2 mb-4 text-blue-200'>
          <Shield className='w-4 h-4' />
          <span className='text-sm'>30-day money back guarantee</span>
        </div>
      )}

      <div className='space-y-6'>
        <Button
          variant='secondary'
          className='w-full bg-gradient-to-t from-[#235789CC] to-[#2C73B899] hover:bg-blue-500/30 text-white border border-[#aac1d6] shadow-2xl cursor-pointer'
          onClick={() => onEdit(subscription.id)}
        >
          Edit Plan
        </Button>
        <Button
          variant='outline'
          className='w-full bg-gradient-to-t from-[#235789CC] to-[#2C73B899] hover:bg-blue-500/30 text-red-300 hover:text-red-300 border-2 !border-red-400/50 shadow-2xl cursor-pointer'
          onClick={() => onDelete(subscription.id)}
        >
          Delete Plan
        </Button>
      </div>
    </Card>
  );
}
