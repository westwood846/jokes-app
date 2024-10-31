import { ThemeProvider } from "@mui/material/styles";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { theme } from "./core/theme";
import { RootLayout } from "./layout";
import { CssBaseline } from "@mui/material";
import { Stream } from "./reading/Stream";
import { Settings } from "./settings/Settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Admin } from "./admin/Admin";
import { NewStory } from "./admin/NewStory";
import { EditStory } from "./admin/EditStory";
import { Home } from "./Home";

import "@/core/styles.css";
import { PreferencesProvider } from "./settings/preferences";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (typeof error !== "object" || error === null) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    );
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {("statusText" in error && (error.statusText as string)) ||
            ("message" in error && (error.message as string))}
        </i>
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "stream",
        element: <Stream />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "admin/stories/new",
        element: <NewStory />,
      },
      {
        path: "admin/stories/:id",
        element: <EditStory />,
      },
    ],
  },
]);

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
