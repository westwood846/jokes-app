"use client";

import { JokesList } from "@/admin/JokesList";
import { Box, Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { IJoke, useSaveJoke } from "@/jokes";
import { useIsClient } from "@uidotdev/usehooks";

const useGetNewJoke = () => {
  return () => {
    return {
      id: crypto.randomUUID(),
      title: { en: "English Title", de: "German Title", ru: "Russian Title" },
      translations: {
        en: ["English text"],
        de: ["German text"],
        ru: ["Russian text"],
      },
      explanations: {
        en: "English explanation",
        de: "German explanation",
        ru: "Russian explanation",
      },
      terms: [],
      tags: [],
      lang: null,
      image: "/penguins.png",
    } as IJoke;
  };
};

export default function Page() {
  // TODO: This is horrible
  const isClient = useIsClient();
  if (isClient === false) return null;

  return <ActualPage />;
}

function ActualPage() {
  const { push } = useRouter();
  const getNewJoke = useGetNewJoke();
  const saveJoke = useSaveJoke();
  const onNewJoke = () => {
    const joke = getNewJoke();
    saveJoke(joke);
    push(`/admin/${joke.id}`);
  };
  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Box textAlign={"end"}>
        <Button
          onClick={onNewJoke}
          variant="contained"
          color="primary"
          sx={{ flexGrow: 0 }}
        >
          New Joke
        </Button>
      </Box>
      <Stack spacing={4}>
        <JokesList />
      </Stack>
    </Container>
  );
}
