import { JokesList } from "@/admin/JokesList";
import { Alert, Box, Button, Container, Stack } from "@mui/material";
import { useJokes } from "@/jokes";
import { Link } from "react-router-dom";

export function Admin() {
  const {
    query: { data: jokes = [] },
  } = useJokes();

  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={2}>
        <Box textAlign="end">
          <Button
            component={Link}
            to="/admin/jokes/new"
            variant="contained"
            color="primary"
            sx={{ flexGrow: 0 }}
          >
            New Joke
          </Button>
        </Box>
        <JokesList jokes={jokes} />
        <Alert severity="info">
          I haven't implemented an endpoint for updating jokes yet, so for now,
          when you "edit" them, it creates a modified copy instead. But you can
          then delete the original.
        </Alert>
      </Stack>
    </Container>
  );
}
