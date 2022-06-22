import { Box } from "@mui/material";
import Container from "components/Container";
import Hero from "components/hero";
import IndexPageCategories from "components/index-page-categories";

export const IndexPageView = () => {
  return (
    <Box>
      <Hero />
      <Container>
        <IndexPageCategories />
      </Container>
    </Box>
  );
};
