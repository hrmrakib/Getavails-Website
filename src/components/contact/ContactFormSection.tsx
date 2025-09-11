"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const roles = [
  { id: "artist", label: "Artist" },
  { id: "agent", label: "Agent" },
  { id: "venue", label: "Venue" },
  { id: "buyer", label: "Buyer" },
];

export default function ContactFormSection({
  haveLeft = true,
}: {
  haveLeft?: boolean;
}) {
  const [selectedRole, setSelectedRole] = useState("artist");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", { ...formData, role: selectedRole });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setSelectedRole("artist");
    setIsSubmitting(false);
  };

  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='container mx-auto'>
        <div
          className={`${
            haveLeft
              ? "grid lg:grid-cols-2 gap-12 lg:gap-16 items-start justify-center"
              : "flex flex-col items-center justify-center"
          }`}
        >
          {/* Left side - Contact Info */}
          {haveLeft ? (
            <div className='order-2 lg:order-1 space-y-8'>
              <div>
                <h2 className='text-2xl lg:text-6xl font-bold text-[#235789] leading-tight'>
                  Have Questions?
                  <span className='text-[#2C73B8]'> Let’s Chat.</span>{" "}
                </h2>
              </div>

              <div className='lg:space-y-6'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center'>
                    <Mail className='w-6 h-6 text-[#235789]' />
                  </div>
                  <span className='text-lg text-[#235789]'>
                    support@getavails.com
                  </span>
                </div>

                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center'>
                    <Phone className='w-6 h-6 text-[#235789]' />
                  </div>
                  <span className='text-lg text-[#235789]'>
                    +1 (555) 123-4567
                  </span>
                </div>

                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center'>
                    <MapPin className='w-6 h-6 text-[#235789]' />
                  </div>
                  <span className='text-lg text-[#235789]'>
                    Remote-first / USA HQ
                  </span>
                </div>
              </div>

              <div className='flex gap-4'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer'>
                  <Linkedin className='w-6 h-6 text-[#235789]' />
                </div>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer'>
                  <Mail className='w-6 h-6 text-[#235789]' />
                </div>
              </div>
            </div>
          ) : null}

          {/* Right side - Contact Form */}
          <div
            className={`w-full order-1 lg:order-2 bg-white rounded-2xl p-8 shadow-xl border border-[#23578933] 
             ${haveLeft ? "" : "max-w-[630px] mx-auto"}
            `}
          >
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Role Selection */}
              <div>
                <label className='block text-2xl font-medium text-[#235789] mb-3'>
                  My role is:
                </label>
                <div className='flex flex-wrap gap-3'>
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type='button'
                      onClick={() => setSelectedRole(role.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedRole === role.id
                          ? "bg-[#235789] text-white"
                          : "bg-gray-100 text-[#235789] hover:bg-gray-200"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor='name'
                  className='block text-lg font-medium text-[#235789] mb-2'
                >
                  Your name
                </label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Jhon Smith'
                  required
                  className='w-full h-12'
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-lg font-medium text-[#235789] mb-2'
                >
                  Your email
                </label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='email@gmail.com'
                  required
                  className='w-full h-12'
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor='message'
                  className='block text-lg font-medium text-[#235789] mb-2'
                >
                  Your message
                </label>
                <Textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Tell us about your project...'
                  rows={9}
                  required
                  className='w-full resize-none'
                />
              </div>

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full h-12 bg-[#235789] hover:bg-[#155996] text-white py-3 text-base font-medium cursor-pointer'
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
