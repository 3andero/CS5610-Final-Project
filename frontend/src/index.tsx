import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { appConfig } from "./config";
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import { Profile } from "./view/protected.profile.view";
import { ServerApi } from "./view/protected.serverApi.view";

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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderRedirectBack
        domain={appConfig.ISSUER_BASE_URL}
        clientId={appConfig.CLIENT_ID}
        redirectUri={window.location.origin}
        audience={appConfig.AUDIENCE}
        cacheLocation={"localstorage"}
        useRefreshTokens={false}
      >
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/access-server" element={<ServerApi />} />
        </Routes>
      </Auth0ProviderRedirectBack>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
