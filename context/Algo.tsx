import { connectSocket } from "@/services/socketService";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token_jwt");
      if (token) {
        const newSocket = connectSocket(token);
        setSocket(newSocket);
      }
    })();

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
