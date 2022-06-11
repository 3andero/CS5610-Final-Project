import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
export const LogoutButton = ({ variant }: Parameters<typeof Button>[0]) => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    (isAuthenticated && (
      <Button variant={variant} color="error" onClick={() => logout()}>
        Logout
      </Button>
    )) || <></>
  );
};
