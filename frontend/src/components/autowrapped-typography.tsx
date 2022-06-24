import { Tooltip, Typography, TypographyProps } from "@mui/material";

export const AutoWrappedTypography = ({
  text,
  lineClamp = 2,
  sx,
  ...rest
}: { text: string; lineClamp?: number } & Omit<
  TypographyProps,
  "children"
>) => {
  return (
    <Tooltip title={text}>
      <Typography
        sx={{
          lineClamp,
          WebkitLineClamp: lineClamp,
          wordBreak: "break-all",
          display: "-webkit-box",
          overflow: "hidden",
          boxOrient: "vertical",
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
          justifyContent: "center",
          ...sx,
        }}
        {...rest}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};
