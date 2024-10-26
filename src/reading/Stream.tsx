import { Stack, Typography, List, Divider, Container } from "@mui/material";
import { Fragment } from "react";
import { MoreHoriz } from "@mui/icons-material";
import { Joke } from "./Joke";
import { useJokes } from "@/jokes";

export function Stream() {
  // const { appLang } = useLangs();
  const {
    query: { data: jokes = [] },
  } = useJokes();

  // const [activeTags, setActiveTags] = useState<string[]>([]);
  // const toggleTag = (tag: string) =>
  //   setActiveTags((tags) =>
  //     tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
  //   );

  return (
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

        {/* <Stack
          direction="row"
          flexWrap="wrap"
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
        </Stack> */}

        <List>
          {jokes.map((joke) => (
            <Fragment key={joke.id}>
              <Joke joke={joke} />
              <Divider sx={{ my: 6 }}>
                <MoreHoriz fontSize="small" sx={{ mb: -0.6 }} />
              </Divider>
            </Fragment>
          ))}
        </List>
      </Stack>
    </Container>
  );
}
