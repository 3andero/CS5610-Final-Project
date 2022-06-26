import { Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

export const NavItem = (props: {
  to: string;
  title: string;
  children?: any;
}) => {
  const theme = useTheme();
  return (
    <NavLink
      to={props.to}
      style={({ isActive }) => ({
        color:
          (isActive && theme.palette.text.primary) ||
          theme.palette.text.disabled,
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      })}
    >
      <Typography variant="subtitle1" fontWeight={400}>
        {props.title}
      </Typography>
      {props.children}
    </NavLink>
  );
};
