import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/system";
import { CartBox } from "components/cart-img-box";
import { CartTitle } from "components/cart-title";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../app-context";

export interface CartItem {
  [x: string]: any;
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
  const theme = useTheme();
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
        <Button
          onClick={() => {
            navigate("/order");
            context.toggleShoppingCart();
          }}>
          <Typography color={"primary"}>Check out</Typography>
        </Button>
      </Box>

    </Box>
  );
};
