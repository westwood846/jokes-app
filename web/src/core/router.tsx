import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout";
import { Stream } from "../reading/Stream";
import { Settings } from "../settings/Settings";
import { Admin } from "../admin/Admin";
import { NewStory } from "../admin/NewStory";
import { EditStory } from "../admin/EditStory";
import { Home } from "../Home";
import { ErrorPage } from "./ErrorPage";

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
