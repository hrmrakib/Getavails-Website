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

export function ContactSection() {
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
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-start'>
          {/* Left side - Contact Info */}
          <div className='space-y-8'>
            <div>
              <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                Let&apos;s talk <br className='hidden sm:block' />
                on something <span className='text-blue-600'>great</span>{" "}
                <br className='hidden sm:block' />
                together
              </h2>
            </div>

            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Mail className='w-6 h-6 text-blue-600' />
                </div>
                <span className='text-lg text-gray-700'>
                  support@getavails.com
                </span>
              </div>

              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Phone className='w-6 h-6 text-blue-600' />
                </div>
                <span className='text-lg text-gray-700'>+1 (555) 123-4567</span>
              </div>

              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <MapPin className='w-6 h-6 text-blue-600' />
                </div>
                <span className='text-lg text-gray-700'>
                  Remote-first / USA HQ
                </span>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer'>
                <Linkedin className='w-6 h-6 text-blue-600' />
              </div>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer'>
                <Mail className='w-6 h-6 text-blue-600' />
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Role Selection */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>
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
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                  className='block text-sm font-medium text-gray-700 mb-2'
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
                  className='w-full'
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
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
                  className='w-full'
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Your message
                </label>
                <Textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Tell us about your project...'
                  rows={4}
                  required
                  className='w-full resize-none'
                />
              </div>

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium'
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
