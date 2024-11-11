import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout";
import { StoriesPage } from "../reading/StoriesPage";
import { Settings } from "../settings/Settings";
import { Admin } from "../admin/Admin";
import { NewStory } from "../admin/NewStory";
import { EditStory } from "../admin/EditStory";
import { Home } from "../Home";
import { ErrorPage } from "./ErrorPage";
import { StoryPage } from "@/reading/StoryPage";

export const router = createBrowserRouter([
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
        path: "stories",
        element: <StoriesPage />,
      },
      {
        path: "stories/:id",
        element: <StoryPage />,
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
