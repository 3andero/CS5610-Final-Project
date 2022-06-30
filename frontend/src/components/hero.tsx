import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@mui/material";
import Container from "components/Container";
import { LinkedButton } from "components/linked-button";
import { ClippedShowcaseLayout } from "./clipped-showcase-layout";

const Hero = (): JSX.Element => {
  const theme = useTheme();
  const mdHeight = "40em";
  return (
    <ClippedShowcaseLayout
      blurBackground
      clipPath={"polygon(0 0, 100% 0, 80% 100%, 0% 100%)"}
      attach={{ left: 0 }}
      descriptiveElementSize={{ width: { md: "55vw" }, height: mdHeight }}
      descriptiveElement={
        <Container paddingLeft={{ md: "3em" }} paddingRight={{ md: "10em" }}>
          <Box marginBottom={2}>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              <Typography
                color={"primary"}
                component={"span"}
                variant={"inherit"}
                sx={{
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                The Gen2D store
                <br />
              </Typography>
              for Generation 2D.
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
              Genshin Impact offer till the end of June. All 1/7 scale figures
              at maximum:
            </Typography>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ fontWeight: 700, color: colors.red[400] }}
            >
              $399.95
            </Typography>
            <Box
              component={LinkedButton}
              variant="contained"
              color="primary !important"
              size="large"
              height={54}
              marginTop={2}
              to={"/shop"}
            >
              Discover the offer
            </Box>
          </Box>
          <Box
            paddingX={2}
            paddingY={1}
            bgcolor={"alternate.dark"}
            borderRadius={2}
            maxWidth={"max-content"}
          >
            <Typography variant="body1" component="p">
              redeem 6000 <em>fate points</em> with purchase of select
              products.*
            </Typography>
          </Box>
        </Container>
      }
      backgroundElement={
        <Box
          component={"img"}
          height={{ xs: "30vh", md: mdHeight }}
          width={{ xs: "120vw", md: "60vw" }}
          marginLeft={"auto"}
          sx={{
            objectFit: "cover",
          }}
          src={
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6c96f8d7-a2e2-467c-a8a0-9e9c2ec191cf/df2di95-a98c9908-83ad-4f31-9b53-a91efe55c722.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZjOTZmOGQ3LWEyZTItNDY3Yy1hOGEwLTllOWMyZWMxOTFjZlwvZGYyZGk5NS1hOThjOTkwOC04M2FkLTRmMzEtOWI1My1hOTFlZmU1NWM3MjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WVm5u4PohaCB4Wzx7T9Cz-ONkf0HFLhY3o_BivIRkEY"
          }
          alt="genshin impact Raiden Shogun and Yae Miko"
        />
      }
    />
  );
};

export default Hero;
