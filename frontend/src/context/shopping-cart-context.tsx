import { useAuth0 } from "@auth0/auth0-react";
import { appConfig } from "config";
import React, { createContext, useEffect, useState } from "react";
import { ProtectedCall, useProtected } from "view/protected/serverApi";
import { CartItem } from "view/shopping-cart";

const CartStateHook = () => useState<CartItem[]>([]);

type cartT = ReturnType<typeof CartStateHook>;

const defaultContext = {
  cartState: [] as cartT[0],
  setCartState: (() => {}) as cartT[1],
};

export type CartContextDef = typeof defaultContext;

export const CartContext = createContext(defaultContext);

interface fetchShoppingCartFnArgs {
  cart?: CartItem[];
  setCart: (...args: any[]) => void;
  method: "GET" | "POST";
}

const fetchShoppingCartFn: ProtectedCall<
  fetchShoppingCartFnArgs,
  CartItem[]
> = async (authHeader, state, args) => {
  const { setCart, method, cart } = args!;
  const url = `${appConfig.API_SERVER_DOMAIN}shopping-cart`;

  let res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
    body:
      method === "GET"
        ? undefined
        : JSON.stringify(
            cart!.map(({ _id, quantity }) => ({ product_id: _id, quantity }))
          ),
  });
  if (res.status >= 200 && res.status <= 299) {
    if (method === "GET") {
      state.data = await res.json();
      console.log("cart get", state.data);
      setCart(state.data);
    }
  } else {
    state.data = undefined;
    state.error = await res.text();
  }
  return;
};

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated } = useAuth0();
  const [fetched, setFetched] = useState(false);
  const [cartState, setCartState] = useState<CartItem[]>([]);
  const handle = useProtected<fetchShoppingCartFnArgs, CartItem[]>(
    fetchShoppingCartFn,
    {
      audience: appConfig.AUDIENCE,
    }
  );
  useEffect(() => {
    if (isAuthenticated) {
      if (!fetched) {
        setFetched(true);
        handle.refresh({ method: "GET", setCart: setCartState });
      } else {
        handle.refresh({
          method: "POST",
          setCart: setCartState,
          cart: cartState,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, cartState]);
  return (
    <CartContext.Provider
      value={{
        cartState,
        setCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
