import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Share, TranslateOutlined, VolumeUp } from "@mui/icons-material";
import { Fragment } from "react";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import { SquarishIconButton } from "@/core/SquarishIconButton";
import { WordCard } from "./WordCard";
import { SquarishSwitch } from "../core/SquarishSwitch";
import { useLangs } from "../lang";
import { IJoke, isShort, PARAGRAPH_DIVIDER } from "../jokes";

interface JokeProps {
  joke: IJoke;
}

export function Joke({ joke }: JokeProps) {
  if (isShort(joke)) return <ShortJoke joke={joke} />;

  return <LongJoke joke={joke} />;
}

const gradients = [
  "linear-gradient(97.94deg, #DEF6A8 0%, #FFC7EE 100%)",
  "linear-gradient(97.94deg, #FFC7EE 0%, #68D4F9 100%)",
  "linear-gradient(97.94deg, #8FEFFC 0%, #DEF6A8 100%)",
];

const jokeIdToGradient = (id: string) => {
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[sum % gradients.length];
};

export function ShortJoke({ joke }: JokeProps) {
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
          sx={{
            position: "absolute",
            bottom: -1 * 3.5 * 8,
            left: 0,
            right: 0,
          }}
        >
          <Stack direction="row" justifyContent="space-between" flex={1}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SquarishIconButton title="Listen to joke" color="primary">
                <VolumeUp />
              </SquarishIconButton>
              <SquarishSwitch
                title="Toggle joke translation"
                icon={<TranslateOutlined />}
                checkedIcon={<TranslateOutlined />}
              />
            </Stack>
            <SquarishIconButton title="Share joke">
              <Share />
            </SquarishIconButton>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}

export function LongJoke({ joke }: JokeProps) {
  const { foreignLang, appLang } = useLangs();

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

      <Stack direction="row">
        {difficulty && <Chip label={difficulty} size="small" />}
      </Stack>

      <Stack>
        <Typography variant="h5">{titleInAppLang}</Typography>
        <Typography variant="body1" color="primary.dark">
          {titleInForeignLang}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <SquarishIconButton
            title={`Listen to "${titleInForeignLang}"`}
            color="primary"
          >
            <VolumeUp />
          </SquarishIconButton>
          <SquarishSwitch
            title="Toggle joke translation"
            icon={<TranslateOutlined />}
            checkedIcon={<TranslateOutlined />}
          />
        </Stack>
        <SquarishIconButton title='Share joke"'>
          <Share />
        </SquarishIconButton>
      </Stack>

      <div>
        <JokeBody inAppLang={jokeInAppLang} inForeignLang={jokeInForeignLang} />
      </div>

      <Divider>🤣</Divider>

      <Typography color="text.secondary" fontStyle="italic" pb={1}>
        {joke.explanations?.[appLang]}
      </Typography>

      <Divider />

      <List component="dl" sx={{ py: 0 }}>
        {joke.terms?.map((term, i, all) => (
          <ListItem
            key={term.term[appLang]}
            disablePadding
            divider={i < all.length - 1}
          >
            <WordCard key={term.term[appLang]} word={term} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

interface JokeBodyProps {
  inAppLang: string[];
  inForeignLang: string[];
}

function JokeBody({ inAppLang, inForeignLang }: JokeBodyProps) {
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
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      inForeignLang={paragraphInForeignLang}
      inAppLang={paragraphsInAppLang[i]}
    />
  ));
}

interface JokeParagraphProps {
  inAppLang: string[];
  inForeignLang: string[];
}

function JokeParagraph({ inAppLang, inForeignLang }: JokeParagraphProps) {
  return (
    <p>
      {inForeignLang.map((line, i) => (
        // eslint-disable-next-line react/no-array-index-key
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
}
