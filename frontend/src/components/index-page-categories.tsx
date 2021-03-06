import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import GenshinLogo from "./genshin.logo";
import JujutsuLogo from "./jujutsu.logo";
import BluRayLogo from "./blu-ray.logo";
import XBoxLogo from "./xbox.logo";

const mock = [
  {
    title: "鬼滅の刃",
    icon: (
      <Box
        sx={{
          position: "relative",
          top: "0.4em",
        }}
      >
        <Box
          component={"img"}
          height={64}
          width={64}
          sx={{
            objectFit: "cover",
            objectPosition: "40% 0",
          }}
          src={
            "https://ninjalathegame.com/_materials/img/news/info/collab-kimetsu/sticker-img01.png"
          }
          alt={"鬼滅の刃"}
        />
      </Box>
    ),
  },
  {
    title: "原神",
    icon: (
      <Box
        sx={{
          position: "relative",
          top: "2em",
        }}
      >
        <Box height={80} width={80}>
          <GenshinLogo />
        </Box>
      </Box>
    ),
  },
  {
    title: "呪術廻戦",
    icon: (
      <Box
        sx={{
          position: "relative",
          top: "1.5em",
        }}
      >
        <Box height={110} width={110}>
          <JujutsuLogo />
        </Box>
      </Box>
    ),
  },
  {
    title: "Figures",
    icon: (
      <Box
        sx={{
          position: "relative",
          top: "1em",
        }}
      >
        <Box
          component={"img"}
          height={64}
          width={"auto"}
          src={
            "https://static.wikia.nocookie.net/piapro-studio/images/2/23/Img_illust_mikunt.png"
          }
          alt={"figures: Hatsune Miku"}
        />
      </Box>
    ),
  },
  {
    title: "Blu-rays",
    icon: (
      <Box
        sx={{
          position: "relative",
          top: "2.3em",
        }}
      >
        <Box height={90} width={90}>
          <BluRayLogo />
        </Box>
      </Box>
    ),
  },
  {
    title: "Games",
    icon: (
      <Box
        sx={{
          position: "relative",
          top: "-0.3em",
        }}
      >
        <Box height={48} width={48}>
          <XBoxLogo />
        </Box>
      </Box>
    ),
  },
];

const IndexPageCategories = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
          gutterBottom
          color={theme.palette.mode === "light" ? "primary" : "secondary"}
          align={"center"}
        >
          Categories
        </Typography>
        <Typography
          variant="h4"
          align={"center"}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Choose your Anime Merch by categories
        </Typography>
        <Typography
          variant="h6"
          component={"p"}
          align={"center"}
          color={"text.secondary"}
        >
          Buy Your Favorite Figures & BLU-RAYS Online:
          <br />
          Securely and Comfortably
        </Typography>
        <Box marginTop={2} display={"flex"} justifyContent={"center"}>
          <Button variant="contained" color="primary" size="large">
            See all categories
          </Button>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={4}>
          {mock.map((item, i) => (
            <Grid item xs={6} md={2} key={i}>
              <Box
                display={"block"}
                width={1}
                height={1}
                sx={{
                  textDecoration: "none",
                  transition: "all .2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  component={Card}
                  padding={4}
                  width={1}
                  height={1}
                  bgcolor={"alternate.main"}
                >
                  <Box
                    position={"relative"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Box
                      width={60}
                      height={60}
                      bgcolor={"secondary.dark"}
                      borderRadius={"100%"}
                      sx={{
                        marginTop: 2,
                      }}
                    />
                    <Box
                      sx={{
                        color: "primary.dark",
                        position: "absolute",
                        bottom: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Box>
                  <Typography
                    component={"p"}
                    variant={"subtitle1"}
                    align={"center"}
                    sx={{ fontWeight: 500, marginTop: 2 }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default IndexPageCategories;
