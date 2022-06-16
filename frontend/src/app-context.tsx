import { createContext } from "react";

export const AppContext = createContext({
  sidebarStatus: false,
  toggleSidebar: () => {},
  toggleColorMode: () => {},
  shoppingCartStatus: false,
  toggleShoppingCart: () => {},
});
