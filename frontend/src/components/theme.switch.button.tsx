import { Button, PaletteMode, Typography } from "@mui/material";

export const ThemeSwitchButton = ({
  mode,
  onClick,
}: {
  mode: PaletteMode;
  onClick: Parameters<typeof Button>[0]["onClick"];
}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      color={(mode === "dark" && "secondary") || "primary"}
    >
      <Typography variant="subtitle1" fontWeight={400}>
        {(mode === "dark" && "Light") || "Dark"}
      </Typography>
    </Button>
  );
};
