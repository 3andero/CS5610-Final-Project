import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button } from "@mui/material";
import { AppContext } from "../app-context";
import { useContext } from "react";

export const ColorModeButton = () => {
  const context = useContext(AppContext);

  return (
    <Button
      onClick={context.toggleColorMode}
      sx={{
        minWidth: "auto",
        margin: "0.5em",
      }}
    >
      {(context.colorMode === "dark" && (
        <LightModeIcon fontSize="small" sx={{ color: "secondary.main" }} />
      )) || <DarkModeIcon fontSize="small" sx={{ color: "primary.main" }} />}
    </Button>
  );
};
