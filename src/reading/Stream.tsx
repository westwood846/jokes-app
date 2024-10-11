import { Settings } from "@mui/icons-material";
import {
  Stack,
  Typography,
  IconButton,
  Chip,
  List,
  Divider,
} from "@mui/material";
import { Fragment, useState } from "react";
import { jokes, tagLabels } from "../jokes";
import { useLangs } from "../lang";
import { useCurrentPage } from "../core/routing";
import { Joke } from "./Joke";

export const Stream = () => {
  const { appLang, foreignLang } = useLangs();

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const toggleTag = (tag: string) =>
    setActiveTags((tags) =>
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
    );

  const availableJokes = jokes
    .filter(
      (joke) => joke.translations[foreignLang] && joke.translations[appLang]
    )
    .filter((joke) =>
      joke.tags.some(
        (tag) => activeTags.includes(tag) || activeTags.length === 0
      )
    );

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
