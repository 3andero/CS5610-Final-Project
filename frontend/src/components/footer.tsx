import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LinkedButton } from "./linked-button";
import Typography from "@mui/material/Typography";
import { TitleComponent } from "./title";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";

const Footer = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid container spacing={2} paddingX={{ md: "2em" }}>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={1}
          gap={{ xs: "0.5em", md: 0 }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Link to="/">
            <TitleComponent variant={"h4"} />
          </Link>
          <Box display="flex" flexWrap={"wrap"} alignItems={"center"}>
            <Box marginTop={1} marginRight={2}>
              <LinkedButton to="/">Home</LinkedButton>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <LinkedButton to="/shop">Shop</LinkedButton>
            </Box>
            <Box marginTop={1}>
              <LinkedButton
                to="/profile"
                variant="outlined"
                color={theme.palette.mode === "light" ? "primary" : "secondary"}
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "secondary.main",
                }}
              >
                Join Now
              </LinkedButton>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          component={"span"}
          align={"center"}
          variant={"subtitle2"}
          color="text.secondary"
          gutterBottom
        >
          &copy; Gen2D, 2022. All rights reserved
        </Typography>
        <Typography
          align={"center"}
          variant={"caption"}
          color="text.secondary"
          component={"p"}
        >
          When you visit or interact with our sites, services or tools, we or
          our authorised service providers may use cookies for storing
          information to help provide you with a better, faster and safer
          experience and for marketing purposes.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
