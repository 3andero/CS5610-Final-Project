import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CartItem } from "view/shopping-cart";
import { useContext } from "react";
import { useApi } from "view/protected/serverApi";
import { appConfig } from "config";
import { useNavigate } from "react-router-dom";
import { CartContext } from "context/shopping-cart-context";

export const SummaryBox = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const context = useContext(CartContext);
  const handle = useApi<CartItem>();

  const price = context.cartState.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const total_price = price * (1 + 0.2);

  return (
    <Box>
      {context.cartState.map((item, i) => (
        <Box key={i}>
          <Box display={"flex"}>
            <Box
              component={"img"}
              src={item.image}
              alt={item.name}
              sx={{
                borderRadius: 2,
                maxWidth: 80,
                maxHeight: 120,
                marginRight: 2,
                filter:
                  theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
              }}
            />
            <Box
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              width={1}
            >
              <Box width={0.7}>
                <Typography fontWeight={700} variant={"subtitle2"}>
                  {item.name}
                </Typography>
                <Typography color={"text.secondary"} variant={"subtitle2"}>
                  Amount: {item.quantity}
                </Typography>
                <Typography
                  color={"text.secondary"}
                  variant={"subtitle2"}
                  noWrap={true}
                >
                  Code: {item._id}
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={700} variant={"subtitle2"}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider
            sx={{
              marginY: { xs: 2, sm: 4 },
              display: i === context.cartState.length - 1 ? "none" : "block",
            }}
          />
        </Box>
      ))}
      <Box
        component={"form"}
        noValidate
        autoComplete="off"
        sx={{
          marginY: 4,
          "& .MuiInputBase-input.MuiOutlinedInput-input": {
            bgcolor: "background.paper",
          },
        }}
      >
        <Box display="flex">
          <Box
            flex={"1 1 auto"}
            component={TextField}
            label="Discount code"
            variant="outlined"
            color="primary"
            fullWidth
            height={54}
            maxWidth={300}
          />
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            height={54}
            marginLeft={1}
            width={1}
            flex={1}
          >
            Apply
          </Box>
        </Box>
      </Box>
      <Stack spacing={2} marginY={{ xs: 2, sm: 4 }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>Subtotal</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            ${price.toFixed(2)}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>Discount</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            -$0.00
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>VAT (+20%)</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            ${(total_price - price).toFixed(2)}
          </Typography>
        </Box>
        <Divider />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant={"h6"} fontWeight={700}>
            Order total
          </Typography>
          <Typography variant={"h6"} fontWeight={700}>
            ${total_price.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant={"contained"}
          size={"large"}
          fullWidth
          onClick={() => {
            handle.refresh?.({
              url: `${appConfig.API_SERVER_DOMAIN}order`,
              fetchOptions: {
                method: "POST",
                body: JSON.stringify(
                  context.cartState.map((item) => ({
                    product_id: item._id,
                    quantity: item.quantity,
                  }))
                ),
              },
              callback: () => {
                navigate("/order-complete");
                window.location.reload();
              },
            });
          }}
        >
          Place an order
        </Button>
      </Stack>
    </Box>
  );
};
