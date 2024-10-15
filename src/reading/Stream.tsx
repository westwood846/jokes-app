"use client";

import { Stack, Typography, Chip, List, Divider } from "@mui/material";
import { Fragment, useState } from "react";
import { tagLabels, useJokes } from "@/jokes";
import { useLangs } from "@/lang";
import { Joke } from "@/reading/Joke";

export const Stream = () => {
  const { appLang } = useLangs();

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const toggleTag = (tag: string) =>
    setActiveTags((tags) =>
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
    );

  const jokes = useJokes();

  const availableJokes = jokes;
  // .filter(
  //   (joke) => joke.translations[foreignLang] && joke.translations[appLang]
  // )
  // .filter((joke) =>
  //   joke.tags.some(
  //     (tag) => activeTags.includes(tag) || activeTags.length === 0
  //   )
  // );

  console.log(availableJokes);

  return (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" component="h1">
          Stream
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        useFlexGap
        maxWidth={300}
        gap={1}
      >
        {Object.entries(tagLabels).map(([tag, translations]) => (
          <Chip
            key={tag}
            label={translations[appLang] || "Unknown"}
            color={activeTags.includes(tag) ? "primary" : "default"}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </Stack>

      <List>
        {availableJokes.map((joke) => (
          <Fragment key={joke.id}>
            <Joke joke={joke} />
            <Divider sx={{ my: 6 }} />
          </Fragment>
        ))}
      </List>
    </Stack>
  );
};
