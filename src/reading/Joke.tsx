import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { IJoke, tagLabels } from "../jokes";
import { useLangs } from "../lang";
import {
  BookOutlined,
  LightbulbOutlined,
  Share,
  TranslateOutlined,
  VolumeUp,
} from "@mui/icons-material";
import { Fragment, useState } from "react";

interface JokeProps {
  joke: IJoke;
}

type DialogValues = "explanation" | "words";

export const Joke = ({ joke }: JokeProps) => {
  const { foreignLang, appLang } = useLangs();

  const [dialogValue, setDialogValue] = useState<DialogValues | null>(null);

  const jokeInAppLang = joke.translations[appLang];
  const jokeInForeignLang = joke.translations[foreignLang];
  const titleInAppLang = joke.title[appLang];
  const titleInForeignLang = joke.title[foreignLang];

  const difficulty =
    joke.terms && joke.terms.length > 0
      ? joke.terms.reduce(
          (max, term) =>
            (term.difficulty || "A0") < max ? max : term.difficulty,
          "A1"
        )
      : null;

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

      <Stack>
        <Typography variant="h5">{titleInAppLang}</Typography>
        <Typography variant="body1" color="primary.dark">
          {titleInForeignLang}
        </Typography>
      </Stack>

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            title={`Listen to "${titleInForeignLang}"`}
            variant="texty"
          >
            <VolumeUp />
          </IconButton>
          <IconButton title={`Toggle joke translation`} variant="outlined">
            <TranslateOutlined />
          </IconButton>
          <IconButton
            title={`Explain words`}
            variant="outlined"
            onClick={() => setDialogValue("words")}
          >
            <BookOutlined />
          </IconButton>
          <IconButton
            title={`Explain joke"`}
            variant="primary"
            onClick={() => setDialogValue("explanation")}
          >
            <LightbulbOutlined />
          </IconButton>
        </Stack>
        <IconButton title={`Share joke"`} variant="primary">
          <Share />
        </IconButton>
      </Stack>

      <div>
        {jokeInForeignLang.map((line, i) => (
          <Fragment key={i}>
            <Typography component="span">{line}</Typography>{" "}
            <Typography component="span" color="primary.dark">
              {jokeInAppLang[i]}
            </Typography>{" "}
          </Fragment>
        ))}
      </div>

      {joke.explanations && (
        <Dialog
          open={dialogValue === "explanation"}
          onClose={() => setDialogValue(null)}
        >
          <DialogTitle>Explanation</DialogTitle>
          <DialogContent>{joke.explanations?.[appLang]}</DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogValue(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {joke.terms && (
        <Dialog
          open={dialogValue === "words"}
          onClose={() => setDialogValue(null)}
        >
          <DialogTitle>Words</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogValue(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        useFlexGap
        maxWidth={300}
        gap={1}
      >
        {difficulty && <Chip label={difficulty} size="small" />}
        {joke.tags.map((tag) => (
          <Chip key={tag} label={tagLabels[tag][appLang]} size="small" />
        ))}
      </Stack>
    </Stack>
  );
};
