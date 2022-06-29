import { ProductsGrid } from "components/product-grid";
import { fetchSearchResults } from "components/searchbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartItem } from "./shopping-cart";

export const SearchView = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<CartItem[]>([]);
  useEffect(() => {
    (async () => {
      const resJson = await fetchSearchResults(searchParams.get("text")!);
      setProducts(resJson);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ProductsGrid products={products} />;
};
