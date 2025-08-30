"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Twitter, Youtube } from "lucide-react";

export function FooterSection() {
  return (
    <footer className='bg-gray-900 text-white'>
      {/* CTA Section */}
      <div className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance'>
            Book Smarter. Tour Faster.
            <br />
            Getavails is Here.
          </h2>
          <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Button
              size='lg'
              className='bg-white text-gray-900 hover:bg-gray-100 font-medium'
            >
              Get Started - It&apos;s Free
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-gray-600 text-white hover:bg-gray-800 font-medium bg-transparent'
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
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* By Role */}
            <div>
              <h3 className='text-sm font-semibold text-white mb-4'>By Role</h3>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    For Artists
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    For Venues
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    For Agents
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    For Talent Buyers
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className='text-sm font-semibold text-white mb-4'>Company</h3>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className='text-sm font-semibold text-white mb-4'>Contact</h3>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='mailto:hello@getavails.com'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    hello@getavails.com
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:help@getavails.com'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    help@getavails.com
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:jobs@getavails.com'
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    jobs@getavails.com
                  </a>
                </li>
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
                © 2024 Getavails.com. All rights reserved.
              </p>
              <div className='flex items-center gap-4 text-sm'>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Terms of Use
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Privacy Policy
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Cookie settings
                </a>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-sm text-gray-400'>
                <div className='w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-xs'>✓</span>
                </div>
                Google security
              </div>
              <div className='flex items-center gap-3'>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  <Linkedin className='h-5 w-5' />
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  <Twitter className='h-5 w-5' />
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  <Youtube className='h-5 w-5' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
