import Box from "@mui/material/Box";

type BoxProps = Parameters<typeof Box>[0];

const Container = ({ children, ...rest }: BoxProps): JSX.Element => (
  <Box
    maxWidth={{ sm: 720, md: 1236 }}
    width={1}
    margin={"0 auto"}
    paddingX={2}
    paddingY={{ xs: 4, sm: 6, md: 8 }}
    {...rest}
  >
    {children as any}
  </Box>
);

export default Container;
