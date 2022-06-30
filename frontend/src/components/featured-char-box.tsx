import { Typography, Box, SxProps } from "@mui/material";
import { LinkedButton } from "./linked-button";

export const CharBox = ({
  text,
  to,
  buttonText,
  sx,
}: {
  text: string;
  to: string;
  buttonText?: string;
  sx?: SxProps;
}) => {
  return (
    <Box
      maxWidth={{ xs: 200, md: 600 }}
      maxHeight={800}
      display={"flex"}
      flexDirection={"column"}
      overflow={"hidden"}
      color="white"
      sx={sx}
    >
      <Typography
        sx={{
          fontFamily: "h2.fontFamily",
          fontSize: { xs: "h4.fontSize", md: "h2.fontSize" },
          lineHeight: "1.2em",
        }}
        align="left"
      >
        {text}
      </Typography>
      <LinkedButton
        to={to}
        variant="outlined"
        color="inherit"
        sx={{ color: "white", marginY: "2em" }}
        fullWidth
      >
        <Typography fontSize={{ xs: "h5.fontSize", md: "h3.fontSize" }}>
          {buttonText || "Buy Now"}
        </Typography>
      </LinkedButton>
    </Box>
  );
};

export const CountryName = ({
  country,
  marginLeft = 60,
}: {
  country: string;
  marginLeft: number;
}) => {
  return (
    <Box display={"flex"} sx={{ justifyContent: "center" }}>
      <Typography textAlign={"center"} fontWeight={700} variant={"h1"} color="white">
        {country}
      </Typography>
    </Box>
  );
};
