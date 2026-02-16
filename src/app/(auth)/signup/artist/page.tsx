"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useArtistRegisterMutation } from "@/redux/features/auth/authAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

const libraries: any = ["places"];

export default function SignUpFormForArtist() {
  // Add new state variables
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [artistCategory, setArtistCategory] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [artistRegisterMutation] = useArtistRegisterMutation();
  const router = useRouter();
  // Google Autocomplete Ref
  const locationRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_AUTO_SUGGESTION || "",
    libraries,
  });

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

    const data = {
      name: artistName,
      email: email,
      password: password,
      genre: artistCategory,
      location: location,
      location_lat: lat,
      location_lng: lng,
      price: price,
    };

    try {
      const res = await artistRegisterMutation(data).unwrap();

      if (res?.success) {
        toast.success("Verification OTP sent successfully.");
        router.push(`/verify-otp?email=${email}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (confirmPassword) {
      setPasswordError(
        value !== confirmPassword ? "Passwords do not match" : "",
      );
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordError(password !== value ? "Passwords do not match" : "");
  };

  const onPlaceChanged = () => {
    if (locationRef.current) {
      const place = locationRef.current.getPlace();
      setLocation(place.formatted_address || "");

      if (place.geometry && place.geometry.location) {
        setLat(place.geometry.location.lat());
        setLng(place.geometry.location.lng());
      }
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

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
                Start Your Journey as an Artist.
              </h1>
              <p className='text-muted-foreground text-sm'>
                Join as an agent and simplify artist management with our
                all-in-one booking system.
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Artist Name / Brand Name Field */}
              <div className='space-y-2'>
                <Label
                  htmlFor='artistName'
                  className='text-sm font-medium text-muted-foreground'
                >
                  Artist / Brand Name
                </Label>
                <Input
                  id='artistName'
                  type='text'
                  placeholder='Enter your artist / brand name'
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
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

              {/* Category of Artist Field */}
              <div className='space-y-2'>
                <Label
                  htmlFor='artistCategory'
                  className='text-sm font-medium text-muted-foreground'
                >
                  Category of Artist
                </Label>
                <Input
                  id='artistCategory'
                  type='text'
                  placeholder='Enter type of your venue'
                  value={artistCategory}
                  onChange={(e) => setArtistCategory(e.target.value)}
                  required
                  className='h-12'
                />
              </div>

              {/* Venue Capacity Field */}
              <div className='space-y-2'>
                <Label
                  htmlFor='price'
                  className='text-sm font-medium text-muted-foreground'
                >
                  Price
                </Label>
                <Input
                  id='price'
                  type='number'
                  placeholder='Enter your price rang per event'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className='h-12'
                />
              </div>

              {/* Location / Address Field */}
              <Autocomplete
                onLoad={(autocomplete) => (locationRef.current = autocomplete)}
                onPlaceChanged={onPlaceChanged}
              >
                <div className='space-y-2'>
                  <Label
                    htmlFor='location'
                    className='text-sm font-medium text-muted-foreground'
                  >
                    Location / Address
                  </Label>
                  <Input
                    id='location'
                    type='text'
                    placeholder='Enter Your Location / Address'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className='h-12'
                  />
                </div>
              </Autocomplete>

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
                {isLoading ? "Creating Account..." : "Create Account"}
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
