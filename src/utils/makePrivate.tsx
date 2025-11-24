"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";
import { Loader } from "lucide-react";

interface RoleRedirectProps {
  allowedRole?: string;
  children: React.ReactNode;
}

export function RoleRedirect({ allowedRole, children }: RoleRedirectProps) {
  const router = useRouter();
  const { data: profile, isLoading } = useGetProfileQuery(undefined);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading) {
      const userRole = profile?.data?.role?.toUpperCase();
      const allowed = allowedRole?.toUpperCase();

      if (!userRole) {
        router.replace("/login"); // Not logged in
      } else if (allowed && userRole !== allowed) {
        router.replace(`/dashboard/${userRole.toLowerCase()}`);
      } else {
        setAuthorized(true); // Authorized
      }
    }
  }, [profile, isLoading, allowedRole, router]);

  if (isLoading || authorized === null) {
    return (
      <div className='text-center flex items-center justify-center gap-2 py-20'>
        Checking access <Loader className='animate-spin' />
      </div>
    );
  }

  return <>{children}</>;
}

// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
// 😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆😆
// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useGetProfileQuery } from "@/redux/features/profile/profileAPI";

// interface RoleRedirectProps {
//   allowedRole?: string;
//   isAdmin?: boolean;
//   children: React.ReactNode;
// }

// export function RoleRedirect({
//   allowedRole,
//   isAdmin,
//   children,
// }: RoleRedirectProps) {
//   const router = useRouter();
//   const { data: profile, isLoading } = useGetProfileQuery(undefined);
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     if (!isLoading) {
//       if (!profile?.data?.role) {
//         // If no role, redirect to login or homepage
//         router.replace("/login");
//       } else if (profile.data.role !== allowedRole) {
//         // Redirect to their role-specific dashboard
//         router.replace(`/dashboard/${profile.data.role.toLowerCase()}`);
//       } else {
//         // User is allowed
//         setAuthorized(true);
//       }
//     }
//   }, [profile, isLoading, allowedRole, router]);

//   if (isLoading || !authorized) {
//     // Show nothing or a loader until authorization check completes
//     return null;
//   }

//   // Render children if user is authorized
//   return <>{children}</>;
// }
