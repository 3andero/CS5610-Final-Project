import { PaletteMode, ThemeProvider } from "@mui/material";
import React from "react";
import { useState } from "react";
import { getTheme } from "theme/myTheme";
import { CurrencyContext } from "./currency-context";
import { GeneralContext } from "./general-context";
import { CartContextProvider } from "./shopping-cart-context";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { appConfig } from "config";
import { SnackBarContextProvider } from "./snackbar-context";

const Auth0ProviderRedirectBack = ({
  children,
  ...props
}: Auth0ProviderOptions) => {
  const navigate = useNavigate();
  return (
    <Auth0Provider
      {...props}
      onRedirectCallback={(appState) => {
        navigate((appState && appState.returnTo) || window.location.origin);
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [colorMode, setColorMode] = useState<PaletteMode>(
    localStorage.getItem("theme")
      ? (localStorage.getItem("theme") as PaletteMode)
      : "light"
  );
  const [shoppingCartStatus, setShoppingCartStatus] = useState(false);
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
      }}
    >
      <BrowserRouter>
        <Auth0ProviderRedirectBack
          domain={appConfig.ISSUER_BASE_URL}
          clientId={appConfig.CLIENT_ID}
          redirectUri={window.location.origin}
          audience={appConfig.AUDIENCE}
          // cacheLocation={"localstorage"}
          // useRefreshTokens={false}
        >
          <CartContextProvider>
            <ThemeProvider theme={theme}>
              <SnackBarContextProvider>
                <CurrencyContext>{children}</CurrencyContext>
              </SnackBarContextProvider>
            </ThemeProvider>
          </CartContextProvider>
        </Auth0ProviderRedirectBack>
      </BrowserRouter>
    </GeneralContext.Provider>
  );
};
