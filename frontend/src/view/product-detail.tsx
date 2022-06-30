import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { appConfig } from "config";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartItem, CART_QUANTITY_LIMIT } from "./shopping-cart";
import { useTheme } from "@mui/material";
import { modifyCart } from "components/product-grid";
import { CurrencyTypography } from "context/currency-context";
import { CartContext } from "context/shopping-cart-context";
import { SnackBarContext } from "context/snackbar-context";

export type ProductDetailItem = CartItem & {
  is_available: boolean;
  description: string;
};

export const ProductDetail = () => {
  const theme = useTheme();
  const context = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const [productDetail, setProductDetail] = useState<ProductDetailItem>();
  const [region, setRegion] = useState("Canada");
  const [quantity, setQuantity] = useState(1);
  const [manufacturer, setManufacturer] = useState("APEX");
  const snackbarCtx = useContext(SnackBarContext);
  const quantityLimit = 4;
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${appConfig.API_SERVER_DOMAIN}products?_id=${searchParams.get(
            "_id"
          )}`
        );
        setProductDetail(await res.json());
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box display={"flex"}>
      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          paddingTop="10%"
          paddingBottom="10%"
        >
          <Grid item xs={12} md={7}>
            <Box>
              <Box
                sx={{
                  marginBottom: 2,
                  width: 1,
                  height: "auto",
                  "& img": {
                    width: 1,
                    height: 1,
                    objectFit: "cover",
                    borderRadius: 2,
                  },
                }}
              >
                <img src={productDetail?.image} alt={productDetail?.name} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box>
              <Box
                padding={1}
                display={"inline-flex"}
                borderRadius={1}
                // bgcolor={"pink"}
                marginBottom={1}
                border= '0.5px solid #999'
              >
                <Typography
                  sx={{
                    color: "primary.main",
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                  paddingBottom={0.4}
                  
                >
                  new
                </Typography>
              </Box>
              <Typography variant={"h4"} fontWeight={700}>
                {productDetail?.name}
              </Typography>
              <Box marginY={3}>
                <Box display={"flex"}>
                  <CurrencyTypography
                    variant={"h5"}
                    fontWeight={700}
                    country={region}
                    price={productDetail?.price}
                  />
                </Box>
                <Box display={"flex"} alignItems={"center"} marginTop={1}>
                  <Box display={"flex"} justifyContent={"flex-start"}>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Box
                        key={item}
                        color={"secondary.main"}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <svg
                          width={18}
                          height={18}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </Box>
                    ))}
                  </Box>
                  <Typography marginLeft={1}>8 reviews</Typography>
                </Box>
              </Box>
              <Typography variant={"subtitle2"} color={"text.secondary"}>
                {productDetail?.description}
              </Typography>
              <Box marginY={3}>
                <Box>
                  <Typography>
                    Warehouse:{" "}
                    <Typography component={"span"} fontWeight={700}>
                      {region || ""}
                    </Typography>
                  </Typography>
                  <Stack direction={"row"} spacing={1} marginTop={0.5}>
                    {["Canada", "US", "Japan", "China", "India"].map(
                      (country) => (
                        <Box
                          key={country}
                          onClick={() => setRegion(country)}
                          sx={{
                            borderRadius: 1,
                            padding: 1,
                            border: `2px solid ${
                              region === country
                                ? theme.palette.primary.main
                                : theme.palette.divider
                            }`,
                            cursor: "pointer",
                          }}
                        >
                          <Typography>{country}</Typography>
                        </Box>
                      )
                    )}
                  </Stack>
                </Box>
                <Box marginY={2}>
                  <Typography>
                    Manufacturer:{" "}
                    <Typography component={"span"} fontWeight={700}>
                      {manufacturer || ""}
                    </Typography>
                  </Typography>
                  <Stack direction={"row"} spacing={1} marginTop={0.5}>
                    {["APEX", "miHoYo", "Good Smile Company"].map((item) => (
                      <Box
                        key={item}
                        onClick={() => setManufacturer(item)}
                        sx={{
                          borderRadius: 1,
                          padding: 1,
                          border: `2px solid ${
                            manufacturer === item
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          cursor: "pointer",
                        }}
                      >
                        <Typography>{item}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Typography>
                    Quantity:{" "}
                    <Typography component={"span"} fontWeight={700}>
                      {quantity || 1}
                    </Typography>
                  </Typography>
                  <Stack direction={"row"} spacing={2} marginTop={0.5}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        setQuantity(quantity - 1 >= 1 ? quantity - 1 : 1)
                      }
                      sx={{
                        borderRadius: 1,
                        paddingY: 1,
                        paddingX: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        cursor: quantity === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      <Typography
                        color={
                          quantity === 1 ? "text.secondary" : "text.primary"
                        }
                      >
                        - Reduce
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        setQuantity(
                          quantity + 1 <= quantityLimit
                            ? quantity + 1
                            : quantityLimit
                        )
                      }
                      sx={{
                        borderRadius: 1,
                        paddingY: 1,
                        paddingX: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        cursor:
                          quantity === quantityLimit
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      <Typography
                        color={
                          quantity === quantityLimit
                            ? "text.secondary"
                            : "text.primary"
                        }
                      >
                        + Add
                      </Typography>
                    </Button>
                  </Stack>
                </Box>
              </Box>
              <Stack
                marginTop={3}
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <Button
                  variant={"outlined"}
                  color={"primary"}
                  size={"large"}
                  fullWidth
                  startIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width={20}
                      height={20}
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                >
                  Favorite
                </Button>
                <Button
                  onClick={() => {
                    modifyCart(
                      productDetail!,
                      CART_QUANTITY_LIMIT,
                      quantity,
                      context
                    );
                    snackbarCtx.handleClick(
                      `${productDetail?.name || "product"} added.`
                    )();
                  }}
                  variant={"contained"}
                  color={"primary"}
                  size={"large"}
                  fullWidth
                  startIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width={20}
                      height={20}
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  }
                >
                  Add to cart
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
