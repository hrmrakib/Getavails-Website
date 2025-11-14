"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FormData {
  organizerName: string;
  email: string;
  address: string;
  venue: string;
  artist: string;
  date: string;
  time: string;
  amount: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    organizerName: "Jony",
    email: "name@gmail.com",
    address: "UK",
    venue: "dfgfdg",
    artist: "dfgggg",
    date: "10-10-2025",
    time: "10 AM to 10 PM",
    amount: "$96.20",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.organizerName.trim()) {
      newErrors.organizerName = "Organizer name is required";
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required";
    }
    if (!formData.artist.trim()) {
      newErrors.artist = "Artist name is required";
    }
    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    }
    if (!formData.time.trim()) {
      newErrors.time = "Time is required";
    }
    if (
      !formData.amount.trim() ||
      isNaN(parseFloat(formData.amount.replace("$", "")))
    ) {
      newErrors.amount = "Valid amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);
      alert("Event created successfully!");

      // Reset form
      setFormData({
        organizerName: "",
        email: "",
        address: "",
        venue: "",
        artist: "",
        date: "",
        time: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error creating event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='min-h-screen bg-background'>
      <h1 className='text-2xl sm:text-3xl font-bold text-[#222222] p-5 mb-5'>
        Create
      </h1>
      <div className='flex items-center justify-center min-h-sreen'>
        <div className='w-full max-w-2xl'>
          {/* Header */}
          <div className='mb-8 sm:mb-12'>
            <div className='text-center mb-8 sm:mb-12'>
              <h2 className='text-3xl sm:text-4xl font-bold text-[#222222]'>
                Details
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6 sm:space-y-8'>
              {/* Organizer Name */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8'>
                <label
                  htmlFor='organizerName'
                  className='text-base sm:text-lg font-medium text-[#222222] min-w-fit'
                >
                  Organizer Name
                </label>
                <div className='flex-1 w-full'>
                  <input
                    type='text'
                    id='organizerName'
                    name='organizerName'
                    value={formData.organizerName}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent text-right placeholder-[#22222299] focus:outline-none transition-colors ${
                      errors.organizerName
                        ? "border-b-red-500 focus:border-b-red-600"
                        : "border-b-gray-200 focus:border-b-blue-600"
                    }`}
                  />
                  {errors.organizerName && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.organizerName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8'>
                <label
                  htmlFor='email'
                  className='text-base sm:text-lg font-medium text-[#222222] min-w-fit'
                >
                  Email :
                </label>
                <div className='flex-1 w-full'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent text-right placeholder-[#22222299] focus:outline-none transition-colors ${
                      errors.email
                        ? "border-b-red-500 focus:border-b-red-600"
                        : "border-b-gray-200 focus:border-b-blue-600"
                    }`}
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8'>
                <label
                  htmlFor='address'
                  className='text-base sm:text-lg font-medium text-[#222222] min-w-fit'
                >
                  Address :
                </label>
                <div className='flex-1 w-full'>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent text-right placeholder-[#22222299] focus:outline-none transition-colors ${
                      errors.address
                        ? "border-b-red-500 focus:border-b-red-600"
                        : "border-b-gray-200 focus:border-b-blue-600"
                    }`}
                  />
                  {errors.address && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Venue */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8'>
                <label
                  htmlFor='venue'
                  className='text-base sm:text-lg font-medium text-[#222222] min-w-fit'
                >
                  Venue
                </label>
                <div className='flex-1 w-full'>
                  <input
                    type='text'
                    id='venue'
                    name='venue'
                    value={formData.venue}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent text-right placeholder-[#22222299] focus:outline-none transition-colors ${
                      errors.venue
                        ? "border-b-red-500 focus:border-b-red-600"
                        : "border-b-gray-200 focus:border-b-blue-600"
                    }`}
                  />
                  {errors.venue && (
                    <p className='text-red-500 text-sm mt-1'>{errors.venue}</p>
                  )}
                </div>
              </div>

              {/* Artist */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8'>
                <label
                  htmlFor='artist'
                  className='text-base sm:text-lg font-medium text-[#222222] min-w-fit'
                >
                  Artist
                </label>
                <div className='flex-1 w-full'>
                  <input
                    type='text'
                    id='artist'
                    name='artist'
                    value={formData.artist}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent text-right placeholder-[#22222299] focus:outline-none transition-colors ${
                      errors.artist
                        ? "border-b-red-500 focus:border-b-red-600"
                        : "border-b-gray-200 focus:border-b-blue-600"
                    }`}
                  />
                  {errors.artist && (
                    <p className='text-red-500 text-sm mt-1'>{errors.artist}</p>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8'>
                <label
                  htmlFor='date'
                  className='text-base sm:text-lg font-medium text-[#222222] min-w-fit'
                >
                  Date
                </label>
                <div className='flex-1 w-full'>
                  <input
                    type='text'
                    id='date'
                    name='date'
                    placeholder='DD-MM-YYYY'
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent text-right placeholder-[#22222299] focus:outline-none transition-colors ${
                      errors.date
                        ? "border-b-red-500 focus:border-b-red-600"
                        : "border-b-gray-200 focus:border-b-blue-600"
                    }`}
                  />
                  {errors.date && (
                    <p className='text-red-500 text-sm mt-1'>{errors.date}</p>
                  )}
                </div>
              </div>

              {/* Time */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8'>
                <label
                  htmlFor='time'
                  className='text-base sm:text-lg font-medium text-[#222222] min-w-fit'
                >
                  Time
                </label>
                <div className='flex-1 w-full'>
                  <input
                    type='text'
                    id='time'
                    name='time'
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent text-right placeholder-[#22222299] focus:outline-none transition-colors ${
                      errors.time
                        ? "border-b-red-500 focus:border-b-red-600"
                        : "border-b-gray-200 focus:border-b-blue-600"
                    }`}
                  />
                  {errors.time && (
                    <p className='text-red-500 text-sm mt-1'>{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8'>
                <label
                  htmlFor='amount'
                  className='text-base sm:text-lg font-medium text-[#222222] min-w-fit'
                >
                  Amount
                </label>
                <div className='flex-1 w-full'>
                  <input
                    type='text'
                    id='amount'
                    name='amount'
                    value={formData.amount}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent text-right placeholder-[#22222299] focus:outline-none transition-colors ${
                      errors.amount
                        ? "border-b-red-500 focus:border-b-red-600"
                        : "border-b-gray-200 focus:border-b-blue-600"
                    }`}
                  />
                  {errors.amount && (
                    <p className='text-red-500 text-sm mt-1'>{errors.amount}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-4 sm:pt-6'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full h-12 py-3 sm:py-4 bg-[#235789] hover:bg-[#12508a] text-white font-semibold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? "Sending..." : "Send Now"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
