import { Box, Button, Stack, Typography } from "@mui/material";
import { CartBox } from "components/cart-img-box";
import { CartTitle } from "components/cart-title";
import Container from "components/Container";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../app-context";

export interface CartItem {
  _id: string;
  price: number;
  name: string;
  image: string;
  quantity: number;
  is_available: boolean;
  description: string;
}

export const ShoppingCartView = () => {
  // const [quant, setQuant] = useState<number>(1);
  const navigate = useNavigate();
  const context = useContext(AppContext);
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
          {context.cartState.map((item, i, t) => (
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
              context.setCartState([]);
            }}
            variant="text"
          >
            <Typography color={"primary"}>Delete All</Typography>
          </Button>
          <Button
            fullWidth
            onClick={() => {
              navigate("/order");
              context.toggleShoppingCart();
            }}
          >
            <Typography color={"primary"}>Check out</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
