import { Stack, Typography, Container } from "@mui/material";
import { useStories } from "./display-stories";
import { NavvyLayout } from "@/core/layout";
import { StoriesList } from "./StoriesList";

export function StoriesPage() {
  const {
    query: { data: stories = [] },
  } = useStories();

  return (
    <NavvyLayout>
      <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" component="h1">
              Stream
            </Typography>
          </Stack>
          <StoriesList stories={stories} />
        </Stack>
      </Container>
    </NavvyLayout>
  );
}
