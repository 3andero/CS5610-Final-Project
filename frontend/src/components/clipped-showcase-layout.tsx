import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/system";
import React from "react";

export const ClippedShowcaseLayout = ({
  backgroundElement,
  descriptiveElement,
  attach,
  clipPath,
  blurBackground,
  descriptiveElementSize,
}: {
  backgroundElement: React.ReactNode;
  descriptiveElement: React.ReactNode;
  attach: { left?: number; right?: number };
  clipPath: string;
  blurBackground?: boolean;
  descriptiveElementSize?: { width: any; height: string | number };
}) => {
  const theme = useTheme();
  return (
    <Box width="100vw" overflow={"hidden"}>
      <Box display={"flex"} flexDirection={{ xs: "column-reverse", md: "row" }}>
        <Box
          display={"flex"}
          zIndex={{ md: 100 }}
          position={{ md: "absolute" }}
          {...attach}
          width={{ xs: "100%", ...descriptiveElementSize?.width }}
          height={{ md: descriptiveElementSize?.height }}
          bgcolor={"alternate.main"}
          justifyContent={{ md: "center" }}
          flexDirection={"column"}
          sx={{
            clipPath: { md: clipPath },
            ...(blurBackground && {
              backdropFilter: { md: "saturate(180%) blur(30px)" },
              background: { md: alpha(theme.palette.alternate.main, 0.9) },
            }),
          }}
        >
          {descriptiveElement}
        </Box>
        {backgroundElement}
      </Box>
    </Box>
  );
};
