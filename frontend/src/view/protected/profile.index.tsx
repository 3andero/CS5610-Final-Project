import { Box } from "@mui/material";
import { FurtherAction, ProtectedCall, useProtected } from "./serverApi";
import { appConfig } from "../../config";
import { useAuth0, User } from "@auth0/auth0-react";
import { UpdateProfile } from "../../components/update-profile";
import { useEffect } from "react";

const getOrPostNewUser: ProtectedCall<User> = async (
  authHeader,
  state,
  user?: User
) => {
  user = user as User;
  const url = `${appConfig.API_SERVER_DOMAIN}user`;
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
      email: user.email,
    };
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader },
      body: JSON.stringify(newUserProfile),
    });
    console.log("res2", res);
    state.data = newUserProfile;
    state.error = undefined;
  } else {
    state.data = undefined;
    state.error = await res.text();
  }
};

export const ProfileIndexView = () => {
  const { user } = useAuth0();
  const handle = useProtected(getOrPostNewUser, {
    audience: appConfig.AUDIENCE,
  });
  useEffect(() => {
    handle.refresh(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      gap="1em"
    >
      <FurtherAction protectedCallHandle={handle} refreshArgs={user}>
        <Box
          sx={{
            margin: "3em",
          }}
        >
          <UpdateProfile initialValues={handle.data} />
          {/* {(status.data && <>{JSON.stringify(status.data)}</>) || (
            <>failed: {JSON.stringify(status)}</>
          )} */}
        </Box>
      </FurtherAction>
    </Box>
  );
};
