"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function SignUpFormForAgent() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulate sign up process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Sign up attempt:", { email });
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left side - Concert image (hidden on mobile) */}
      <div className='hidden lg:flex lg:w-[70%] relative'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: "url('/login.png')",
          }}
        />
        <div className='absolute inset-0 bg-[#00000063]' />
      </div>

      <div className='w-full lg:w-[30%] flex items-center justify-center p-6'>
        <div className='w-full max-w-md'>
          <div className='space-y-6'>
            {/* Logo */}
            <Link href='/' className='flex mb-8'>
              <div className='flex items-center justify-center'>
                <Image
                  src='/logo.png'
                  alt='Logo'
                  width={260}
                  height={260}
                  className='w-16 h-16'
                />
              </div>
            </Link>

            {/* Header */}
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold text-foreground'>
                Forget Password
              </h1>
              <p className='text-muted-foreground text-sm'>
                Please enter your email address to reset your account password.
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Email Address Field */}
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-sm font-medium text-muted-foreground'
                >
                  Email Address
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='h-12'
                />
              </div>

              {/* Create Account Button */}
              <Button
                type='submit'
                className='w-full h-12 bg-[#235789] hover:bg-[#1b68af] text-white font-medium'
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>

              {/* Sign In Link */}
              <div className='text-center'>
                <span className='text-sm text-muted-foreground'>
                  Already have an account?{" "}
                  <Link
                    href='/login'
                    className='text-sm text-blue-600 hover:text-blue-700 p-0 h-auto font-medium'
                  >
                    Sign In
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
