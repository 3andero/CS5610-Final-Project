import Container from "components/Container";
import { ProductsGrid } from "components/product-grid";
import ShopPageHero from "components/shop-page-hero";
import { useEffect, useState } from "react";
import { appConfig } from "../config";
import { CartItem } from "./shopping-cart";

export const ShopView = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  useEffect(() => {
    // console.log("fetch products");
    (async () => {
      const res = await fetch(`${appConfig.API_SERVER_DOMAIN}products/all`);
      setProducts(await res.json());
    })();
  }, []);

  return (
    <>
      <Container>
        <ShopPageHero />
      </Container>
      <ProductsGrid products={products} />
    </>
  );
};
