import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { appConfig } from "config";
import { useState } from "react";
import { MiniProductImage } from "./cart-img-box";
import SearchIcon from "@mui/icons-material/Search";
interface ProductsOptionType {
  inputVal?: string;
  image: string;
  name: string;
}

const ExpandableSearchBox = (params: AutocompleteRenderInputParams) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  const onHoverStyle = {
    width: "15rem",
    transition: "all 0.5s",
    // border: "1px solid transparent",
    "& .TextFieldChild": {
      transition: "all 0.5s",
      display: "block",
      width: "15rem",
    },
    "& .searchLogo": {
      display: "none",
    },
  } as const;
  return (
    (isMd && (
      <Box
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          ...{
            width: "50px",
            // borderRadius: "40px",
            // border: "1px solid gray",
            transition: "width 0.5s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            ...(!isFocused && { "&:hover": onHoverStyle }),
          },
          ...(isFocused && onHoverStyle),
        }}
      >
        <TextField
          className="TextFieldChild"
          {...params}
          label="Search Product"
          size="small"
          sx={{
            display: "none",
            "& fieldset": {
              borderRadius: "50px",
            },
          }}
        />
        <SearchIcon className="searchLogo" />
      </Box>
    )) || (
      <TextField
        className="TextFieldChild"
        {...params}
        label="Search Product"
        size="small"
        sx={{
          // width: "10rem",
          "& fieldset": {
            borderRadius: "50px",
          },
        }}
      />
    )
  );
};

export const SearchBar = ({ sx }: { sx?: Parameters<typeof Box>[0]["sx"] }) => {
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
      sx={{
        // width: { xs: "auto", md: "15em" },
        width: "auto",
        ...sx,
      }}
      freeSolo
      renderInput={ExpandableSearchBox}
    />
  );
};
