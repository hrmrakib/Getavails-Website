"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authAPI";
import { toast } from "sonner";

export default function SignUpFormForAgent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [resetPasswordMutation] = useResetPasswordMutation();
  const router = useRouter();

  const validatePasswords = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await resetPasswordMutation({ password }).unwrap();

      if (res?.success) {
        toast.success("Password reset successfully.");
        router.push(`/login`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (confirmPassword) {
      setPasswordError(
        value !== confirmPassword ? "Passwords do not match" : ""
      );
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordError(password !== value ? "Passwords do not match" : "");
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
                Create New Password
              </h1>
              <p className='text-muted-foreground text-sm'>
                Your password must be 8-10 character long.
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Password Field */}
              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-sm font-medium text-muted-foreground'
                >
                  Password
                </Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    className='h-12 pr-10'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 text-muted-foreground' />
                    ) : (
                      <Eye className='h-4 w-4 text-muted-foreground' />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className='space-y-2.5'>
                <Label
                  htmlFor='confirmPassword'
                  className='text-sm font-medium text-muted-foreground'
                >
                  Confirm Password
                </Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm Your Password'
                    value={confirmPassword}
                    onChange={(e) =>
                      handleConfirmPasswordChange(e.target.value)
                    }
                    required
                    className={`h-12 pr-10 ${
                      passwordError ? "border-red-500" : ""
                    }`}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4 text-muted-foreground' />
                    ) : (
                      <Eye className='h-4 w-4 text-muted-foreground' />
                    )}
                  </Button>
                </div>
                {passwordError && (
                  <p className='text-sm text-red-500'>{passwordError}</p>
                )}
              </div>

              {/* Create Account Button */}
              <Button
                type='submit'
                className='w-full h-12 bg-[#235789] hover:bg-[#1b68af] text-white font-medium'
                disabled={isLoading || !!passwordError}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
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
