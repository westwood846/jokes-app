"use client";

import { EditJoke } from "@/admin/EditJoke";
import { useJokes } from "@/jokes";
import { Alert, Container, Stack, Typography } from "@mui/material";
import { useIsClient } from "@uidotdev/usehooks";

export default function Page({ params }: { params: { id: string } }) {
  // TODO: This is horrible
  const isClient = useIsClient();
  if (isClient === false) return null;

  return <ActualPage params={params} />;
}

function ActualPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const jokes = useJokes();
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
