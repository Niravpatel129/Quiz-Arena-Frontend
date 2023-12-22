import React, { createContext, useContext, useEffect, useState } from 'react';
import socketService from '../../services/socketService';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const ConnectSocket = () => {
    const socketInstance = socketService.connect();
    setSocket(socketInstance);
  };

  useEffect(() => {
    ConnectSocket();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        ConnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
