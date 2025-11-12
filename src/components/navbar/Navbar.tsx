"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
import { Skeleton } from "../ui/skeleton";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: profile, isLoading, refetch } = useGetProfileQuery("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    refetch();
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Solutions", href: "/solutions" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  if (
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password" ||
    pathname.split("/")[1] === "dashboard" ||
    pathname === "/signup/agent" ||
    pathname === "/signup/artist" ||
    pathname === "/signup/venue" ||
    pathname === "/signup/buyer" ||
    pathname === "/signup/organizer"
  ) {
    return null;
  }

  return (
    <>
      <nav className='sticky top-0 z-50 w-full bg-[#FFFFFF] backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-16 lg:h-24 flex justify-between items-center'>
            {/* Logo */}
            <Link href='/' className='flex items-center space-x-2'>
              <Image src='/logo.png' alt='Logo' width={56} height={56} />
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-8'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='text-[#6B7280] hover:text-gray-900 transition-colors duration-200 font-medium'
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className='hidden md:flex items-center space-x-4'>
              {isLoading ? (
                <div className='flex items-center gap-6'>
                  <Skeleton className='w-10 h-10 rounded-full bg-gray-300' />
                  <Skeleton className='w-40 h-10 rounded-full bg-gray-300' />
                </div>
              ) : profile?.data ? (
                <div className='flex items-center gap-4'>
                  <Avatar className='w-10 h-10' title={profile?.data?.name}>
                    <AvatarImage
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                          profile?.data?.avatar || "/placeholder.png"
                      }
                      width={48}
                      height={48}
                      alt='Avatar'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Link
                    href={`/dashboard/${profile?.data?.role}`}
                    className='bg-[#235789] flex items-center gap-2 px-6 py-2 text-white rounded-4xl cursor-pointer'
                  >
                    Go Dashboard <ArrowRight size={18} />
                  </Link>
                </div>
              ) : (
                <Link
                  href='/login'
                  className='border-[#235789] text-[#235789] font-medium border-2 px-6 py-1.5 hover:bg-gray-50 bg-transparent rounded-4xl cursor-pointer'
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <Button
                variant='ghost'
                size='sm'
                onClick={toggleMenu}
                className='text-gray-600 hover:text-gray-900 relative z-60'
              >
                {isMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <Menu className='h-6 w-6' />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-black/50 backdrop-blur-sm'
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-100'>
            <Link
              href='/'
              className='flex items-center space-x-2'
              onClick={() => setIsMenuOpen(false)}
            >
              <Image src='/logo.png' alt='Logo' width={40} height={40} />
            </Link>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsMenuOpen(false)}
              className='text-gray-600 hover:text-gray-900 p-2'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>

          {/* Menu Content */}
          <div className='flex flex-col h-full'>
            {/* Navigation Links */}
            <div className='flex-1 px-6 py-6 space-y-1 overflow-y-auto'>
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-gray-700 hover:text-[#235789] hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium transform hover:translate-x-1 ${
                    isMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div>
                <Link
                  href='/dashboard'
                  className='w-2/3 bg-[#235789] flex items-center gap-2 px-6 py-2 text-white rounded-4xl'
                >
                  Go Dashboard <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='p-6 border-t border-gray-100 space-y-4'>
              {false ? (
                <>
                  <Button
                    variant='outline'
                    className='w-full border-[#235789] text-[#235789] hover:bg-blue-50 bg-transparent h-12 text-base font-medium'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Button>
                  <Button
                    className='w-full bg-[#235789] hover:bg-[#1e4a6f] text-white h-12 text-base font-medium'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </>
              ) : (
                <div className='space-y-4'>
                  <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage
                        src='/placeholder.png'
                        width={48}
                        height={48}
                        alt='@'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium text-gray-900'>Welcome back!</p>
                      <p className='text-sm text-gray-600'>user@example.com</p>
                    </div>
                  </div>
                  <Link
                    href='/dashboard'
                    className='w-full bg-[#235789] hover:bg-[#1e4a6f] text-white h-12 text-base font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Go Dashboard <ArrowRight size={18} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
