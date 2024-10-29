import { StoriesList } from "@/admin/StoriesList";
import { Box, Button, Container, Stack } from "@mui/material";
import { useStories } from "@/stories";
import { Link } from "react-router-dom";

export function Admin() {
  const {
    query: { data: stories = [] },
  } = useStories();

  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={2}>
        <Box textAlign="end">
          <Button
            component={Link}
            to="/admin/stories/new"
            variant="contained"
            color="primary"
            sx={{ flexGrow: 0 }}
          >
            New Story
          </Button>
        </Box>
        <StoriesList stories={stories} />
      </Stack>
    </Container>
  );
}
