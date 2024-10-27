import { JokesList } from "@/admin/JokesList";
import { Box, Button, Container, Stack } from "@mui/material";
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
      </Stack>
    </Container>
  );
}
