import { useLocalStorage } from "@uidotdev/usehooks";
import { Read } from "./Read";
import { Settings } from "./Settings";
import { Alert, Container } from "@mui/material";

const routes = {
    read: <Read />,
    settings: <Settings />,
} as const;

type Page = keyof typeof routes;
const pages = Object.keys(routes) as Page[];
const initPage = pages[0];

export const useCurrentPage = () => {
    const [page, setPage] = useLocalStorage<Page>("currentPage", initPage);
    return { page, setPage };
}

export const Router = () => {
    const { page, setPage } = useCurrentPage();

    if (page === "read") return <Read />;
    if (page === "settings") return <Settings/>;
    return <Container>
        <Alert severity="error">Unknown page: {page}</Alert>
    </Container>
}