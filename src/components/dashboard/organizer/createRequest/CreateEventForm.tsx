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

import { useState } from "react";
import { useSearchUserByRoleQuery } from "@/redux/features/organizer/offers/offersAPI";

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
  documents?: string[];
};

interface CreateEventFormProps {
  onSubmit: (event: Omit<Event, "id" | "status">) => void;
}

export default function CreateEventForm({ onSubmit }: CreateEventFormProps) {
  const [formData, setFormData] = useState({
    role: "",
    agent: "",
    artist: "",
    venue: "",
    location: "",
    date: "",
    time: "09:00",
    period: "AM",
    amountRange: "",
    documents: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useSearchUserByRoleQuery({
    role: formData.role,
  });

  console.log(data?.data);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        agent: formData.agent,
        artist: formData.artist,
        venue: formData.venue,
        location: formData.location,
        date: formData.date,
        time: `${formData.time} ${formData.period}`,
        amountRange: formData.amountRange,
        documents: formData.documents,
      });

      // Reset form
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
        documents: [],
      });
      setErrors({});
      setIsSubmitting(false);
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((f) => f.name);
      setFormData({
        ...formData,
        documents: [...formData.documents, ...fileNames],
      });
    }
  };

  const removeDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Select Agent */}
      <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Select Agent
        </label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select a role' className='text-black' />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value='AGENT'>AGENT</SelectItem>
              <SelectItem value='USER'>USER</SelectItem>
              <SelectItem value='ORGANIZER'>ORGANIZER</SelectItem>
              <SelectItem value='VENUE'>VENUE</SelectItem>
              <SelectItem value='ARTIST'>ARTIST</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Artist */}
      <div>
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
      </div>

      {/* Venue */}
      <div>
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
      </div>

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
          <div className='flex gap-2'>
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
          </div>
        </div>
      </div>

      {/* Amount Range */}
      <div>
        <label className='block text-sm font-semibold text-foreground mb-2'>
          Amount Range
        </label>
        <input
          type='text'
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
        <label className='w-full px-4 py-8 border-2 border-dashed border-border rounded-lg bg-card text-center cursor-pointer hover:bg-muted transition-all'>
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

        {/* Uploaded Files */}
        {formData.documents.length > 0 && (
          <div className='mt-4 space-y-2'>
            {formData.documents.map((doc, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-muted rounded-lg'
              >
                <span className='text-sm text-foreground truncate'>{doc}</span>
                <button
                  type='button'
                  onClick={() => removeDocument(index)}
                  className='text-destructive hover:text-destructive/80 transition-all'
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
      >
        {isSubmitting ? "Uploading..." : "Upload Now"}
      </button>

      {/* Select Options */}
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant='outline'>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col gap-4'></div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              {/* <Button type='submit'>Save changes</Button> */}
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </form>
  );
}
