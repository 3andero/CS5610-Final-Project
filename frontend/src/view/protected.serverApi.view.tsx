import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { BackButton } from "../components/back.button";
import { appConfig } from "../config";

import "./serverApi.css";

interface ServerAPIComponentState {
  error?: string;
  token?: string;
  showResult?: boolean;
  apiMsg?: any;
}

const getTokenBy =
  (
    tokenGetter: () => Promise<string | void>,
    state: ServerAPIComponentState,
    setState: (st: ServerAPIComponentState) => void
  ) =>
  async () => {
    try {
      const token = await tokenGetter();
      setState({
        ...state,
        token: (typeof token === "string" && token) || undefined,
        error: "",
      });
    } catch (e: any) {
      console.assert("error" in e, "");
      setState({
        ...state,
        error: e.error || "",
        token: undefined,
      });
    }
  };

const RequireActionComponent = ({
  onClick,
  msg,
  buttonMsg,
}: {
  onClick: () => any;
  msg: string;
  buttonMsg: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p className="server-api-page__title">{msg}</p>
      <Box p={5} alignContent="center">
        <Button variant="outlined" onClick={onClick}>
          {buttonMsg}
        </Button>
      </Box>
    </div>
  );
};

const _serverApi = () => {
  const {
    logout,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    loginWithPopup,
  } = useAuth0();
  const [state, setState] = useState({
    showResult: false,
  } as ServerAPIComponentState);

  const silentConsent = getTokenBy(getAccessTokenSilently, state, setState);
  useEffect(() => {
    silentConsent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const popupConsent = getTokenBy(getAccessTokenWithPopup, state, setState);
  const popupLogin = getTokenBy(loginWithPopup, state, setState);

  const callAPI = async () => {
    if (state.showResult) {
      return true;
    }
    console.log("call api");

    if (!state.token) {
      console.error("call api without a valid token");
      return false;
    }

    let responseData: string | undefined;
    try {
      const response = await fetch(
        `${appConfig.SERVER_DOMAIN}:${appConfig.API_PORT}/v1/protected/`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      responseData = await response.text();
      console.assert(responseData);
      setState({
        ...state,
        showResult: true,
        apiMsg: JSON.parse(responseData),
        error: "",
      });
    } catch (e: any) {
      console.log(e);

      setState({
        ...state,
        showResult: true,
        error: responseData || "unable to get a response",
      });
    }

    return true;
  };

  useEffect(() => {
    if (state.token) {
      callAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);
  return (
    <>
      <div>
        {state.error === undefined && (
          <LinearProgress color="secondary" style={{ width: "100%" }} />
        )}
      </div>
      <div className="server-api-page">
        {(state.error === "login_required" && (
          <RequireActionComponent
            onClick={async () => {
              await popupLogin();
              await silentConsent();
            }}
            msg={"Waiting to Login..."}
            buttonMsg={"Login"}
          />
        )) ||
          (state.error === "consent_required" && (
            <RequireActionComponent
              onClick={popupConsent}
              msg={"Waiting for consent..."}
              buttonMsg={"Consent"}
            />
          )) ||
          (state.error && state.error.length > 0 && (
            <p style={{ color: "red" }}>unknown error: {state.error}</p>
          ))}

        {state.token && (
          <>
            {state.apiMsg !== undefined && (
              <p style={{ color: "black" }}>API Message: {state.apiMsg.msg}</p>
            )}
            <Box p={5}>
              <Button variant="outlined" color="error" onClick={() => logout()}>
                Logout
              </Button>
            </Box>
            <BackButton />
          </>
        )}
      </div>
    </>
  );
};

// export const ServerApi = withAuthenticationRequired(_serverApi);
export const ServerApi = _serverApi;
