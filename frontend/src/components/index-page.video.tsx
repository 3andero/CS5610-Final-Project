import { Box, Typography, useTheme } from "@mui/material";
import { ClippedShowcaseLayout } from "./clipped-showcase-layout";

import GenshinLogo from "./genshin.logo";

const IndexVideoSection = (): JSX.Element => {
  const theme = useTheme();
  const fontConfig = {
    fontSize: { xs: "5vw", md: "3vw", lg: "2.2em" },
    fontFamily: "h2.fontFamily",
    fontWeight: 700,
    color: "text.primary",
  };
  return (
    <ClippedShowcaseLayout
      blurBackground
      clipPath={"polygon(30% 0, 100% 0, 100% 100%, 0 100%)"}
      attach={{ right: 0 }}
      descriptiveElementSize={{
        width: { md: "35vw", lg: "30em" },
        height: "40vh",
      }}
      backgroundElement={
        <Box
          component={"video"}
          width={"100vw"}
          height={{ md: "40vh" }}
          sx={{
            objectFit: "cover",
          }}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline
        >
          <source
            src="https://ww1.gen2d.store/genshin_banner.mp4"
            type="video/mp4"
          />
          <source
            src="https://ww1.gen2d.store/genshin_banner.mp4"
            type="video/webm"
          />
          <source
            src="https://ww1.gen2d.store/genshin_banner.mp4"
            type="video/ogg"
          />
          Your browser do not support HTML5 video.
        </Box>
      }
      descriptiveElement={
        <Box
          margin={{xs: "1em", md:"0.5em 0.7em"}}
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            justifyContent: "center",
            gap: { xs: "3vw", md: 0 },
          }}
        >
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection={"column"}
          >
            <Typography
              component={"span"}
              {...fontConfig}
              textAlign={{ md: "right" }}
              alignSelf={{ md: "flex-end" }}
              sx={{
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              See More in
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} alignSelf={"flex-end"}>
            <Box
              alignSelf={{ md: "flex-end" }}
              width={{ xs: "20vw", md: "14vw", lg: "14em" }}
            >
              <GenshinLogo />
            </Box>
            <Typography {...fontConfig} margin={0}>
              Featured Section.
            </Typography>
            {/* <Box display={{md: "block", lg: "none"}}>MD</Box> */}
          </Box>
        </Box>
      }
    />
  );
};

export default IndexVideoSection;
