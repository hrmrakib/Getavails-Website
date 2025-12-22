"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const explore = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

const role = [
  { name: "Agent", href: "/dashboard/agent" },
  { name: "Artist", href: "/dashboard/artist" },
  { name: "Venue", href: "/dashboard/venue" },
  { name: "Organizer", href: "/dashboard/organizer" },
  { name: "User", href: "/dashboard/user" },
];

const company = [
  { name: "About Us", href: "/" },
  { name: "Terms of Use", href: "/" },
  { name: "Privacy Policy", href: "/" },
];

const contact = ["+1 (123) 456-7890", "support@getavails.com"];

export function FooterSection() {
  const pathname = usePathname();
  const router = useRouter();

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
    pathname === "/signup/user" ||
    pathname === "/signup/organizer"
  ) {
    return null;
  }

  return (
    <footer className='z-50 bg-[#1E1E1E] text-white'>
      {/* CTA Section */}
      <div className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance'>
            Start booking smarter.
          </h2>
          <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Button
              size='lg'
              className='bg-white text-gray-900 hover:bg-gray-100 font-medium cursor-pointer'
            >
              Get Started - It&apos;s Free
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button
              onClick={() => router.push("/how-it-works")}
              size='lg'
              variant='outline'
              className='border-[#FFFFFF] text-white hover:bg-gray-100 font-medium bg-transparent cursor-pointer'
            >
              Learn how it works
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-700' />

      {/* Links Section */}
      <div className='px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {/* Explore */}
            <div>
              <h3 className='text-sm font-semibold text-white mb-4'>Explore</h3>
              <ul className='space-y-3'>
                {explore.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* By Role */}
            <div>
              <h3 className='text-sm font-semibold text-white mb-4'>By Role</h3>
              <ul className='space-y-3'>
                {role.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className='text-sm font-semibold text-white mb-4'>Company</h3>
              <ul className='space-y-3'>
                {company.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className='text-sm font-semibold text-white mb-4'>Contact</h3>
              <ul className='space-y-3'>
                {contact.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`tel:${item}`}
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-700' />

      {/* Bottom Section */}
      <div className='px-4 py-6 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6'>
              <p className='text-sm text-gray-400'>
                © {new Date().getFullYear()} Getavails.com. All rights reserved.
              </p>
              <div className='flex items-center gap-4 text-sm'>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Terms of Use
                </Link>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Cookie settings
                </Link>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-sm text-gray-400'>
                <Image
                  src='/checked.svg'
                  alt='Google'
                  width={24}
                  height={24}
                  title='Verified by Google'
                />
                Google security
              </div>
              <div className='flex items-center gap-3'>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  <Linkedin className='h-5 w-5' />
                </Link>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  <Twitter className='h-5 w-5' />
                </Link>
                <Link
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  <Youtube className='h-5 w-5' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
