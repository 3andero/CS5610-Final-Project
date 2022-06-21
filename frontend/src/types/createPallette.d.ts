// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {
        alternate: {
            main: string;
            dark: string;
        };
    }

    interface Palette {
        alternate: {
            main: string;
            dark: string;
        };
    }
}
