import { useContext, useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Button,
  AppBar,
  useScrollTrigger,
  alpha,
  useTheme,
} from "@mui/material";
import { AppContext } from "../app-context";
import { LinkedButton } from "./linked-button";
import MenuIcon from "@mui/icons-material/Menu";
import { ShoppingBag } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { SearchBar } from "./searchbar";
import { TitleComponent } from "./title";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CartItem, ShoppingCartView } from "../view/shopping-cart";
import { useAuth0 } from "@auth0/auth0-react";
import { ProtectedCall, useProtected } from "../view/protected/serverApi";
import { appConfig } from "../config";



const SideBarAndButton = ({
  onClick,
  open,
  sx,
  icon,
  anchor,
  children,
  drawerWidth
}: {
  onClick: () => void;
  open: boolean;
  sx: Parameters<typeof Button>[0]["sx"];
  icon: React.ReactNode;
  anchor: Parameters<typeof Drawer>[0]["anchor"];
  children?: React.ReactNode;
  drawerWidth: number
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
            maxWidth: drawerWidth,
          },
        }}
      >{children}</Drawer>
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

interface fetchShoppingCartFnArgs {
  cart?: CartItem[],
  setCart: (...args: any[]) => void,
  method: "GET" | "POST",
};

const fetchShoppingCartFn: ProtectedCall<fetchShoppingCartFnArgs, CartItem[]> = async (authHeader,
  state, args) => {
  const { setCart, method, cart } = args!;
  const url = `${appConfig.API_SERVER_DOMAIN}shopping-cart`;

  let res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeader
    },
    body: method === "GET" ? undefined : JSON.stringify(cart!.map(({ _id, quantity }) => ({ product_id: _id, quantity, })))
  });
  console.log("res-shopping-cart", res);
  if (res.status >= 200 && res.status <= 299) {
    if (method === "GET") {
      state.data = await res.json();
      console.log("cart get", state.data);
      setCart(state.data);
    }
  } else {
    state.data = undefined;
    state.error = await res.text();
  }
  return;
};

export const StoreNavigation = () => {
  const context = useContext(AppContext);
  const { isAuthenticated } = useAuth0();
  const [fetched, setFetched] = useState(false);
  const handle = useProtected<fetchShoppingCartFnArgs, CartItem[]>(fetchShoppingCartFn, {
    audience: appConfig.AUDIENCE,
  });
  useEffect(() => {
    if (isAuthenticated) {
      if (!fetched) {
        setFetched(true);
        handle.refresh({ method: "GET", setCart: context.setCartState });
      } else {
        handle.refresh({ method: "POST", setCart: context.setCartState, cart: context.cartState });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, context.cartState]);
  const theme = useTheme();
  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          top: 0,
          // bgcolor: "background.default",
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
            drawerWidth={260}
          />
          <SideBarAndButton
            onClick={context.toggleShoppingCart}
            open={context.shoppingCartStatus}
            sx={{ display: "flex" }}
            icon={<ShoppingBag />}
            anchor={"right"}
            drawerWidth={360}
          ><ShoppingCartView /></SideBarAndButton>

          <Button
            onClick={context.toggleColorMode}
            sx={{
              minWidth: "auto",
              margin: "0.5em",
            }}
          >
            {(context.colorMode === "dark" && (
              <LightModeIcon
                fontSize="small"
                sx={{ color: "secondary.main" }}
              />
            )) || (
                <DarkModeIcon fontSize="small" sx={{ color: "primary.main" }} />
              )}
          </Button>
        </Box>
      </AppBar>
    </ElevationScroll>
  );
};
