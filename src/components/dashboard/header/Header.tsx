"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [admin] = useState({
    name: "Steven Yuen",
    role: "Admin",
    image: "/admin.png",
  });
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTitle(pathname.split("/")[1].split("-").join(" "));
  }, [pathname]);

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

  console.log(pathname.split("/")[1]);

  return (
    <div className='bg-white mb-6'>
      <div className='max-w-8xl mx-auto'>
        <div className='flex items-center justify-between py-2'>
          <div>
            <h1 className='text-2xl lg:text-4xl font-bold text-[#222222] capitalize'>
              {headerTitle}
            </h1>
          </div>
          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' className='relative'>
              <Image
                src='/notification.svg'
                alt='Admin'
                width={55}
                height={55}
              />
              <span className='absolute -top-1 -right-1 h-3 w-3 bg-red-500 shadow rounded-full'></span>
            </Button>
            <div className='flex items-center gap-3'>
              <Avatar className='h-12 w-12 !rounded-sm'>
                <AvatarImage src='/admin.png' alt='Daissy' />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <div className='hidden sm:block'>
                <p className='text-base font-medium text-[#1E1E1E]'>
                  {admin?.name}
                </p>
                <p className='text-sm text-[#606060]'>{admin?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
