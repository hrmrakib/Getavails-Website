"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, DollarSignIcon, Loader, Loader2 } from "lucide-react";
import {
  useGetSubscriptionInfoQuery,
  usePaySubscriptionMutation,
} from "@/redux/features/admin/adminAPI";
import { toast } from "sonner";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
import { useRouter } from "next/navigation";

interface SubscriptionPlan {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  features: string[];
  price: number;
  isHot: boolean;
  subscribed_user_count: number;
  subscription_interval: string;
  isOwned: boolean;
}

export function PricingSection() {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);
  const { data: subscriptions } = useGetSubscriptionInfoQuery({});
  const [paySubscriptionMutation, { isLoading: isPaying }] =
    usePaySubscriptionMutation();

  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    setHasToken(!!localStorage?.getItem("access_token"));
  }, []);

  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !hasToken,
  });

  const user = profile?.data;

  const handleSubscriptionClick = async (plan: SubscriptionPlan) => {
    if (!user) {
      router.push("/login");
      return;
    } else if (!profile?.data?.is_verified) {
      toast.error("Please verify your profile first");
      return;
    }

    try {
      const res = await paySubscriptionMutation({
        subscriptionId: plan.id,
      }).unwrap();

      console.log(res);

      if (res?.success && res?.data?.url) {
        window.open(res.data.url, "_blank"); //? Open in new tab
      }
    } catch (error) {
      toast.error("Error accepting offer");
      console.error("Error accepting offer:", error);
    }
  };

  return (
    <section className='py-16 px-4 bg-gray-50' id='upgrade-plan'>
      <div className='container mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-medium text-[#235789] mb-4 text-balance'>
            Free to Start. Powerful When You Upgrade.
          </h2>
          <p className='text-[#6B7280] text-lg max-w-[510px] mx-auto text-pretty'>
            Choose a plan that fits your role — Agent, Venue, Artist, or Buyer.
          </p>
        </div>

        {/* Toggle */}
        <div className='flex justify-center mb-12 lg:mb-20'>
          <div className='bg-[#235789B2] rounded-full p-1 shadow-sm border'>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-base font-medium transition-all ${
                !isAnnual
                  ? "bg-white text-[#170F49] font-medium shadow-sm"
                  : "text-[#FFFFFF]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-base font-medium transition-all ${
                isAnnual
                  ? "bg-white text-[#170F49] font-medium shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-3 gap-8 container mx-auto'>
          {subscriptions?.data?.map((plan: SubscriptionPlan) => {
            const currentPrice = isAnnual ? plan.price : plan.price;
            // const isMiddleCard = index === 1;

            return (
              <div
                key={plan.name}
                className={`max-w-[420px] mx-auto relative rounded-2xl p-8 ${
                  plan.isHot === true
                    ? "bg-[#235789] text-white"
                    : "bg-[#1E1E1EE5] text-white"
                } ${true ? "transform md:scale-105 md:-mt-4" : ""}`}
              >
                {/* Popular Badge */}
                {plan.isHot && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <div className='bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-gray-200'>
                      Most popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className='mb-6'>
                  <div className='w-12 h-12 bg-[#514F6E40] border-[#6F6C8F] rounded-lg flex items-center justify-center'>
                    <DollarSignIcon className='w-6 h-6' />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className='text-xl lg:text-2xl font-semibold mb-2'>
                  {plan.name}
                </h3>

                {/* Description */}
                <p className='text-white/80 mb-8 text-lg leading-relaxed'>
                  {/* {plan.description} */}
                </p>

                {/* Price */}
                <div className='mb-8'>
                  {currentPrice === 0 ? (
                    <div className='text-4xl font-bold'>Free</div>
                  ) : (
                    <div className='flex items-baseline'>
                      <span className='text-4xl font-bold'>
                        ${currentPrice}
                      </span>
                      <span className='text-white/80 ml-1'>
                        /{isAnnual ? "year" : "month"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className='mb-8'>
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className='flex items-center text-base lg:text-lg text-[#FFFFFFCC]'
                    >
                      <Check className='w-4 h-4 mr-3 flex-shrink-0' />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleSubscriptionClick(plan)}
                  className={`w-full h-[44px] font-medium text-lg ${
                    plan.isHot === true
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-[#235789] text-white hover:bg-blue-700"
                  }`}
                  size='lg'
                >
                  Try now {isPaying && <Loader2 className='animate-spin' />}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
