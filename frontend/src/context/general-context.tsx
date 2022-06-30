import { createContext } from "react";
import { PaletteMode } from "@mui/material";

const defaultContext = {
  sidebarStatus: false,
  toggleSidebar: () => {},
  toggleColorMode: () => {},
  shoppingCartStatus: false,
  toggleShoppingCart: () => {},
  colorMode: "light" as PaletteMode,
};

export const GeneralContext = createContext(defaultContext);
