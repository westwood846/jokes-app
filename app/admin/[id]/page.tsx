import { EditJoke } from "@/admin/EditJoke";
import { jokes } from "@/jokes";
import { Alert, Container, Stack, Typography } from "@mui/material";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const joke = jokes.find((joke) => joke.id === id);

  if (!joke) {
    return <Alert severity="error">Joke not found</Alert>;
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={4}>
        <Typography variant="h4">Edit joke</Typography>
        <EditJoke originalJoke={joke} />
      </Stack>
    </Container>
  );
}
