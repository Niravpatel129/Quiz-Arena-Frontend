import React, { createContext } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  return <MusicContext.Provider value={{}}>{children}</MusicContext.Provider>;
};

export const useMusic = () => {
  return React.useContext(MusicContext);
};
