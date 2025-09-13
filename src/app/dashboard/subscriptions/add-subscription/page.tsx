/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, X, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// (Optional) suggested features to speed up entry.
// These are NOT checkboxes anymore—just quick add buttons.
const suggestedFeatures = [
  "Fully responsive web flow template",
  "Includes figma +",
  "Find matches without any limits",
  "Stay connected with unlimited chats",
  "24/7 Premium support",
  "Advanced analytics dashboard",
  "Third-party integrations",
  "Full customization options",
];

// Any defaults you want to pre-select on first render:
const defaultSelected = [
  "Fully responsive web flow template",
  "Includes figma +",
  "Find matches without any limits",
];

export default function AddSubscriptionPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    amount: "",
    period: "month",
    icon: "rocket" as "user" | "rocket" | "crown",
  });

  // Store feature labels directly
  const [selectedFeatures, setSelectedFeatures] =
    useState<string[]>(defaultSelected);

  // Input for adding a new feature
  const [featureInput, setFeatureInput] = useState("");

  const norm = (s: string) => s.trim().toLowerCase();
  const selectedSet = useMemo(
    () => new Set(selectedFeatures.map(norm)),
    [selectedFeatures]
  );

  const addFeature = (label: string) => {
    const clean = label.trim();
    if (!clean) return;
    if (selectedSet.has(norm(clean))) return; // de-dup
    setSelectedFeatures((prev) => [...prev, clean]);
    setFeatureInput("");
  };

  const removeFeature = (label: string) => {
    setSelectedFeatures((prev) => prev.filter((f) => f !== label));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSubscription = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.subtitle,
      price: formData.amount === "" ? "Free" : Number.parseInt(formData.amount),
      period: formData.amount === "" ? undefined : formData.period,
      features: selectedFeatures, // already labels
      icon: formData.icon,
      moneyBackGuarantee: formData.amount !== "",
    };

    console.log("New subscription:", newSubscription);
    router.push("/subscriptions");
  };

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='mb-8'>
          <Link
            href='/subscriptions'
            className='inline-flex items-center gap-2 text-[#000000] font-medium hover:text-gray-900 mb-4'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Subscriptions
          </Link>
        </div>

        <Card className='p-6 md:p-8 border-gray-200'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label
                htmlFor='title'
                className='text-base font-medium text-[#000000]'
              >
                Package Title
              </Label>
              <Input
                id='title'
                type='text'
                placeholder='Enter package title'
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className='w-full h-12 text-2xl bg-[#F3F3F3]'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='subtitle'
                className='text-base font-medium text-[#000000]'
              >
                Package Subtitle
              </Label>
              <Input
                id='subtitle'
                type='text'
                placeholder='Enter package subtitle'
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                className='w-full h-12 text-2xl bg-[#F3F3F3]'
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='amount'
                  className='text-base font-medium text-[#000000]'
                >
                  Package Amount
                </Label>
                <Input
                  id='amount'
                  type='number'
                  placeholder='Enter package amount (leave empty for free)'
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  className='w-full h-12 text-2xl bg-[#F3F3F3]'
                />
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='period'
                  className='text-base font-medium text-[#000000]'
                >
                  Billing Period
                </Label>
                <select
                  id='period'
                  value={formData.period}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      period: e.target.value as "month" | "year",
                    }))
                  }
                  className='w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  disabled={formData.amount === ""}
                >
                  <option value='month'>Monthly</option>
                  <option value='year'>Yearly</option>
                </select>
              </div>
            </div>

            {/* <div className='space-y-2'>
              <Label className='text-base font-medium text-[#000000]'>
                Package Icon
              </Label>
              <div className='flex gap-4'>
                {[
                  { value: "user", label: "User" },
                  { value: "rocket", label: "Rocket" },
                  { value: "crown", label: "Crown" },
                ].map((icon) => (
                  <label
                    key={icon.value}
                    className='flex items-center gap-2 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='icon'
                      value={icon.value}
                      checked={formData.icon === (icon.value as any)}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          icon: e.target.value as "user" | "rocket" | "crown",
                        }))
                      }
                      className='text-blue-600'
                    />
                    <span className='text-sm text-[#000000]'>{icon.label}</span>
                  </label>
                ))}
              </div>
            </div> */}

            {/* Dynamic Features (no checkboxes) */}
            <div className='space-y-4'>
              <Label className='text-lg font-medium text-[#235789]'>
                Features
              </Label>
              <Card className='p-4 border-blue-200 bg-blue-50/50 space-y-4'>
                {/* Input + Add button */}
                <div className='flex items-center gap-2'>
                  <Input
                    placeholder='Type a feature and press Enter or click Add'
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
                    className='h-12'
                    onClick={() => addFeature(featureInput)}
                  >
                    <Plus className='w-4 h-4 mr-1' />
                    Add
                  </Button>
                </div>

                {/* Selected feature pills */}
                {selectedFeatures.length > 0 ? (
                  <div className='flex flex-wrap gap-2'>
                    {selectedFeatures.map((feat) => (
                      <span
                        key={feat}
                        className='flex flex-wrap items-center gap-2 rounded-full border px-3 py-1 text-base bg-white'
                      >
                        {feat}
                        <button
                          type='button'
                          aria-label={`Remove ${feat}`}
                          className='hover:text-red-600'
                          onClick={() => removeFeature(feat)}
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className='text-sm text-gray-600'>
                    No features added yet.
                  </p>
                )}

                {/* Quick add suggestions */}
                <div className='pt-2'>
                  <p className='text-xs text-gray-500 mb-2'>Quick add:</p>
                  <div className='flex flex-wrap gap-2'>
                    {suggestedFeatures
                      .filter((s) => !selectedSet.has(s.trim().toLowerCase()))
                      .map((s) => (
                        <Button
                          key={s}
                          type='button'
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
                className='w-full h-12 bg-[#235789] hover:bg-[#235789] text-white px-8 py-3 cursor-pointer'
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
