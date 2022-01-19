import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
//
const SocketContext = createContext(null);
//
export function useSocket() {
  return useContext(SocketContext);
}
//
export function SocketProvider({ accessToken, children }: any) {
  const [socket, setSocket]: any = useState();
  //
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_FETCHURL!, {
      auth: {
        accessToken: accessToken,
      },
      transports: ["websocket"],
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [accessToken]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
