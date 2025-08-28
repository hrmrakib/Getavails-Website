"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

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

    // Simulate sign up process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Sign up attempt:", { fullName, email, password });
    setIsLoading(false);
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
    // Implement Google OAuth here
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
    <div className='space-y-6'>
      {/* Logo */}
      <div className='flex justify-center mb-8'>
        <div className='w-12 h-12 bg-black flex items-center justify-center'>
          <div className='w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-white' />
        </div>
      </div>

      {/* Header */}
      <div className='text-center space-y-2'>
        <h1 className='text-2xl font-bold text-foreground'>
          Start Your Journey With GetAvails
        </h1>
        <p className='text-muted-foreground text-sm'>
          From first contact to final curtain, manage it all in one place.
        </p>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Full Name / Business Name Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='fullName'
            className='text-sm font-medium text-muted-foreground'
          >
            Full Name / Business Name
          </Label>
          <Input
            id='fullName'
            type='text'
            placeholder='Enter Full Name / Business Name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className='h-12'
          />
        </div>

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
        <div className='space-y-2'>
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
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              required
              className={`h-12 pr-10 ${passwordError ? "border-red-500" : ""}`}
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
          className='w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium'
          disabled={isLoading || !!passwordError}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        {/* Google Sign Up */}
        <Button
          type='button'
          variant='outline'
          className='w-full h-12 bg-black text-white hover:bg-gray-800 border-black'
          onClick={handleGoogleSignUp}
        >
          <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='currentColor'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='currentColor'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='currentColor'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          Or Sign-up with Google
        </Button>

        {/* Sign In Link */}
        <div className='text-center'>
          <span className='text-sm text-muted-foreground'>
            Already have an account?{" "}
            <Button
              type='button'
              variant='link'
              className='text-sm text-blue-600 hover:text-blue-700 p-0 h-auto font-medium'
            >
              Sign In
            </Button>
          </span>
        </div>
      </form>
    </div>
  );
}
