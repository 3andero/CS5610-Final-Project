import { useContext } from "react";
import {
  Box,
  Drawer,
  Button,
  AppBar,
  useScrollTrigger,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GeneralContext } from "../context/general-context";
import { LinkedButton } from "./linked-button";
import MenuIcon from "@mui/icons-material/Menu";
import { ShoppingBag } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./searchbar";
import { TitleComponent } from "./title";
import React from "react";
import { ShoppingCartView } from "../view/shopping-cart";
import { SidebarView } from "view/sidebar-view";
import { ColorModeButton } from "./colormode-button";

const SideBarAndButton = ({
  onClick,
  open,
  sx,
  icon,
  anchor,
  children,
  drawerWidth,
  name,
}: {
  onClick: () => void;
  open: boolean;
  sx: Parameters<typeof Button>[0]["sx"];
  icon: React.ReactNode;
  anchor: Parameters<typeof Drawer>[0]["anchor"];
  children?: React.ReactNode;
  drawerWidth: number;
  name: string;
}) => {
  return (
    <>
      <Button
        sx={{
          ...sx,
          borderRadius: 2,
          minWidth: "auto",
          padding: 0.5,
        }}
        aria-label={name}
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
            maxWidth: drawerWidth,
          },
        }}
      >
        {children}
      </Drawer>
    </>
  );
};

function ElevationScroll({ children }: { children: any }) {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const StoreNavigation = () => {
  const context = useContext(GeneralContext);
  const theme = useTheme();
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  return (
    // <ElevationScroll>
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        top: 0,
        padding: "2em",
        display: "flex",
        flexDirection: "row",
        gap: "1em",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "saturate(180%) blur(30px)",
        background: alpha(theme.palette.background.default, 0.85),
      }}
    >
      <NavLink
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <TitleComponent />
      </NavLink>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {(isMd && (
          <>
            <SearchBar />
            <LinkedButton
              to={"/profile"}
              variant="text"
              sx={{ marginX: "0.5em" }}
            >
              Profile
            </LinkedButton>
            <LinkedButton to={"/shop"} variant="text" sx={{ marginX: "0.5em" }}>
              Shop
            </LinkedButton>
            <SideBarAndButton
              onClick={context.toggleShoppingCart}
              open={context.shoppingCartStatus}
              sx={{ display: "flex", marginX: "0.5em" }}
              icon={<ShoppingBag />}
              anchor={"right"}
              drawerWidth={360}
              name={"shopping cart"}
            >
              <ShoppingCartView />
            </SideBarAndButton>
            <ColorModeButton />
          </>
        )) || (
          <SideBarAndButton
            onClick={context.toggleSidebar}
            open={context.sidebarStatus}
            sx={{ marginX: "0.5em" }}
            icon={<MenuIcon />}
            anchor={"left"}
            drawerWidth={260}
            name={"menu"}
          >
            <SidebarView />
          </SideBarAndButton>
        )}
      </Box>
    </AppBar>
    // </ElevationScroll>
  );
};
