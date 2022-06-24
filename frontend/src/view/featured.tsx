import React, { ReactNode, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

import Container from "components/Container";
import { GenshinFeaturedHero } from "components/genshin-featured-hero";
import { Typography } from "@mui/material";

const StyledJarallaxBox = styled(Box)<{ img: string }>(({ theme, img }) => ({
  filter: theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
  position: "absolute",
  objectFit: "cover",
  /* support for plugin https://github.com/bfred-it/object-fit-images */
  fontFamily: "object-fit: cover;",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundImage: `url(${img})`,
}));

const JarallaxImage = ({
  img,
  children,
  scrollTo,
}: {
  img: string;
  children: React.ReactNode;
  scrollTo?: boolean;
}) => {
  return (
    <Box
      className={"jarallax"}
      data-jarallax
      data-speed="0.2"
      position={"relative"}
      minHeight={"100vh"}
      display={"flex"}
      alignItems={"center"}
      {...(scrollTo && { id: "agency__portfolio-item--js-scroll" })}
    >
      <StyledJarallaxBox className={"jarallax-img"} img={img} />
      <Container>{children}</Container>
    </Box>
  );
};

const SectionDescription = ({ children }: { children?: ReactNode }) => {
  return (
    <Box
      minHeight={"100vh"}
      display={"flex"}
      alignItems={"center"}
      bgcolor={"alternate.main"}
    >
      {children}
    </Box>
  );
};

const views: {
  section?: ReactNode;
  images?: [string, ReactNode?][];
}[] = [
  {
    images: [
      [
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/genshin-impact/4/49/Mondstadt_Region_Overview.png",
        <Container>
          <Typography textAlign={"center"}>123</Typography>
        </Container>,
      ],
      [
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/genshin-impact/e/e3/Inazuma_Region_Overview.png",
      ],
    ],
  },
  {
    section: <>Section1</>,
    images: [
      ["https://i.redd.it/b9x7mvx5mng61.png"],
      ["https://images2.alphacoders.com/117/1175591.png"],
    ],
  },
  {
    section: <>Section2</>,
    images: [
      ["https://images5.alphacoders.com/117/1175581.jpg"],
      ["https://images7.alphacoders.com/116/1161810.jpg"],
    ],
  },
  {
    section: <>Section3</>,
  },
];

export const FeaturedView = (): JSX.Element => {
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll(".jarallax");
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import("jarallax");
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  const scrollTo = (id: string): void => {
    setTimeout(() => {
      const element: HTMLElement | null = document.querySelector(`#${id}`);
      if (!element) {
        return;
      }
      window.scrollTo({ left: 0, top: element.offsetTop, behavior: "smooth" });
    });
  };

  return (
    <>
      <Box
        minHeight={"100vh"}
        display={"flex"}
        alignItems={"center"}
        bgcolor={"alternate.main"}
        marginTop={-13}
        paddingTop={13}
      >
        <Container>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <GenshinFeaturedHero />
            <Box marginTop={4}>
              <Box
                component={"svg"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width={{ xs: 30, sm: 40 }}
                height={{ xs: 30, sm: 40 }}
                onClick={() => scrollTo("agency__portfolio-item--js-scroll")}
                sx={{ cursor: "pointer" }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      {views.map((item, i) => (
        <Box key={i}>
          {item.section && (
            <SectionDescription>{item.section}</SectionDescription>
          )}
          {item.images?.map((img, j) => (
            <JarallaxImage img={img[0]} key={j} scrollTo={i === 0 && j === 0}>
              {img[1]}
            </JarallaxImage>
          ))}
        </Box>
      ))}
    </>
  );
};
