import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { appConfig } from "config";
import { useState } from "react";
import { MiniProductImage } from "./cart-img-box";
import SearchIcon from "@mui/icons-material/Search";
import {
  useNavigate,
  createSearchParams,
  NavigateFunction,
} from "react-router-dom";
import { visitDetailPage } from "routes";
import { AutoWrappedTypography } from "./autowrapped-typography";

type Redirect = {
  query: string;
};

const isRedirect = (obj: ProductsOptionType): obj is Redirect => {
  return "query" in obj;
};

type ProductsOptionType =
  | {
      inputVal?: string;
      image: string;
      name: string;
      _id: string;
    }
  | Redirect;

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

export const fetchSearchResults = async (query: string) => {
  const res = await fetch(
    `${appConfig.API_SERVER_DOMAIN}search?text=${query}`,
    {
      method: "GET",
    }
  );
  return await res.json();
};

const onAction = (option: ProductsOptionType, navigate: NavigateFunction) => {
  if (isRedirect(option)) {
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ text: option.query })}`,
    });
    window.location.reload();
  } else {
    visitDetailPage(option, navigate, true);
  }
};

export const SearchBar = ({ sx }: { sx?: Parameters<typeof Box>[0]["sx"] }) => {
  const [value] = useState<ProductsOptionType>({
    image: "",
    name: "",
    _id: "",
  });
  const [options, setOption] = useState<ProductsOptionType[]>([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          onAction({ query: newValue }, navigate);
        } else if (newValue) {
          onAction(newValue, navigate);
        }
      }}
      onInputChange={(event, newVal) => {
        setQuery(newVal);
        (newVal &&
          (async () => {
            const resJson = await fetchSearchResults(newVal);
            setOption(
              resJson.map((v: any) => ({
                name: v.name,
                image: v.image,
                _id: v._id,
              }))
            );
          })()) ||
          setOption([]);
      }}
      filterOptions={() => {
        if (options.length > 0 && !isRedirect(options[0])) {
          options.unshift({ query });
        }
        return options;
      }}
      selectOnFocus
      handleHomeEndKeys
      id="product-search"
      options={[]}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        if (isRedirect(option)) {
          return option.query;
        }
        if (option.inputVal) {
          return option.inputVal;
        }
        return option.name;
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} onClick={() => onAction(option, navigate)}>
            {(!isRedirect(option) && (
              <>
                <MiniProductImage image={option.image} name={option.name} />
                <AutoWrappedTypography text={option.name} lineClamp={4} />
              </>
            )) ||
              (query && <Typography>See more about {query}...</Typography>)}
          </li>
        );
      }}
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
