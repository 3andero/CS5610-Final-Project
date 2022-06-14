import { Box, Typography } from "@mui/material";
import { LogoutButton } from "../../components/logout.button";
import { FurtherAction, ProtectedCall, useProtected } from "./serverApi";
import { appConfig } from "../../config";
import { useAuth0, User } from "@auth0/auth0-react";

const getOrPostNewUser: ProtectedCall = async (
  authHeader,
  state,
  user: User
) => {
  const url = `${appConfig.SERVER_DOMAIN}:${appConfig.API_PORT}/user`;
  let res = await fetch(url, {
    method: "GET",
    headers: { ...authHeader },
  });
  console.log("res1", res);
  if (res.status >= 200 && res.status <= 299) {
    const data = await res.json();
    if (data) {
      state.data = data;
      state.error = undefined;
      return;
    }
    const newUserProfile = {
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone_number,
      payment: "",
      avatar: "",
    };
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader },
      body: JSON.stringify(newUserProfile),
    });
    state.data = newUserProfile;
    state.error = undefined;
  } else {
    state.data = undefined;
    state.error = await res.text();
  }
};

export const ProfileIndexView = () => {
  const { user } = useAuth0();
  const {
    loading,
    error,
    refresh,
    data: userProfile,
  } = useProtected(async (a0, a1) => getOrPostNewUser(a0, a1, user), {
    audience: appConfig.AUDIENCE,
  });

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      gap="1em"
    >
      <LogoutButton variant="contained" />
      <Typography>Profile.Index.View</Typography>
      <FurtherAction refresh={refresh} error={error} isLoading={loading}>
        <Box>{JSON.stringify(userProfile)}</Box>
      </FurtherAction>
    </Box>
  );
};
