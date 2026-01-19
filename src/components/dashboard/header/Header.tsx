"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
import Link from "next/link";

const Header = () => {
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const pathname = usePathname();

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!localStorage?.getItem("access_token"));
  }, []);

  const { data: profile } = useGetProfileQuery(undefined, {
    skip: hasToken === false,
  });

  const segments = pathname.split("/");
  const role = segments[2];

  useEffect(() => {
    setHeaderTitle(role);
  }, [role]);

  if (
    pathname === "/signup" ||
    pathname === "/signin" ||
    pathname === "/forget-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password"
  ) {
    return null;
  }

  return (
    <div className='bg-white mb-6'>
      <div className='max-w-8xl mx-auto'>
        <div className='flex items-center justify-between py-2'>
          <div>
            <h1 className='text-2xl lg:text-4xl font-bold text-[#222222] capitalize'>
              {headerTitle} Dashboard
            </h1>
          </div>
          <div className='flex items-center gap-4'>
            {/* <Button variant='ghost' size='icon' className='relative'>
              <Image
                src='/notification.svg'
                alt='Admin'
                width={55}
                height={55}
              />
              <span className='absolute -top-1 -right-1 h-3 w-3 bg-red-500 shadow rounded-full'></span>
            </Button> */}
            <div className='flex items-center gap-3'>
              <Link href='/profile'>
                <Avatar className='h-12 w-12 !rounded-full'>
                  <AvatarImage
                    className='h-12 w-12 !rounded-full'
                    width={55}
                    height={55}
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL + profile?.data?.avatar
                    }
                    alt='Daissy'
                  />
                  <AvatarFallback>
                    {profile?.data?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className='hidden sm:block'>
                <p className='text-base font-medium text-[#1E1E1E]'>
                  {profile?.data?.name}
                </p>
                <p className='text-sm text-[#606060]'>
                  {profile?.data?.role}{" "}
                  <span className='text-[#606060] font-medium'>
                    {profile?.data?.is_admin ? "(Admin)" : ""}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
