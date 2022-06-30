import {
  Box, Typography,
} from "@mui/material";

export const CartTitle = () => {

  return (
    <Typography
      fontWeight={200}
      variant={"h4"}
      textAlign={"center"}
      sx={{
        padding: "1em",
        marginBottom: "0.5em",
        bgcolor: "background.default",
      }}
    >
      Shopping Cart
    </Typography>

  );
};