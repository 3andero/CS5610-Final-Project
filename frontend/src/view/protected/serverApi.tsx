import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
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

export const FurtherAction = <T,>({
  protectedCallHandle: { refresh, error, isLoading },
  children,
  refreshArgs,
}: {
  protectedCallHandle: ProtectedCallHandle<T>;
  children?: React.ReactNode;
  refreshArgs?: T;
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
          isLoading && refresh(refreshArgs);
        }}
        msg={"Waiting to Login..."}
        buttonMsg={"Login"}
      />
    )) ||
    (error === "consent_required" && (
      <RequireActionComponent
        onClick={async () => {
          await getAccessTokenWithPopup();
          isLoading && refresh(refreshArgs);
        }}
        msg={"Waiting for consent..."}
        buttonMsg={"Consent"}
      />
    )) ||
    (error && error.length > 0 && (
      <Typography sx={{ color: "red" }}>unknown error: {error}</Typography>
    )) || <>{children}</>
  );
};

export type ApiCallArgs = {
  url: string;
  fetchOptions: Parameters<typeof fetch>[1];
};

type AuthOptions = { audience?: string; scope?: string };

export const useApi = (authOptions?: AuthOptions) => {
  return useProtected(
    async (authHeaders, state, _args?: ApiCallArgs) => {
      const { url, fetchOptions } = _args as ApiCallArgs;
      const res = await fetch(url, {
        ...fetchOptions,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions?.headers,
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
      scope: authOptions?.scope,
    }
  );
};

export interface ProtectedCallState {
  error?: string;
  isLoading: boolean;
  data?: any;
}

export type ProtectedCallHandle<T> = ProtectedCallState & {
  refresh: (args?: T) => void;
};

export type ProtectedCall<T> = (
  authHeader: { Authorization: string },
  state: ProtectedCallState,
  args?: T
) => Promise<void>;

export const useProtected = <T,>(
  fn: ProtectedCall<T>,
  options: AuthOptions
): ProtectedCallHandle<T> => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<ProtectedCallState>({
    error: undefined,
    isLoading: false,
    data: undefined,
  });
  const [refreshState, setRefreshState] = useState<{
    count: number;
    args?: T;
  }>({ count: 0 });

  useEffect(() => {
    (async () => {
      try {
        console.log(0);
        const { audience, scope } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });
        if (refreshState.count === 0) {
          return;
        }
        await fn(
          { Authorization: `Bearer ${accessToken}` },
          state,
          refreshState.args
        );
        console.log(1);
        setState({
          ...state,
          isLoading: false,
        });
      } catch (error: any) {
        setState({
          ...state,
          error,
          isLoading: false,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshState.count]);
  return {
    ...state,
    refresh: (args?: T) => {
      setRefreshState({ count: refreshState.count + 1, args });
      state.isLoading = true;
    },
  };
};
