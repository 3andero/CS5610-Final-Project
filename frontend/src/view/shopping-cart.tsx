import {
  Box,
  Button,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/system";
import { CartBox } from "components/cart-img-box";
import { CartTitle } from "components/cart-title";
import { appConfig } from "config";
import { useContext } from "react";
import { AppContext } from "../app-context";
import { CheckOutView } from "./check-out";
import { useApi } from "./protected/serverApi";

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
  const handle = useApi<CartItem>();
  const context = useContext(AppContext);
  const theme = useTheme();
  const postOrder = {
    url: `${appConfig.API_SERVER_DOMAIN}order`,
    fetchOptions: {
      method: "POST",
      body: JSON.stringify(context.cartState.map(item => ({
        product_id: item._id,
        quantity: item.quantity
      }))),
    }
  };
  return (
    <Box>
      <CartTitle />
      <Stack
        sx={{
          marginRight: 1,
          marginLeft: 1,
        }}>
        {context.cartState
          .map((item, i, t) => (
            <CartBox item={item} i={i} divider={i !== (t.length - 1)} key={item._id} />
          ))}
        <Box
          sx={{
            marginRight: 2,
            marginLeft: 1,
            marginTop: 20,
          }} />
      </Stack>

      <Box display="flex" flexDirection="column" position="fixed" bottom="0"
        justifyContent="center" sx={{
          width: 360, backdropFilter: "saturate(180%) blur(30px)",
          background: alpha(theme.palette.background.default, 0.85),
        }} >
        <Button onClick={() => { context.setCartState([]) }} variant="text"><Typography color={"primary"}>Delete All</Typography></Button>
        <Button onClick={() => {
          console.log(context.cartState);

          handle.refresh?.(postOrder);
        }}>
          <Typography color={"primary"}>Check out</Typography>
        </Button>
      </Box>

    </Box>
  );
};
