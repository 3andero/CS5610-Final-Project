import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { LogoutButton } from "../../components/logout.button";

const _profile = () => {
  return (
    <Box>
      <Button variant="text" component={Link} to={"/profile"}>
        General
      </Button>
      <Button variant="text" component={Link} to={"/profile/extra"}>
        Billing Address
      </Button>
      <LogoutButton variant="contained" />
      <Outlet />
    </Box>
  );
};

export const ProfileView = withAuthenticationRequired(_profile);
