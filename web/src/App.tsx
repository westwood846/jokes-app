import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { theme } from "./core/theme";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/core/styles.css";
import { PreferencesProvider } from "./settings/preferences";
import { router } from "./core/router";

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PreferencesProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}

export default App;
