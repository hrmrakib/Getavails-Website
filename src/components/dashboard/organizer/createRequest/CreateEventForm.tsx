"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { Button } from "@/components/ui/button";
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

import { useEffect, useState } from "react";
import {
  useCreateOfferMutation,
  useSearchUserByRoleQuery,
} from "@/redux/features/organizer/offers/offersAPI";
import { set } from "date-fns";
import Image from "next/image";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export type Event = {
  id: string;
  agent: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  amountRange: string;
  status: "pending" | "completed";
};

interface CreateEventFormProps {
  onSubmit: (event: Omit<Event, "id" | "status">) => void;
}

export default function CreateEventForm({ onSubmit }: CreateEventFormProps) {
  const [formData, setFormData] = useState({
    role: "AGENT",
    agent: "",
    artist: "",
    venue: "",
    location: "",
    date: "",
    time: "09:00",
    period: "AM",
    amountRange: "",
  });
  const [document, setDocument] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openListModal, setOpenListModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const { data } = useSearchUserByRoleQuery({
    role: formData?.role,
    search,
  });
  const [createOfferMutation] = useCreateOfferMutation();

  useEffect(() => {
    if (data?.data) {
      setAllUsers(data.data);
    }
  }, [data]);

  console.log(allUsers);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.artist.trim()) newErrors.artist = "Artist is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.amountRange.trim())
      newErrors.amountRange = "Amount Range is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateForm()) return;

    try {
      const ISODate = new Date(
        `${formData.date}T${formData.time}`
      ).toISOString();

      const formDataTo = new FormData();
      const data = {
        price: Number(formData.amountRange),
        location: formData.location,
        agent_id: selectedUser?.id,
        date: ISODate,
      };

      formDataTo.append("data", JSON.stringify(data));

      if (document) {
        formDataTo.append("document", document);
      }

      const res = await createOfferMutation(formDataTo).unwrap();

      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setTimeout(() => {
        setFormData({
          role: "",
          agent: "XYZ",
          artist: "",
          venue: "",
          location: "",
          date: "",
          time: "09:00",
          period: "AM",
          amountRange: "",
        });
        setDocument(null);
        setErrors({});
        setSelectedUser(null);
      }, 500);
    }
  };

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setOpenListModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    // image and pdf only
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(files[0].type)) {
      toast.error("Only image and pdf files are allowed");
      return;
    }

    if (files && files.length > 0) {
      setDocument(files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Select Agent */}
      <div>
        <label className='block text-sm font-semibold mb-2'>Select Agent</label>
        <button
          type='button'
          onClick={() => setOpenListModal(true)}
          className='w-full h-11 flex items-center justify-between px-4 py-3 border rounded-lg bg-card hover:bg-muted transition'
        >
          {selectedUser ? (
            <div className='flex items-center gap-3'>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedUser.avatar}`}
                alt={selectedUser.name}
                width={40}
                height={40}
                className='rounded-full border p-1'
              />
              <span className='font-medium'>{selectedUser?.name}</span>
            </div>
          ) : (
            <span className='text-muted-foreground'>
              Click to select an agent
            </span>
          )}
        </button>
      </div>

      {/* Artist */}
      {/* <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Artist
        </label>
        <input
          type='text'
          placeholder='Write here'
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            errors.artist ? "border-destructive" : "border-border"
          }`}
        />
        {errors.artist && (
          <p className='text-destructive text-sm mt-1'>{errors.artist}</p>
        )}
      </div> */}

      {/* Venue */}
      {/* <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Venue
        </label>
        <input
          type='text'
          placeholder='Write here'
          value={formData.venue}
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            errors.venue ? "border-destructive" : "border-border"
          }`}
        />
        {errors.venue && (
          <p className='text-destructive text-sm mt-1'>{errors.venue}</p>
        )}
      </div> */}

      {/* Location */}
      <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Location
        </label>
        <input
          type='text'
          placeholder='Write here'
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className={`w-full px-4 py-3 border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            errors.location ? "border-destructive" : "border-border"
          }`}
        />
        {errors.location && (
          <p className='text-destructive text-sm mt-1'>{errors.location}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Date
        </label>
        <input
          type='date'
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            errors.date ? "border-destructive" : "border-border"
          }`}
        />
        {errors.date && (
          <p className='text-destructive text-sm mt-1'>{errors.date}</p>
        )}
      </div>

      {/* Time */}
      <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Time
        </label>
        <div className='flex gap-3 items-end'>
          <div className='flex-1'>
            <input
              type='time'
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className='w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all'
            />
          </div>
          {/* <div className='flex gap-2'>
            <button
              type='button'
              onClick={() => setFormData({ ...formData, period: "AM" })}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                formData.period === "AM"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              AM
            </button>
            <button
              type='button'
              onClick={() => setFormData({ ...formData, period: "PM" })}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                formData.period === "PM"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              PM
            </button>
          </div> */}
        </div>
      </div>

      {/* Amount Range */}
      <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Amount Range
        </label>
        <input
          type='number'
          placeholder='Write here'
          value={formData.amountRange}
          onChange={(e) =>
            setFormData({ ...formData, amountRange: e.target.value })
          }
          className={`w-full px-4 py-3 border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            errors.amountRange ? "border-destructive" : "border-border"
          }`}
        />
        {errors.amountRange && (
          <p className='text-destructive text-sm mt-1'>{errors.amountRange}</p>
        )}
      </div>

      {/* Upload Documents */}
      <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Upload Documents
        </label>
        <div className='border border-dashed border-[#686262] rounded-lg'>
          <label className='w-full px-4 py-8 rounded-lg text-center cursor-pointer transition-all'>
            <input
              type='file'
              multiple
              onChange={handleFileUpload}
              className='hidden'
            />
            <div className='flex flex-col items-center gap-2'>
              <svg
                className='w-6 h-6 text-muted-foreground'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                />
              </svg>
              <span className='text-muted-foreground'>Tap to select file</span>
            </div>
          </label>
        </div>

        {/* Uploaded Files */}
        {document && (
          <div className='mt-4'>
            <div className='flex items-center justify-between p-3 bg-muted rounded-lg'>
              <div className='flex flex-col'>
                <span className='text-sm font-medium text-foreground'>
                  📄 {document.name}
                </span>
                <span className='text-xs text-muted-foreground'>
                  {(document.size / 1024).toFixed(2)} KB
                </span>
              </div>

              <button
                type='button'
                onClick={() => setDocument(null)}
                className='text-destructive hover:text-destructive/80 text-sm font-semibold'
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full px-6 py-3 bg-[#235789] text-primary-foreground font-semibold rounded-lg hover:bg-[#1a558d] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer'
      >
        {isSubmitting ? "Creating..." : "Create Now"}
      </button>

      {/* Select Options */}
      <Dialog open={openListModal} onOpenChange={setOpenListModal}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>{formData.role} Details</DialogTitle>
            <DialogDescription>
              List of {formData.role} information
            </DialogDescription>

            {allUsers?.length > 2 && (
              <Input
                type='text'
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full px-4 py-3 border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all'
              />
            )}
          </DialogHeader>

          <div className='flex flex-col gap-4 max-h-[400px] overflow-y-auto py-2'>
            {allUsers?.map((item: any) => (
              <div
                key={item.id}
                className='flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer'
                onClick={() => handleSelectUser(item)}
              >
                <Image
                  alt={item.name}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.avatar}`}
                  className='w-14 h-14 rounded-full object-cover border'
                  width={100}
                  height={100}
                />

                <div className='flex flex-col w-full'>
                  <div className='flex justify-between items-center'>
                    <p className='text-lg font-semibold'>{item.name}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded font-semibold ${
                        item.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className='text-sm text-muted-foreground'>{item.email}</p>

                  <div className='flex justify-between mt-2 text-sm font-medium'>
                    <p>📍 {item.location}</p>
                    <p>💰 {item.price}</p>
                  </div>

                  <p className='mt-1 text-sm'>
                    {item.is_verified ? (
                      <span className='text-green-600 font-semibold'>
                        ✔ Verified
                      </span>
                    ) : (
                      <span className='text-red-600 font-semibold'>
                        ✘ Not Verified
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
