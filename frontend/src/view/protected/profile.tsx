import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Box, Button, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const _profile = () => {
  return (
    <Box>
      <Typography variant="h2" textAlign={"center"}>
        Profile
      </Typography>
      <Button variant="text" component={Link} to={"/profile"}>
        General
      </Button>
      <Button variant="text" component={Link} to={"/profile/extra"}>
        Billing Address
      </Button>
      <Outlet />
    </Box>
  );
};

export const ProfileView = withAuthenticationRequired(_profile);
