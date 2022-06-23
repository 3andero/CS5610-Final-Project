import { Box, Typography, useTheme } from "@mui/material";

import Container from "./Container";
import GenshinLogo from "./genshin.logo";

const IndexVideoSection = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          width: 1,
          height: 1,
        },
      }}
    >
      <Box
        component={"video"}
        width={"100vw"}
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
      <Box
        zIndex={100}
        position={"absolute"}
        right={0}
        width={"27vw"}
        height={"100%"}
        bgcolor={"alternate.main"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        sx={{
          textAlign: "right",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)",
          //   backdropFilter: "saturate(180%) blur(30px)",
          //   background: alpha(theme.palette.alternate.main, 0.9),
        }}
      >
        <Container paddingRight={"1em"}>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ fontWeight: 700, display: "flex", flexDirection: "column" }}
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
              See More in
            </Typography>
            <Box width={"5em"} alignSelf={"flex-end"}>
              <GenshinLogo />
            </Box>
            Featured Section.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default IndexVideoSection;
