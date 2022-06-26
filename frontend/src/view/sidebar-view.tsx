import { Box, Divider } from "@mui/material";
import { NavItem } from "components/navitem";
import { TitleComponent } from "components/title";
import NextIcon from "@mui/icons-material/NavigateNext";
import { useContext } from "react";
import { AppContext } from "app-context";
import { ColorModeButton } from "components/colormode-button";
import { SearchBar } from "components/searchbar";

const SideBarNavItem = (props: Parameters<typeof NavItem>[0]) => {
  return (
    <Box marginY={"0.5rem"} padding={0}>
      <NavItem {...props}>
        <NextIcon />
      </NavItem>
    </Box>
  );
};

export const SidebarView = () => {
  const context = useContext(AppContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          margin: "1.8em",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          display={"flex"}
          component="a"
          href="/"
          title="Gen2D"
          marginY={"2em"}
        >
          <TitleComponent variant="h4" />
        </Box>
        <Divider />
        <SearchBar
          sx={{
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
          }}
        />
        <SideBarNavItem to={"/shop"} title={"Shop"} />
        <SideBarNavItem to={"/profile"} title={"Profile"} />
        <SideBarNavItem to={"/shopping-cart"} title={"Shopping Cart"} />
      </Box>
      {/* <Box paddingX={2} paddingY={2}>
        
      </Box> */}

      <Box display={"flex"} width={"100%"} marginTop="auto">
        <Box marginLeft={"auto"} marginRight={"1em"} marginY={"1em"}>
          <ColorModeButton />
        </Box>
      </Box>
    </Box>
  );
};
