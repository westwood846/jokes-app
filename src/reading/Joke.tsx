"use client";

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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IJoke, tagLabels } from "../jokes";
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

type DialogValues = "explanation" | "words";

export const Joke = ({ joke }: JokeProps) => {
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
          <Image src={joke.image} alt={titleInAppLang} fill objectFit="cover" />
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
  const paragraphsInForeignLang = [] as string[][];
  const paragraphsInAppLang = [] as string[][];

  let currentParagraphInForeignLang = [] as string[];
  let currentParagraphInAppLang = [] as string[];
  for (let i = 0; i < inForeignLang.length; i++) {
    const fragmentInForeignLang = inForeignLang[i];
    const fragmentInAppLang = inAppLang[i];

    if (fragmentInForeignLang === "PARAGRAPH_END") {
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

interface JokeParagraph {
  inAppLang: string[];
  inForeignLang: string[];
}

const JokeParagraph = ({ inAppLang, inForeignLang }: JokeBodyProps) => {
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
