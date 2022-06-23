import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { appConfig } from "../config";

export const ShopView = () => {
  const [products, setProducts] = useState<
    {
      _id: string;
      price: number;
      name: string;
      quantity: number;
      description: string;
    }[]
  >([]);
  useEffect(() => {
    console.log("fetch products");
    (async () => {
      const res = await fetch(`${appConfig.API_URL!}products`);
      setProducts(await res.json());
    })();
  }, []);

  return (
    <Box margin="3em" sx={{ flexGrow: 1 }}>
      <Typography>Shop.View</Typography>
      <Grid container spacing={3}>
        {products
          .filter((v) => v.quantity > 0)
          .map((v) => {
            return (
              <Grid item key={v._id} xs={12} sm={4}>
                <Box
                  justifyContent={"center"}
                  padding={"1em 3em"}
                  bgcolor="#f3e3e3"
                  display={"flex"}
                  flexDirection="column"
                >
                  <Box
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"space-between"}
                  >
                    <Typography variant="h4" display={"flex"}>
                      {v.name}
                    </Typography>
                    <Typography variant="h4" color="#004466">${v.price}</Typography>
                  </Box>
                  <Typography variant="body2">
                    In Stock: {v.quantity}
                  </Typography>
                  <Typography
                    minHeight={"6em"}
                    sx={{
                      lineClamp: 4,
                      WebkitLineClamp: 4,
                      wordBreak: "break-all",
                      display: "-webkit-box",
                      overflow: "hidden",
                      boxOrient: "vertical",
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {v.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};
