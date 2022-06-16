import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { appConfig } from "./config";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppContext } from "./app-context";

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

const AppRoot = () => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [colorMode, setColorMode] = useState(false);
  const [shoppingCartStatus, setShoppingCartStatus] = useState(false);
  return (
    <React.StrictMode>
      <AppContext.Provider
        value={{
          sidebarStatus,
          toggleSidebar: () => {
            setSidebarStatus((v) => !v);
          },
          toggleColorMode: () => {
            setColorMode((v) => !v);
          },
          shoppingCartStatus,
          toggleShoppingCart: () => {
            setShoppingCartStatus((v) => !v);
          },
        }}
      >
        <BrowserRouter>
          <Auth0ProviderRedirectBack
            domain={appConfig.ISSUER_BASE_URL}
            clientId={appConfig.CLIENT_ID}
            redirectUri={window.location.origin}
            audience={appConfig.AUDIENCE}
            cacheLocation={"localstorage"}
            useRefreshTokens={false}
          >
            <AppRoutes />
          </Auth0ProviderRedirectBack>
        </BrowserRouter>
      </AppContext.Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<AppRoot />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
