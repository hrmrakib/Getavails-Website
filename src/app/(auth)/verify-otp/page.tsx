import VerifyOtpContent from "@/components/auth/VerifyOtpContent";
import React, { Suspense } from "react";

const VerifyOtpPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyOtpContent />
      </Suspense>
    </>
  );
};

export default VerifyOtpPage;
