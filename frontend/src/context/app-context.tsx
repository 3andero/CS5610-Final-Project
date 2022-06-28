import { PaletteMode, ThemeProvider } from "@mui/material";
import React from "react";
import { useState } from "react";
import { getTheme } from "theme/myTheme";
import { CartItem } from "view/shopping-cart";
import { CurrencyContext } from "./currency-context";
import { GeneralContext } from "./general-context";

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [colorMode, setColorMode] = useState<PaletteMode>(
    localStorage.getItem("theme")
      ? (localStorage.getItem("theme") as PaletteMode)
      : "light"
  );
  const [shoppingCartStatus, setShoppingCartStatus] = useState(false);
  const [cartState, setCartState] = useState<CartItem[]>([]);
  const theme = React.useMemo(() => getTheme(colorMode), [colorMode]);

  return (
    <GeneralContext.Provider
      value={{
        sidebarStatus,
        toggleSidebar: () => {
          setSidebarStatus((v) => !v);
        },
        toggleColorMode: () => {
          setColorMode((v) => {
            const new_mode = v === "dark" ? "light" : "dark";
            localStorage.setItem("theme", new_mode);
            return new_mode;
          });
        },
        shoppingCartStatus,
        toggleShoppingCart: () => {
          setShoppingCartStatus((v) => !v);
        },
        colorMode,
        cartState,
        setCartState,
      }}
    >
      <ThemeProvider theme={theme}>
        <CurrencyContext>{children}</CurrencyContext>
      </ThemeProvider>
    </GeneralContext.Provider>
  );
};
