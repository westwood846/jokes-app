import {
  Alert,
  Box,
  Chip,
  IconButton,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { IJoke } from "./jokes";
import { useLangs } from "./lang";
import { PlayCircle, Share } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Fragment, useState } from "react";

interface JokeProps {
  joke: IJoke;
}

type TabValues = "joke" | "explanation" | "words";

export const Joke = ({ joke }: JokeProps) => {
  const { foreignLang, appLang } = useLangs();

  const [tabValue, setTabValue] = useState<TabValues>("joke");
  const handleTabValueChange = (
    event: React.SyntheticEvent,
    newValue: TabValues
  ) => {
    setTabValue(newValue);
  };

  const jokeInAppLang = joke.translations[appLang];
  const jokeInForeignLang = joke.translations[foreignLang];
  const titleInAppLang = joke.title[appLang];
  const titleInForeignLang = joke.title[foreignLang];

  if (
    !jokeInAppLang ||
    !jokeInForeignLang ||
    !titleInAppLang ||
    !titleInForeignLang
  ) {
    return (
      <Alert severity="error">
        This joke is missing translations for {appLang} or {foreignLang}.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      {joke.image && (
        <Box
          component="img"
          src={joke.image}
          alt={titleInAppLang}
          sx={{
            borderRadius: 10,
            boxShadow: "3px 3px 50px 8px rgba(255,198,0,0.15)",
          }}
        />
      )}

      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <IconButton
          title={`Listen to "${titleInForeignLang}"`}
          color="primary"
          size="large"
        >
          <PlayCircle />
        </IconButton>
        <Stack>
          <Typography variant="h5">{titleInAppLang}</Typography>
          <Typography variant="h5" color="success">
            {titleInForeignLang}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          useFlexGap
          maxWidth={300}
          gap={1}
        >
          {joke.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>
        <IconButton title="Share" size="small">
          <Share />
        </IconButton>
      </Stack>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleTabValueChange}
            aria-label="Joke information"
          >
            <Tab label="Joke" value="joke" />
            {joke.explanations?.[appLang] && (
              <Tab label="Explanation" value="explanation" />
            )}
            {joke.terms && joke.terms.length > 0 && (
              <Tab label="Words" value="words" />
            )}
          </TabList>
        </Box>

        <TabPanel value="joke" sx={{ p: 0 }}>
          {jokeInForeignLang.map((line, i) => (
            <Fragment key={i}>
              <Typography component="span">{line}</Typography>{" "}
              <Typography component="span" color="success">
                ({jokeInAppLang[i]})
              </Typography>{" "}
            </Fragment>
          ))}
        </TabPanel>

        {joke.explanations?.[appLang] && (
          <TabPanel value="explanation" sx={{ p: 0 }}>
            {joke.explanations[appLang]}
          </TabPanel>
        )}

        {joke.terms && joke.terms.length > 0 && (
          <TabPanel value="words" sx={{ p: 0 }}>
            <Stack spacing={1.5} component="dl" sx={{ my: 0 }}>
              {joke.terms.map((term) => (
                <div key={term.term[appLang]}>
                  <Typography
                    fontWeight={"bold"}
                    component={"dt"}
                    sx={{ display: "inline" }}
                  >
                    {term.term[foreignLang]}:{" "}
                  </Typography>
                  <Typography component={"dd"} sx={{ display: "inline" }}>
                    {term.definitions[foreignLang]}
                  </Typography>
                </div>
              ))}
            </Stack>
          </TabPanel>
        )}
      </TabContext>
    </Stack>
  );
};
