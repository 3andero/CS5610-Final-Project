import { createContext } from "react";
import { PaletteMode } from "@mui/material";

export const AppContext = createContext({
  sidebarStatus: false,
  toggleSidebar: () => {},
  toggleColorMode: () => {},
  shoppingCartStatus: false,
  toggleShoppingCart: () => {},
  colorMode: "light" as PaletteMode,
});
