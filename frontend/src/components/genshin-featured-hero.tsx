import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material";

export const GenshinFeaturedHero = (): JSX.Element => {
  const theme = useTheme();
  const Headline = () => (
    <Box>
      <Typography
        variant="h3"
        align={"center"}
        gutterBottom
        sx={{
          fontWeight: 900,
          background:
            theme.palette.mode === "light"
              ? "url(https://img.freepik.com/free-photo/bright-cosmic-background-with-realistic-nebula-shining-stars-stardust-design-text_213524-430.jpg)"
              : "url(https://upload-os-bbs.mihoyo.com/upload/2020/04/27/1015537/695d4c85936294f80ac912bbc5649214_2791369916785864951.png)",
          backgroundClip: "text",
          backgroundPosition: "50% 10%",
          color: "transparent",
        }}
      >
        Step Into a Vast Magical World of Adventure
      </Typography>
      <Typography
        variant="h6"
        component="p"
        color="text.secondary"
        align={"center"}
        sx={{
          fontWeight: 400,
        }}
      >
        Genshin Impact is an open-world action RPG. In the game, set forth on a
        journey across a fantasy world called Teyvat.
      </Typography>
    </Box>
  );

  const Logos = () => (
    <Box display="flex" flexWrap="wrap" justifyContent={"center"}>
      {[
        "https://static.wikia.nocookie.net/gensin-impact/images/2/2c/Element_Pyro.svg",
        "https://static.wikia.nocookie.net/gensin-impact/images/8/80/Element_Hydro.svg",
        "https://static.wikia.nocookie.net/gensin-impact/images/1/10/Element_Anemo.svg",
        "https://static.wikia.nocookie.net/gensin-impact/images/f/ff/Element_Electro.svg",
        "https://static.wikia.nocookie.net/gensin-impact/images/7/73/Element_Dendro.svg",
        "https://static.wikia.nocookie.net/gensin-impact/images/7/72/Element_Cryo.svg",
        "https://static.wikia.nocookie.net/gensin-impact/images/9/9b/Element_Geo.svg",
      ].map((item, i) => (
        <Box maxWidth={80} marginTop={2} marginRight={4} key={i}>
          <Box component="img" height={1} width={1} src={item} alt="..." />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent={"center"}
          >
            <Headline />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent={"center"}
          >
            <Logos />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
