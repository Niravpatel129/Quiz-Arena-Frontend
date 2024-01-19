import { createContext, useContext, useState } from 'react';

const MenuContext = createContext({
  menuOpen: false,
  setMenuOpen: () => {},
});

const MenuProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>{children}</MenuContext.Provider>;
};

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export { MenuContext, MenuProvider, useMenuContext };
