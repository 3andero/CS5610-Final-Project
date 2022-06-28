import { createContext, useState } from "react";
import { PaletteMode } from "@mui/material";
import { CartItem } from "../view/shopping-cart";

const CartStateHook = () => useState<CartItem[]>([]);

type cartT = ReturnType<typeof CartStateHook>;

const defaultContext = {
  sidebarStatus: false,
  toggleSidebar: () => {},
  toggleColorMode: () => {},
  shoppingCartStatus: false,
  toggleShoppingCart: () => {},
  colorMode: "light" as PaletteMode,
  cartState: [] as cartT[0],
  setCartState: (() => {}) as cartT[1],
};

export type GeneralContextDef = typeof defaultContext;

export const GeneralContext = createContext(defaultContext);
