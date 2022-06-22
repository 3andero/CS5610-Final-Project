import {
  Box,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/system";
import { CartBox } from "components/cart-img-box";
import { CartTitle } from "components/cart-title";
import { useContext } from "react";
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
            <CartBox item={item} i={i} divider={i !== (t.length - 1)} />
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
        <Button>Delete All</Button>
        <Button>Check Out</Button>
      </Box>
    </Box>
  );
};
