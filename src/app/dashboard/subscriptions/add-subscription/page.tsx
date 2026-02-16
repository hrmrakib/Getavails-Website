"use client";

import type React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, X, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateSubscriptionMutation } from "@/redux/features/admin/adminAPI";
import { toast } from "sonner";

const suggestedFeatures = [
  "Venue scheduling and booking support",
  "Organizer event creation and promotion",
  "Real-time chat between artists, agents & venues",
  "Advanced search: artists, venues, agents",
  "Secure payment and commission tracking",
  "Event analytics and performance insights",
];

export default function AddSubscriptionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    subscription_interval: "",
    isHot: true,
  });
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [createSubscriptionMutation] = useCreateSubscriptionMutation();

  const norm = (s: string) => s.trim()?.toLowerCase();
  const selectedSet = useMemo(
    () => new Set(selectedFeatures.map(norm)),
    [selectedFeatures],
  );

  const addFeature = (label: string) => {
    const clean = label.trim();
    if (!clean) return;
    if (selectedSet.has(norm(clean))) return;
    setSelectedFeatures((prev) => [...prev, clean]);
    setFeatureInput("");
  };

  const removeFeature = (label: string) => {
    setSelectedFeatures((prev) => prev.filter((f) => f !== label));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      price: formData.price === "" ? 0 : Number(formData.price),
      subscription_interval: formData.subscription_interval,
      features: selectedFeatures,
      isHot: formData.isHot,
    };

    try {
      const res = await createSubscriptionMutation(payload).unwrap();
      if (res?.success) {
        toast.success("Subscription created successfully!");
        router.push("/dashboard/subscriptions");
      }
    } catch (error) {
      toast.error("Error creating subscription");
    }
  };

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-8'>
      <div className='max-w-2xl mx-auto'>
        <Link
          href='/dashboard/subscriptions'
          className='inline-flex items-center gap-2 text-[#000000] font-medium hover:text-gray-900 mb-4'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Subscriptions
        </Link>

        <Card className='p-6 md:p-8 border-gray-200'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* NAME */}
            <div className='space-y-2'>
              <Label className='text-base font-medium'>Package Name</Label>
              <Input
                placeholder='Enter package name'
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className='h-12 bg-[#F3F3F3]'
                required
              />
            </div>

            {/* PRICE + INTERVAL */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label className='text-base font-medium'>Package Price</Label>
                <Input
                  type='number'
                  placeholder='Enter price'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className='h-12 bg-[#F3F3F3]'
                />
              </div>

              <div className='space-y-2'>
                <Label className='text-base font-medium'>
                  Billing Interval
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      subscription_interval: value,
                    }))
                  }
                >
                  <SelectTrigger className='w-full !h-12 bg-[#F3F3F3]'>
                    <SelectValue placeholder='Select interval' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='WEEKLY'>Weekly</SelectItem>
                      <SelectItem value='HALF_MONTHLY'>Half Monthly</SelectItem>
                      <SelectItem value='TWO_MONTHLY'>Two Monthly</SelectItem>
                      <SelectItem value='QUARTERLY'>Quarterly</SelectItem>
                      <SelectItem value='FOUR_MONTHLY'>Four Monthly</SelectItem>
                      <SelectItem value='HALF_YEARLY'>Half Yearly</SelectItem>
                      <SelectItem value='YEARLY'>Yearly</SelectItem>
                      <SelectItem value='TWO_YEARLY'>Two Yearly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* HOT PACKAGE */}
            <div className='space-y-2'>
              <Label className='text-base font-medium'>Is Hot Package?</Label>

              <Label className='hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950'>
                <Checkbox
                  checked={formData.isHot}
                  onCheckedChange={(v) =>
                    setFormData((prev) => ({ ...prev, isHot: Boolean(v) }))
                  }
                />
                <span className='text-sm font-medium'>
                  Yes, it&apos;s a hot package
                </span>
              </Label>
            </div>

            {/* FEATURES */}
            <div className='space-y-4'>
              <Label className='text-lg font-medium text-[#235789]'>
                Features
              </Label>

              <Card className='p-4 bg-blue-50/50 space-y-4'>
                <div className='flex items-center gap-2'>
                  <Input
                    placeholder='Type feature & press Enter'
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature(featureInput);
                      }
                    }}
                    className='flex-1 h-12'
                  />
                  <Button
                    type='button'
                    onClick={() => addFeature(featureInput)}
                    className='!h-12'
                  >
                    <Plus className='w-4 h-4 mr-1' />
                    Add
                  </Button>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {selectedFeatures.map((feat) => (
                    <span
                      key={feat}
                      className='flex items-center gap-2 border px-3 py-1 rounded-full bg-white'
                    >
                      {feat}
                      <X
                        className='w-4 h-4 cursor-pointer'
                        onClick={() => removeFeature(feat)}
                      />
                    </span>
                  ))}
                </div>

                {/* Quick add */}
                <div className='pt-2'>
                  <p className='text-xs text-gray-500 mb-2'>Quick add:</p>
                  <div className='flex flex-wrap gap-2'>
                    {suggestedFeatures
                      .filter((s) => !selectedSet.has(norm(s)))
                      .map((s) => (
                        <Button
                          key={s}
                          variant='outline'
                          className='h-8 px-3 text-xs'
                          onClick={() => addFeature(s)}
                        >
                          <Plus className='w-3 h-3 mr-1' />
                          {s}
                        </Button>
                      ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className='pt-6'>
              <Button
                type='submit'
                className='w-full h-12 bg-[#235789] text-white'
              >
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
