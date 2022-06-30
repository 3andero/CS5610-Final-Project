import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button } from "@mui/material";
import { GeneralContext } from "../context/general-context";
import { useContext } from "react";

export const ColorModeButton = () => {
  const context = useContext(GeneralContext);

  return (
    <Button
      onClick={context.toggleColorMode}
      sx={{
        minWidth: "auto",
        margin: "0.5em",
      }}
      aria-label={context.colorMode}
    >
      {(context.colorMode === "dark" && (
        <LightModeIcon fontSize="small" sx={{ color: "secondary.main" }} />
      )) || <DarkModeIcon fontSize="small" sx={{ color: "primary.main" }} />}
    </Button>
  );
};
