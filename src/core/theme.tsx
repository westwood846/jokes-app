"use client";

import { createTheme } from "@mui/material/styles";
import { Mulish } from "next/font/google";

const mainFont = Mulish({
  weight: ["300", "500", "700"],
  variable: "--font-main",
  subsets: ["latin", "latin-ext"],
});

export let theme = createTheme({
  typography: {
    fontFamily: mainFont.style.fontFamily,
  },
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
  components: {},
});
