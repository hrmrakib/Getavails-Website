import MessagePage from "@/components/dashboard/message/Message";
import { SocketProvider } from "@/provider/SocketProvider";
import React from "react";

const AgentMessage = () => {
  return (
    <SocketProvider>
      <MessagePage />
    </SocketProvider>
  );
};

export default AgentMessage;
