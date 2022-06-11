import { Box, Typography } from "@mui/material";
import { LogoutButton } from "../../components/logout.button";

export const ProfileIndexView = () => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      gap="1em"
    >
      <LogoutButton variant="contained" />
      <Typography>Profile.Index.View</Typography>
    </Box>
  );
};
