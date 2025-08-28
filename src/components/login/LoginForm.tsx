"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Login attempt:", { email, password, rememberMe });
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement Google OAuth here
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
        <h1 className='text-2xl font-bold text-foreground'>Welcome Back!</h1>
        <p className='text-muted-foreground text-sm'>
          Log in to connect, book, and manage with ease.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Email/Username Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='email'
            className='text-sm font-medium text-muted-foreground'
          >
            Email / Username
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='Enter Email / Username'
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
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Remember Me & Forgot Password */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='remember'
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor='remember' className='text-sm text-muted-foreground'>
              Remember me
            </Label>
          </div>
          <Button
            type='button'
            variant='link'
            className='text-sm text-blue-600 hover:text-blue-700 p-0 h-auto'
          >
            Forgot password?
          </Button>
        </div>

        {/* Login Button */}
        <Button
          type='submit'
          className='w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium'
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        {/* Google Login */}
        <Button
          type='button'
          variant='outline'
          className='w-full h-12 bg-black text-white hover:bg-gray-800 border-black'
          onClick={handleGoogleLogin}
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
          Or Login with Google
        </Button>

        {/* Sign Up Link */}
        <div className='text-center'>
          <span className='text-sm text-muted-foreground'>
            Don&apos;t have an account?{" "}
            <Button
              type='button'
              variant='link'
              className='text-sm text-blue-600 hover:text-blue-700 p-0 h-auto font-medium'
            >
              Sign up now
            </Button>
          </span>
        </div>
      </form>
    </div>
  );
}
