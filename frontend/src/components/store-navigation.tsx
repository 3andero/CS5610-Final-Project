import { Box, Typography, Drawer, Button, AppBar } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../app-context";
import { LinkedButton } from "./linked-button";
import MenuIcon from "@mui/icons-material/Menu";
import { ShoppingBag } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./searchbar";

const SideBarAndButton = ({
  onClick,
  open,
  sx,
  icon,
  anchor,
}: {
  onClick: () => void;
  open: boolean;
  sx: Parameters<typeof Button>[0]["sx"];
  icon: React.ReactNode;
  anchor: Parameters<typeof Drawer>[0]["anchor"];
}) => {
  return (
    <>
      <Button
        variant={"outlined"}
        sx={{
          ...sx,
          borderRadius: 2,
          minWidth: "auto",
          padding: 0.5,
        }}
        onClick={onClick}
      >
        {icon}
      </Button>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={onClick}
        variant="temporary"
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: 260,
          },
        }}
      />
    </>
  );
};

export const StoreNavigation = () => {
  const context = useContext(AppContext);
  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        bgcolor: "white",
        color: "grey",
        padding: "2em",
        display: "flex",
        flexDirection: "row",
        gap: "1em",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <NavLink to="/">
        <Typography variant="h2">Gen2D</Typography>
      </NavLink>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <SearchBar />
        <LinkedButton to={"/profile"} variant="text">
          Profile
        </LinkedButton>
        <LinkedButton to={"/shop"} variant="text">
          Shop
        </LinkedButton>
        <SideBarAndButton
          onClick={context.toggleSidebar}
          open={context.sidebarStatus}
          sx={{ display: { md: "none", xs: "flex" } }}
          icon={<MenuIcon />}
          anchor={"left"}
        />
        <SideBarAndButton
          onClick={context.toggleShoppingCart}
          open={context.shoppingCartStatus}
          sx={{ display: "flex" }}
          icon={<ShoppingBag />}
          anchor={"right"}
        />
      </Box>
    </AppBar>
  );
};
