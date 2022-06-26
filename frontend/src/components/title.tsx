import { Typography, useTheme } from "@mui/material";

// https://codepen.io/markmead/pen/YjQKeZ
const TitleComponent1 = ({
  variant = "h2",
}: {
  variant?: Parameters<typeof Typography>[0]["variant"];
}) => {
  const theme = useTheme();
  return (
    <Typography
      variant={variant}
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
const TitleComponent2 = ({
  variant = "h3",
}: {
  variant?: Parameters<typeof Typography>[0]["variant"];
}) => {
  const text = "'Gen2D'";
  const pathAfter = "polygon(0 60%, 100% 80%, 100% 100%, 0% 100%)";
  const pathBefore = "polygon(0 60%, 100% 80%, 100% 0, 0 0)";
  return (
    <Typography
      variant={variant}
      fontWeight={900}
      letterSpacing={5}
      sx={{
        position: "relative",
        textTransform: "uppercase",
        color: "transparent",
        fontFamily: "'Poppins', sans-serif",
        fontStyle: "italic",
        paddingX: "0.5em",
        ":after": {
          content: text,
          position: "absolute",
          left: "0px",
          top: "0px",
          color: "background.default",
          WebkitClipPath: pathAfter,
          clipPath: pathAfter,
          bgcolor: "text.primary",
          paddingX: "0.5em",
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
