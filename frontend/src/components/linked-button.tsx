import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

type LinkedButtonProps = ButtonProps & {
  to: Parameters<typeof Link>[0]["to"];
};

export const LinkedButton = ({ sx, to, ...rest }: LinkedButtonProps) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Button sx={{ color: "text.primary", ...sx }} {...rest} />
    </Link>
  );
};
