"use client";

import { useState } from "react";

export default function VenueForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location: "",
    email: "",
    venueType: "",
    capacity: "",
    cost: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.venueType.trim())
      newErrors.venueType = "Venue type is required";
    if (!formData.capacity.trim()) newErrors.capacity = "Capacity is required";
    if (!formData.cost.trim()) newErrors.cost = "Cost is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage("Changes saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      console.log("[v0] Form submitted with data:", formData);
    } catch (error) {
      console.error("[v0] Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-white p-4 sm:p-8 lg:p-12'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <h1 className='text-2xl sm:text-3xl font-semibold text-gray-900 mb-8'>
          Name of the venue
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
            <p className='text-green-700 text-sm'>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Venue Name Section */}

          {/* Name Section */}
          <div>
            <label
              htmlFor='name'
              className='block text-base font-medium text-gray-700 mb-3'
            >
              Name
            </label>
            <input
              id='name'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter name'
              className={`w-full px-0 py-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400 ${
                errors.name ? "border-b-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
            )}
          </div>

          {/* Address Section */}
          <div>
            <label
              htmlFor='address'
              className='block text-base font-medium text-gray-700 mb-3'
            >
              Address
            </label>
            <input
              id='address'
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Enter address'
              className={`w-full px-0 py-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400 ${
                errors.address ? "border-b-red-500" : ""
              }`}
            />
            {errors.address && (
              <p className='text-red-500 text-sm mt-1'>{errors.address}</p>
            )}
          </div>

          {/* Location Section */}
          <div>
            <label
              htmlFor='location'
              className='block text-base font-medium text-gray-700 mb-3'
            >
              Location
            </label>
            <input
              id='location'
              type='text'
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder='Enter location'
              className={`w-full px-0 py-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400 ${
                errors.location ? "border-b-red-500" : ""
              }`}
            />
            {errors.location && (
              <p className='text-red-500 text-sm mt-1'>{errors.location}</p>
            )}
          </div>

          {/* Email Section */}
          <div>
            <label
              htmlFor='email'
              className='block text-base font-medium text-gray-700 mb-3'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='name@example.com'
              className={`w-full px-0 py-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400 ${
                errors.email ? "border-b-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Venue Type Section */}
          <div>
            <label
              htmlFor='venueType'
              className='block text-base font-medium text-gray-700 mb-3'
            >
              Venue Type
            </label>
            <input
              id='venueType'
              type='text'
              name='venueType'
              value={formData.venueType}
              onChange={handleChange}
              placeholder='Enter venue type'
              className={`w-full px-0 py-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400 ${
                errors.venueType ? "border-b-red-500" : ""
              }`}
            />
            {errors.venueType && (
              <p className='text-red-500 text-sm mt-1'>{errors.venueType}</p>
            )}
          </div>

          {/* Capacity Section */}
          <div>
            <label
              htmlFor='capacity'
              className='block text-base font-medium text-gray-700 mb-3'
            >
              Capacity
            </label>
            <input
              id='capacity'
              type='text'
              name='capacity'
              value={formData.capacity}
              onChange={handleChange}
              placeholder='Enter capacity'
              className={`w-full px-0 py-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400 ${
                errors.capacity ? "border-b-red-500" : ""
              }`}
            />
            {errors.capacity && (
              <p className='text-red-500 text-sm mt-1'>{errors.capacity}</p>
            )}
          </div>

          {/* Cost Section */}
          <div>
            <label
              htmlFor='cost'
              className='block text-base font-medium text-gray-700 mb-3'
            >
              Cost
            </label>
            <input
              id='cost'
              type='text'
              name='cost'
              value={formData.cost}
              onChange={handleChange}
              placeholder='$525 per month'
              className={`w-full px-0 py-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors bg-transparent text-gray-900 placeholder-gray-400 ${
                errors.cost ? "border-b-red-500" : ""
              }`}
            />
            {errors.cost && (
              <p className='text-red-500 text-sm mt-1'>{errors.cost}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full mt-10 bg-[#235789] hover:bg-[#124b81] disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
