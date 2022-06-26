import { Box, Link } from "@mui/material";
import Container from "components/Container";
import Hero from "components/hero";
import IndexPageCategories from "components/index-page-categories";
import IndexVideoSection from "components/index-page.video";

export const IndexPageView = () => {
  return (
    <Box>
      <Hero />
      <Container>
        <IndexPageCategories />
      </Container>
      <Link
        href="/featured"
        sx={{
          textDecoration: "none",
          margin: 0,
        }}
      >
        <IndexVideoSection />
      </Link>
    </Box>
  );
};
