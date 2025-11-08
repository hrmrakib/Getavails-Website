"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignUpFormForAgent() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6);

    if (digits.length > 0) {
      const newOtp = ["", "", "", "", "", ""];
      digits.forEach((digit, index) => {
        newOtp[index] = digit;
      });
      setOtp(newOtp);

      if (digits.length === 6) {
        inputRefs.current[5]?.focus();
      } else {
        inputRefs.current[digits.length]?.focus();
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call - replace with actual verification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation - OTP must be 6 matching digits for demo
      if (otpCode === "123456") {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError("Verification failed. Please try again." + err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setTimeLeft(60);
    setCanResend(false);
    setError("");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();

    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("OTP resent successfully");
    } catch (err) {
      setError("Failed to resend OTP. Please try again." + err);
    }
  };

  if (success) {
    return (
      <div className='flex flex-col items-center justify-center space-y-4 py-12 px-4'>
        <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse'>
          <CheckCircle className='w-8 h-8 text-primary' />
        </div>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl font-bold text-foreground'>Verified!</h2>
          <p className='text-muted-foreground'>
            Your account has been verified successfully.
          </p>
        </div>
      </div>
    );
  }

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
                Verify Your Account
              </h1>
              <p className='text-muted-foreground text-sm'>
                Please enter the 6-digit verification code we sent to your
                registered to process securely.
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleVerify} className='space-y-4'>
              {/* OTP Input Fields */}
              <div className='space-y-3'>
                <label className='sr-only'>OTP Code</label>
                <div className='flex gap-2 sm:gap-5 justify-center'>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type='text'
                      inputMode='numeric'
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      disabled={isLoading}
                      className='w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border-2 border-[#B1B1B1] bg-background text-foreground placeholder-muted-foreground transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed'
                      aria-label={`OTP digit ${index + 1}`}
                    />
                  ))}
                </div>
                <p className='text-xs text-[#0ca867] text-center'>
                  Paste your code or type each digit
                </p>
              </div>

              {/* Create Account Button */}
              <Button
                type='submit'
                className='w-full h-12 bg-[#235789] hover:bg-[#1b68af] text-white font-medium'
                disabled={isLoading || !!passwordError}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>

              {/* Resend Section */}
              <div className='border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm'>
                <span className='text-muted-foreground'>
                  Didn&apos;t receive the code?
                </span>
                <button
                  onClick={handleResend}
                  disabled={!canResend || isLoading}
                  className='flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors disabled:text-muted-foreground disabled:cursor-not-allowed'
                >
                  <RotateCw className='w-4 h-4' />
                  {canResend ? "Resend OTP" : `Resend in ${timeLeft}s`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
