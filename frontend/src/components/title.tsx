import { Typography, useTheme } from "@mui/material";

// https://codepen.io/markmead/pen/YjQKeZ
const TitleComponent1 = () => {
  const theme = useTheme();
  return (
    <Typography
      variant="h2"
      fontWeight={"900"}
      letterSpacing={5}
      sx={{
        // -moz-text-stroke-width: $property;
        WebkitTextStrokeWidth: 2,
        WebkitTextStrokeColor: "#111827",
        color: "transparent",
        textShadow: `0.05em 0.05em ${theme.palette.warning.light}`,
        fontFamily: "'Catamaran',sans-serif",
        textTransform: "uppercase",
      }}
    >
      Gen2D
    </Typography>
  );
};

// https://codepen.io/josephwong2004/pen/pogbrOv
const TitleComponent2 = () => {
  const text = "'Gen2D'";
  const pathAfter = "polygon(0 25%, 100% 65%, 100% 100%, 0% 100%)";
  const pathBefore = "polygon(0 0, 110% 0, 100% 65%, 0 25%)";
  return (
    <Typography
      variant="h2"
      fontWeight={900}
      letterSpacing={5}
      sx={{
        position: "relative",
        textTransform: "uppercase",
        color: "transparent",
        fontFamily: "'Catamaran', sans-serif",
        fontStyle: "italic",
        ":after": {
          content: text,
          position: "absolute",
          left: "-3px",
          top: "-1px",
          color: "background.default",
          WebkitClipPath: pathAfter,
          clipPath: pathAfter,
          bgcolor: "text.primary",
        },
        "&:before": {
          content: text,
          position: "absolute",
          color: "text.primary",
          WebkitClipPath: pathBefore,
          clipPath: pathBefore,
        },
      }}
    >
      Gen2D
    </Typography>
  );
};

export const TitleComponent = TitleComponent2;
