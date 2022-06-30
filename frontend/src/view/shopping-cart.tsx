import { Box, Button, Stack, Typography } from "@mui/material";
import { CartBox } from "components/cart-img-box";
import { CartTitle } from "components/cart-title";
import Container from "components/Container";
import { CartContext } from "context/shopping-cart-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/general-context";

export interface CartItem {
  _id: string;
  price: number;
  name: string;
  image: string;
  quantity: number;
}

export const CART_QUANTITY_LIMIT = 9;

export const ShoppingCartView = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const context = useContext(GeneralContext);
  return (
    <Container display={{ xs: "block", md: "contents" }}>
      <Box display={"flex"} flexDirection="column" height={"100%"}>
        <CartTitle />
        <Stack
          sx={{
            marginRight: 1,
            marginLeft: 1,
          }}
        >
          {cartContext.cartState.map((item, i, t) => (
            <CartBox item={item} divider={i !== t.length - 1} key={item._id} />
          ))}
        </Stack>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{
            width: "100%",
            marginTop: "auto",
            paddingY: "1em",
          }}
        >
          <Button
            fullWidth
            onClick={() => {
              cartContext.setCartState([]);
            }}
            variant="text"
          >
            <Typography
              color={context.colorMode === "dark" ? "secondary" : "primary"}
            >
              Delete All
            </Typography>
          </Button>
          <Button
            fullWidth
            onClick={() => {
              navigate("/order");
              context.toggleShoppingCart();
            }}
          >
            <Typography
              color={context.colorMode === "dark" ? "secondary" : "primary"}
            >
              Check out
            </Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
