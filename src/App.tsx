import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles.css";
import { Router } from "./routing";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ pt: 2, pb: 8 }}>
        <Router />
      </Container>
    </ThemeProvider>
  );
}
