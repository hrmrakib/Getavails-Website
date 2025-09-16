"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    pathname === "/signin" ||
    pathname === "/forget-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password" ||
    pathname.split("/")[1] === "dashboard"
  ) {
    return null;
  }

  return (
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
            {false ? (
              <Button
                variant='outline'
                className='border-[#235789] text-[#235789] hover:bg-gray-50 bg-transparent rounded-4xl cursor-pointer'
              >
                Login
              </Button>
            ) : (
              <div className='flex items-center gap-4'>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src='/placeholder.png'
                    width={48}
                    height={48}
                    alt='@'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Link
                  href='/dashboard'
                  className='bg-[#235789] flex items-center gap-2 px-6 py-2 text-white rounded-4xl'
                >
                  Go Dashboard <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleMenu}
              className='text-gray-600 hover:text-gray-900'
            >
              {isMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className='md:hidden border-t border-gray-100'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className='pt-4 space-y-2'>
                <Button
                  variant='outline'
                  className='w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent'
                >
                  Login
                </Button>
                <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
                  Get Started
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
