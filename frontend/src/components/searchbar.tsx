import {
  Autocomplete,
  TextField,
} from "@mui/material";
import { appConfig } from "config";
import { useState } from "react";
import { MiniProductImage } from "./cart-img-box";

interface ProductsOptionType {
  inputVal?: string;
  image: string;
  name: string;
}

export const SearchBar = () => {
  const [value] = useState<ProductsOptionType>({
    image: "",
    name: "",
  });
  const [options, setOption] = useState<ProductsOptionType[]>([]);
  return (
    <Autocomplete
      value={value}
      onInputChange={(event, newVal) => {
        newVal &&
          (async () => {
            const res = await fetch(
              `${appConfig.API_SERVER_DOMAIN}search?text=${newVal}`,
              {
                method: "GET",
              }
            );
            const resJson = await res.json();
            setOption(
              resJson.map((v: any) => ({
                name: v.name,
                image: v.image,
              }))
            );
          })();
      }}
      filterOptions={() => options}
      selectOnFocus
      handleHomeEndKeys
      id="product-search"
      options={[]}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        if (option.inputVal) {
          return option.inputVal;
        }
        return option.name;
      }}
      renderOption={(props, option) => (
        <li {...props}>
          {" "}
          <MiniProductImage image={option.image} name={option.name} />
          {option.name}
        </li>
      )}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Search Product" />}
    />
  );
};
