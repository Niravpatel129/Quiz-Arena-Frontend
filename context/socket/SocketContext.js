import React, { createContext, useContext, useEffect, useState } from 'react';
import socketService from '../../services/socketService';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = socketService.connect();
    setSocket(socketInstance);

    return () => {
      socketService.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
