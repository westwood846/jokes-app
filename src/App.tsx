import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./core/styles.css";
import { Router } from "./core/routing";
import { Container, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./core/theme";
import { DesktopNav, MobileNav } from "./core/nav";

export default function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isMobile && <DesktopNav />}
      <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
        <Router />
      </Container>
      {isMobile && <MobileNav />}
    </ThemeProvider>
  );
}
