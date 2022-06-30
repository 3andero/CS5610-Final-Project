import { Box, Typography } from "@mui/material";
import Typed from "react-typed";

const ShopPageHero = () => {
  return (
    <Box>
      <Box marginBottom={{ md: 4 }}>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align={"center"}
          gutterBottom
          sx={{ fontWeight: 400 }}
        >
          The Gen2D store for generation 2D.
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
          align={"center"}
          sx={{
            fontWeight: 700,
          }}
          minHeight={"2.5em"}
        >
          We get{" "}
          <Typed
            strings={[
              "the best figurines",
              "the best price",
              "what you're looking for",
            ]}
            typeSpeed={100}
            loop={true}
            backSpeed={50}
            backDelay={1500}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default ShopPageHero;
