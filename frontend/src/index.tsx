import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { AppRoutes } from "./routes";
import { CssBaseline, Paper } from "@mui/material";
import { AppContext } from "context/app-context";

const AppRoot = () => {
  return (
    <React.StrictMode>
      <AppContext>
        <CssBaseline />
        <Paper elevation={0}>
          <AppRoutes />
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
