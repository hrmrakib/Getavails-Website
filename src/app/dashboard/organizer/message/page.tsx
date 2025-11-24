import MessagePage from "@/components/dashboard/message/Message";
import { SocketProvider } from "@/provider/SocketProvider";
import { RoleRedirect } from "@/utils/makePrivate";
import React from "react";

const Message = () => {
  return (
    <RoleRedirect allowedRole='ORGANIZER'>
      <SocketProvider>
        <MessagePage />
      </SocketProvider>
    </RoleRedirect>
  );
};

export default Message;
