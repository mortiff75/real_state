import { io } from "socket.io-client";

import { createContext, useEffect, useState, useContext } from "react";

import { authContext } from "./auth.jsx";

export const socketCtx = createContext({ socket: null });

const SocketContext = ({ children }) => {
  const { currentUser } = useContext(authContext);

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:8000"));
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      socket.emit("newUser", currentUser.id);
    }
  }, [currentUser, socket]);

  return <socketCtx.Provider value={{ socket }}>{children}</socketCtx.Provider>;
};

export default SocketContext;
