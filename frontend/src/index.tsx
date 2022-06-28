import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { appConfig } from "./config";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Box, CssBaseline, Paper } from "@mui/material";
import { AppContext } from "context/app-context";

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
  return (
    <React.StrictMode>
      <AppContext>
        <CssBaseline />
        <Paper elevation={0}>
          <Box
            sx={{
              minHeight: "auto",
              height: "100vh",
              width: "100%",
              bgcolor: "background.default",
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
                <AppRoutes />
              </Auth0ProviderRedirectBack>
            </BrowserRouter>
          </Box>
        </Paper>
      </AppContext>
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
