import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface LinkedButtonProps {
  to: Parameters<typeof Link>[0]["to"];
  sx?: Parameters<typeof Button>[0]["sx"];
  variant?: Parameters<typeof Button>[0]["variant"];
  children: Parameters<typeof Button>[0]["children"];
}

export const LinkedButton = (props: LinkedButtonProps) => (
  <Button {...props} component={Link} sx={{ color: "text.primary" }}></Button>
);
