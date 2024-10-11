import { useLocalStorage } from "@uidotdev/usehooks";
import { Stream } from "../reading/Stream";
import { Settings } from "../settings/Settings";
import { Alert, Container } from "@mui/material";
import { Onboarding } from "../Onboarding";

const routes = {
  onboarding: <Onboarding />,
  stream: <Stream />,
  settings: <Settings />,
} as const;

type Page = keyof typeof routes;
const pages = Object.keys(routes) as Page[];
const initPage = pages[0];

export const useCurrentPage = () => {
  const [page, setPage] = useLocalStorage<Page>("currentPage", initPage);
  return { page, setPage };
};

export const Router = () => {
  const { page, setPage } = useCurrentPage();

  const element = routes[page];

  if (element) return element;

  return (
    <Container>
      <Alert severity="error">Unknown page: {page}</Alert>
    </Container>
  );
};
