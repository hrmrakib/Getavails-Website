"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "@/redux/features/auth/authAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveTokens } from "@/service/authService";
import { useDispatch } from "react-redux";
import { userTrack } from "@/redux/features/auth/authSlice";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMutation] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleLogin = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
            }),
          }
        ).then((res) => res.json());

        if (res.success) {
          await saveTokens(res?.data?.access_token);
          localStorage.setItem("access_token", res?.data?.access_token);
          toast.success("Google login successful!");
          router.push("/");
        }
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    },
    onError: () => {},
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        await saveTokens(data?.data?.access_token);
        localStorage?.setItem("access_token", data?.data?.access_token);

        dispatch(userTrack());

        if (rememberMe) {
          localStorage?.setItem("email", email);
          localStorage?.setItem("password", password);
        } else {
          localStorage?.removeItem("email");
          localStorage?.removeItem("password");
        }
        router.push("/");
      }

      if (!data?.success) {
        throw new Error(data?.message);
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }

      // Decode the JWT to get user info
      const GoogleJwtPayload = credentialResponse;

      // Send to backend
      const response = await googleLogin({
        id_token: credentialResponse.credential,
        user: GoogleJwtPayload,
      }).unwrap();

      if (response.success) {
        await saveTokens(response?.data?.access);
        localStorage.setItem("accessToken", response?.data?.access);
        toast.success("Google login successful!");
        router.push("/");
        window.location.href = "/";
      } else {
        toast.error(response.message || "Google login failed");
      }
    } catch (error: unknown) {
      toast.error(
        error &&
          typeof error === "object" &&
          "data" in error &&
          typeof error.data === "object" &&
          error.data &&
          "message" in error.data
          ? (error.data as { message: string }).message
          : error instanceof Error
          ? error.message
          : "Google login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_API_KEY_CLIENT_ID || ""}
    >
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
              <Label
                htmlFor='remember'
                className='text-sm text-muted-foreground'
              >
                Remember me
              </Label>
            </div>
            <Link
              href='/forgot-password'
              className='text-sm text-[#235789] hover:text-blue-700 p-0 h-auto'
            >
              Forgot password?
            </Link>
          </div>
          {/* Login Button */}
          <Button
            type='submit'
            className='w-full h-12 bg-[#235789] hover:bg-[#1d68af] text-white font-medium'
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {/* Google Login */}
          {/* <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            // shape="pill"
            theme='outline'
            size='large'
            text='signin'
            width='100%'
          /> */}

          {/* ===== Custom Google Login (Professional) ===== */}
          <div className='relative w-full h-12 mt-6'>
            {/* Your custom UI */}
            <button
              type='button'
              onClick={() => handleGoogleLogin()}
              className='w-full h-12 flex items-center justify-center gap-3 bg-[#1E1E1E] hover:bg-black text-white font-medium rounded-lg transition'
            >
              <Image
                src='/google.png'
                alt='Google'
                width={20}
                height={20}
                className='bg-transparent rounded-full p-0.5'
              />
              Continue with Google
            </button>
          </div>

          {/* <Button
            type='button'
            variant='outline'
            className='w-full h-12 bg-[#1E1E1E] text-white border-black'
            onClick={handleGoogleLogin}
          >
            <Image
              src='/google.png'
              alt='Google Logo'
              width={20}
              height={20}
              className='mr-2'
            />
            Login with Google
          </Button> */}

          {/* Sign Up Link */}
          <div className='text-center'>
            <span className='text-sm text-muted-foreground'>
              Don&apos;t have an account?{" "}
              <Link
                href='/signup'
                className='text-sm text-blue-600 hover:text-blue-700 p-0 h-auto font-medium'
              >
                Sign up now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}
