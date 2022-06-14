import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { appConfig } from "../../config";

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
    <Box
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
    </Box>
  );
};

export const FurtherAction = ({
  refresh,
  error,
  isLoading,
  children,
}: {
  refresh: () => void;
  error?: string;
  isLoading: boolean;
  children?: React.ReactNode;
}): JSX.Element => {
  const { loginWithPopup, getAccessTokenWithPopup } = useAuth0();
  return (
    (error === undefined && isLoading && (
      <LinearProgress
        color="secondary"
        style={{ width: "100%" }}
        sx={{
          position: "fixed",
          top: 0,
          zIndex: 1100,
        }}
      />
    )) ||
    (error === "login_required" && (
      <RequireActionComponent
        onClick={async () => {
          await loginWithPopup();
          refresh();
        }}
        msg={"Waiting to Login..."}
        buttonMsg={"Login"}
      />
    )) ||
    (error === "consent_required" && (
      <RequireActionComponent
        onClick={async () => {
          await getAccessTokenWithPopup();
          refresh();
        }}
        msg={"Waiting for consent..."}
        buttonMsg={"Consent"}
      />
    )) ||
    (error && error.length > 0 && (
      <p style={{ color: "red" }}>unknown error: {error}</p>
    )) || <>{children}</>
  );
};

export const useApi = (
  url: string,
  fetchOptions: Parameters<typeof fetch>[1] & {
    scope?: string;
  }
) => {
  return useProtected(
    async (authHeaders, state) => {
      const res = await fetch(url, {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          // Add the Authorization header to the existing headers
          ...authHeaders,
        },
      });
      state.data =
        (res.status >= 200 && res.status <= 299 && (await res.json())) || {};
      state.error =
        (res.status >= 400 && res.status <= 599 && (await res.text())) ||
        undefined;
    },
    {
      audience: appConfig.AUDIENCE,
      scope: fetchOptions.scope,
    }
  );
};

export interface ProtectedCallState {
  error?: string;
  loading: boolean;
  data?: any;
}

export type ProtectedCall = (
  authHeader: { Authorization: string },
  state: ProtectedCallState,
  args?: any
) => Promise<void>;

export const useProtected = (
  fn: ProtectedCall,
  options: { audience?: string; scope?: string }
) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<ProtectedCallState>({
    error: undefined,
    loading: true,
    data: undefined,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { audience, scope } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });
        await fn({ Authorization: `Bearer ${accessToken}` }, state);
        setState({
          ...state,
          loading: false,
        });
      } catch (error: any) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
