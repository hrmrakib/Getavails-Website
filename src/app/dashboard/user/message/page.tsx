import MessagePage from "@/components/dashboard/message/Message";
import { SocketProvider } from "@/provider/SocketProvider";
import React from "react";

const Message = () => {
  return (
    <SocketProvider>
      <MessagePage />
    </SocketProvider>
  );
};

export default Message;
