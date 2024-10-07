import { Settings, PlayCircle, GTranslate } from "@mui/icons-material";
import {
  Container,
  Stack,
  Typography,
  IconButton,
  Chip,
  Alert,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { IJoke, jokes, tagLabels } from "./jokes";
import { useLangs } from "./lang";
import { useCurrentPage } from "./routing";

export const Read = () => {
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

  const { setPage } = useCurrentPage();

  return (
    <Container component={Stack} spacing={2} maxWidth="xs">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" component="h1">
          Read
        </Typography>
        <IconButton onClick={() => setPage("settings")}>
          <Settings />
        </IconButton>
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

      <Stack spacing={8}>
        {availableJokes.map((joke) => (
          <Joke key={joke.id} joke={joke} />
        ))}
      </Stack>
    </Container>
  );
};

interface JokeProps {
  joke: IJoke;
}

const Joke = ({ joke }: JokeProps) => {
  const { foreignLang, appLang } = useLangs();

  const jokeInAppLang = joke.translations[appLang];
  const jokeInForeignLang = joke.translations[foreignLang];
  const titleInAppLang = joke.title[appLang];
  const titleInForeignLang = joke.title[foreignLang];

  const [revealed, setRevealed] = useState(false);
  const reveal = () => setRevealed(true);
  const hide = () => setRevealed(false);

  return (
    <Stack spacing={2}>
      {joke.image && (
        <Box
          component="img"
          src={joke.image}
          alt={joke.id}
          sx={{
            borderRadius: 10,
            boxShadow: "3px 3px 50px 8px rgba(255,198,0,0.15)",
          }}
        />
      )}

      <Stack direction={"row"} spacing={2}>
        <Button variant="contained" size="small">
          <PlayCircle />
        </Button>
        <Button
          startIcon={<GTranslate />}
          onClick={revealed ? hide : reveal}
          variant="contained"
          size="small"
        >
          Translate
        </Button>
      </Stack>

      <Stack>
        {titleInAppLang && (
          <Typography variant="h5">{titleInAppLang}</Typography>
        )}
        {titleInForeignLang && revealed && (
          <Typography variant="h5" color="success">
            {titleInForeignLang}
          </Typography>
        )}
      </Stack>

      <Stack>
        {jokeInAppLang ? (
          <Typography>{jokeInAppLang}</Typography>
        ) : (
          <Alert severity="error">Missing translation ¯\_(ツ)_/¯</Alert>
        )}
        {revealed && jokeInForeignLang && (
          <Typography color="success">{jokeInForeignLang}</Typography>
        )}
      </Stack>
    </Stack>
  );
};
