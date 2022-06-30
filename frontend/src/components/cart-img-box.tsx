import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { CartContext } from "context/shopping-cart-context";
import { useContext } from "react";
import { CartItem } from "view/shopping-cart";
import { AutoWrappedTypography } from "./autowrapped-typography";

export const MiniProductImage = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return (
    <Box
      component={"img"}
      src={image}
      alt={name}
      sx={{
        borderRadius: 2,
        width: 1,
        height: 1,
        maxWidth: 72,
        marginRight: 2,
        marginLeft: 1,
        marginY: 1,
      }}
    />
  );
};

export const CartBox = ({
  item,
  divider,
}: {
  item: CartItem;
  divider: boolean;
}) => {
  const context = useContext(CartContext);
  return (
    <Box>
      <Box display={"flex"}>
        <MiniProductImage name={item.name} image={item.image} />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems="center"
          width={0.7}
        >
          <Box sx={{ order: 1, flexWrap: "wrap" }} maxWidth={0.4}>
            <AutoWrappedTypography
              fontWeight={700}
              variant={"body2"}
              text={item.name}
              lineClamp={3}
            />

            {/* <Typography
              color={'text.secondary'}
              variant={'body2'}
              gutterBottom
            >
              Size:{' '}
              <Typography
                variant={'inherit'}
                component={'span'}
                color={'inherit'}
                fontWeight={700}
              >
                {item.variant}
              </Typography>
            </Typography>
            <Typography
              color={'text.secondary'}
              variant={'body2'}
              gutterBottom
            >
              Gender:{' '}
              <Typography
                variant={'inherit'}
                component={'span'}
                color={'inherit'}
                fontWeight={700}
              >
                {item.gender}
              </Typography>
            </Typography> */}
            <Typography
              color={"text.secondary"}
              variant={"body2"}
              noWrap={true}
              gutterBottom
            >
              Code:{" "}
              <Typography
                variant={"inherit"}
                component={"span"}
                color={"inherit"}
                fontWeight={700}
                width={"10px"}
                noWrap={true}
              >
                {item._id}
              </Typography>
            </Typography>
          </Box>
          <Stack
            spacing={1}
            direction={{ xs: "row", sm: "column" }}
            marginTop={{ xs: 2, sm: 0 }}
            sx={{ order: { xs: 3, sm: 2 } }}
          >
            <Box
              component={"svg"}
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              marginRight={0.5}
              onClick={(event: any) => {
                event.preventDefault();
                context.setCartState(
                  context.cartState.filter(
                    (cartItem) => cartItem._id !== item._id
                  )
                );
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </Box>
            <Box
              component={"svg"}
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              marginRight={0.5}
              onClick={(event: any) => {
                event.preventDefault();
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </Box>
          </Stack>
          <Stack
            spacing={1}
            // direction={'row'}
            alignItems={"center"}
            marginTop={{ xs: 2, sm: 0 }}
            sx={{ order: { xs: 2, sm: 3 } }}
          >
            <FormControl fullWidth>
              <Select
                value={item.quantity}
                sx={{
                  "& .MuiSelect-select": {
                    paddingY: 0.5,
                  },
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <MenuItem
                    key={num}
                    value={num}
                    onClick={() => {
                      context.setCartState(
                        context.cartState.map((cartItem: CartItem) => {
                          if (cartItem._id === item._id) {
                            cartItem.quantity = num;
                          }
                          return cartItem;
                        })
                      );
                    }}
                  >
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography fontWeight={700} marginLeft={2}>
              ${item.price * item.quantity}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Divider
        sx={{
          marginY: { xs: 1, sm: 2 },
          display: divider ? "block" : "none",
        }}
      />
    </Box>
  );
};
