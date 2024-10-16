"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IJoke, isShort, PARAGRAPH_DIVIDER, tagLabels } from "../jokes";
import { useLangs } from "../lang";
import {
  Close,
  LightbulbOutlined,
  Share,
  TranslateOutlined,
  VolumeUp,
} from "@mui/icons-material";
import { Fragment, useState } from "react";
import { SquarishSwitch } from "../core/SquarishSwitch";
import { WordCard } from "./WordCard";
import Image from "next/image";

interface JokeProps {
  joke: IJoke;
}

export const Joke = ({ joke }: JokeProps) => {
  if (isShort(joke)) return <ShortJoke joke={joke} />;

  return <LongJoke joke={joke} />;
};

const gradients = [
  "linear-gradient(97.94deg, #DEF6A8 0%, #FFC7EE 100%)",
  "linear-gradient(97.94deg, #FFC7EE 0%, #68D4F9 100%)",
  "linear-gradient(97.94deg, #8FEFFC 0%, #DEF6A8 100%)",
];

const jokeIdToGradient = (id: string) => {
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[sum % gradients.length];
};

export const ShortJoke = ({ joke }: JokeProps) => {
  const { foreignLang, appLang } = useLangs();

  const jokeInAppLang = joke.translations[appLang]?.[0];
  const jokeInForeignLang = joke.translations[foreignLang]?.[0];

  if (!jokeInAppLang || !jokeInForeignLang) {
    return (
      <Alert severity="error">
        This joke is missing translations for {appLang} or {foreignLang}.
      </Alert>
    );
  }

  const gradient = jokeIdToGradient(joke.id);

  return (
    <Box sx={{ pb: 3.5 / 2 }}>
      <Card
        sx={{
          background: gradient,
          boxShadow: "none",
          overflow: "visible",
          position: "relative",
        }}
      >
        <CardContent sx={{ textAlign: "center", px: 2, py: 8 }}>
          <Typography variant="h4">{jokeInAppLang}</Typography>
          <Typography variant="body1">{jokeInForeignLang}</Typography>
        </CardContent>
        <CardActions
          sx={{ position: "absolute", bottom: -1 * 3.5 * 8, left: 0, right: 0 }}
        >
          <Stack direction={"row"} justifyContent={"space-between"} flex={1}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <IconButton title={`Listen to joke`} variant="texty">
                <VolumeUp />
              </IconButton>
              <SquarishSwitch
                title={`Toggle joke translation`}
                icon={<TranslateOutlined />}
                checkedIcon={<TranslateOutlined />}
              />
            </Stack>
            <IconButton title={`Share joke"`} variant="primary">
              <Share />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

type DialogValues = "explanation" | "words";

export const LongJoke = ({ joke }: JokeProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
          sx={{
            width: "100%",
            height: 300,
            borderRadius: 10,
            boxShadow: "3px 3px 50px 8px rgba(255,198,0,0.15)",
            position: "relative",
          }}
        >
          <Image
            src={joke.image}
            alt={titleInAppLang}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 9999px) 828px"
          />
        </Box>
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
          <SquarishSwitch
            title={`Toggle joke translation`}
            icon={<TranslateOutlined />}
            checkedIcon={<TranslateOutlined />}
          />
          <IconButton
            title={`Explain joke"`}
            variant="primary"
            onClick={() => setDialogValue("explanation")}
            disabled={!joke.explanations?.[appLang] && !joke.terms}
          >
            <LightbulbOutlined />
          </IconButton>
        </Stack>
        <IconButton title={`Share joke"`} variant="primary">
          <Share />
        </IconButton>
      </Stack>

      <div>
        <JokeBody inAppLang={jokeInAppLang} inForeignLang={jokeInForeignLang} />
      </div>

      <Dialog
        open={dialogValue === "explanation"}
        onClose={() => setDialogValue(null)}
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <LightbulbOutlined />
          <Box component={"span"} sx={{ flex: 1 }}>
            Explain
          </Box>
          {isMobile && (
            <IconButton onClick={() => setDialogValue(null)}>
              <Close />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <Stack component={Stack} spacing={4}>
            <Typography color="primary.dark">
              {joke.explanations?.[appLang]}
            </Typography>
            <Stack spacing={1.5} component="dl" sx={{ my: 0 }}>
              {joke.terms?.map((term) => (
                <WordCard key={term.term[appLang]} word={term} />
              ))}
            </Stack>
          </Stack>
        </DialogContent>
        {!isMobile && (
          <DialogActions>
            <Button onClick={() => setDialogValue(null)}>Close</Button>
          </DialogActions>
        )}
      </Dialog>

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

import ReactMarkdown from "react-markdown";

interface JokeBodyProps {
  inAppLang: string[];
  inForeignLang: string[];
}

const JokeBody = ({ inAppLang, inForeignLang }: JokeBodyProps) => {
  if (!inAppLang.some((line) => line === PARAGRAPH_DIVIDER)) {
    return (
      <JokeParagraph inAppLang={inAppLang} inForeignLang={inForeignLang} />
    );
  }

  const paragraphsInForeignLang = [] as string[][];
  const paragraphsInAppLang = [] as string[][];

  let currentParagraphInForeignLang = [] as string[];
  let currentParagraphInAppLang = [] as string[];
  for (let i = 0; i < inForeignLang.length; i++) {
    const fragmentInForeignLang = inForeignLang[i];
    const fragmentInAppLang = inAppLang[i];

    if (fragmentInForeignLang === PARAGRAPH_DIVIDER) {
      paragraphsInForeignLang.push(currentParagraphInForeignLang);
      paragraphsInAppLang.push(currentParagraphInAppLang);
      currentParagraphInForeignLang = [];
      currentParagraphInAppLang = [];
    } else {
      currentParagraphInForeignLang.push(fragmentInForeignLang);
      currentParagraphInAppLang.push(fragmentInAppLang);
    }
  }

  return paragraphsInForeignLang.map((paragraphInForeignLang, i) => (
    <JokeParagraph
      key={i}
      inForeignLang={paragraphInForeignLang}
      inAppLang={paragraphsInAppLang[i]}
    />
  ));
};

interface JokeParagraphProps {
  inAppLang: string[];
  inForeignLang: string[];
}

const JokeParagraph = ({ inAppLang, inForeignLang }: JokeParagraphProps) => {
  return (
    <p>
      {inForeignLang.map((line, i) => (
        <Fragment key={i}>
          <Typography component="span">
            <ReactMarkdown components={{ p: "span" }}>{line}</ReactMarkdown>
          </Typography>{" "}
          <Typography component="span" color="primary.dark">
            <ReactMarkdown components={{ p: "span" }}>
              {inAppLang[i]}
            </ReactMarkdown>
          </Typography>{" "}
        </Fragment>
      ))}
    </p>
  );
};
