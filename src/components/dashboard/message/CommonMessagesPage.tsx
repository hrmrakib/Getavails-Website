import { SocketProvider } from "@/provider/SocketProvider";
import React from "react";
import MessagePage from "./Message";

const CommonMessagesPage = () => {
  return (
    <SocketProvider>
      <MessagePage />
    </SocketProvider>
  );
};

export default CommonMessagesPage;
