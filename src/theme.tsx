import { createTheme } from "@mui/material/styles";

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "primary" | "texty" | "outlined";
  }
}

export let theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    primary: {
      main: "#B3E60A",
      light: "#DEF6A8",
      dark: "#7A9F00",
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "primary" },
              style: {
                background: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              },
            },
            {
              props: { variant: "texty" },
              style: {
                background: theme.palette.text.primary,
                color: theme.palette.background.default,
              },
            },
            {
              props: { variant: "outlined" },
              style: {
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.text.primary}`,
              },
            },
          ],
          borderRadius: 8,
        },
      },
    },
  },
});
