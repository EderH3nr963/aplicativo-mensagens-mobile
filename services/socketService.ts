import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (!socket) {
    socket = io("http://192.168.0.10:3000", {
      auth: { token },
      transports: ["websocket"],
    });

    // Exemplo de handler global
    socket.on("connect", () => console.log("Socket conectado"));
    socket.on("disconnect", () => console.log("Socket desconectado"));
  }

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
