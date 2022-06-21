import { PaletteMode } from "@mui/material";
import { ComponentsOverrides, createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";
import { dark, light } from "./palette";

const titleFont1 = {
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: 600,
};

export const getTheme = (mode: PaletteMode): Theme => {
    return responsiveFontSizes(createTheme({
        palette: mode === "dark" ? dark : light,
        typography: {
            h1: titleFont1,
            h2: titleFont1,
            h3: titleFont1,
            h4: titleFont1,
            h5: titleFont1,
            subtitle1: {
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
            },
            subtitle2: {
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
            },
            body1: {
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontWeight: 400,
            },
            body2: {
                fontFamily: "'Zen Maru Gothic', sans-serif",
                fontWeight: 400,
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontWeight: 400,
                        borderRadius: 5,
                        paddingTop: 10,
                        paddingBottom: 10,
                    },
                    containedSecondary: mode === 'light' ? { color: 'white' } : {},
                } as ComponentsOverrides['MuiButton'],
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        borderRadius: 5,
                    },
                } as ComponentsOverrides['MuiInputBase'],
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 5,
                    },
                    input: {
                        borderRadius: 5,
                    },
                } as ComponentsOverrides['MuiOutlinedInput'],
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                    },
                } as ComponentsOverrides['MuiCard'],
            },
        }
    }));
}