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
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>{msg}</Typography>
      <Box p={5} alignContent="center">
        <Button variant="outlined" onClick={onClick}>
          {buttonMsg}
        </Button>
      </Box>
    </Box>
  );
};

export const FurtherAction = <T, TData>({
  protectedCallHandle: { refresh, error, isLoading },
  children,
  refreshArgs,
  activated = true,
}: {
  protectedCallHandle: ProtectedCallHandle<T, TData>;
  children?: React.ReactNode;
  refreshArgs?: T;
  activated?: boolean
}): JSX.Element => {
  const { loginWithPopup, getAccessTokenWithPopup } = useAuth0();
  return (
    (activated && ((error === undefined && isLoading && (
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
      )))) || <>{children}</>
  );
};

export type ApiCallArgs = {
  url: string;
  fetchOptions: Parameters<typeof fetch>[1];
  callback?: () => void;
};

type AuthOptions = { audience?: string; scope?: string };

export const useApi = <TData = any>(authOptions?: AuthOptions) => {
  return useProtected<ApiCallArgs, TData>(
    async (authHeaders, state, _args) => {
      const { url, fetchOptions, callback } = _args as ApiCallArgs;
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
      callback?.();
    },
    {
      audience: appConfig.AUDIENCE,
      scope: authOptions?.scope,
    }
  );
};

export interface ProtectedCallState<TData> {
  error?: string;
  isLoading: boolean;
  data?: TData;
}

export type ProtectedCallHandle<T, TData> = ProtectedCallState<TData> & {
  refresh: (args?: T) => void;
};

export type ProtectedCall<T, TData = any> = (
  authHeader: { Authorization: string },
  state: ProtectedCallState<TData>,
  args?: T
) => Promise<void>;

export const useProtected = <T, TData = any>(
  fn: ProtectedCall<T, TData>,
  options: AuthOptions,
): ProtectedCallHandle<T, TData> => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<ProtectedCallState<TData>>({
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
        const _token = `Bearer ${accessToken}`;
        // console.log(_token);
        await fn({ Authorization: _token }, state, refreshState.args);
        console.log(1);
        setState({
          ...state,
          isLoading: false,
        });
      } catch (error: any) {
        console.log(error);
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
