import {
  Alert,
  Box,
  Button,
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

import ReactMarkdown from "react-markdown";
import { WordCard } from "./WordCard";
import { SquarishSwitch } from "../core/SquarishSwitch";
import { isShort } from "../admin/admin-stories";
import { SquarishIconButton } from "../core/SquarishIconButton";
import { Story as IStory } from "@models/stories";
import { Link } from "react-router-dom";
import { Lang } from "@models/lang";

interface StoryProps {
  story: IStory;
  appLang: Lang;
  foreignLang: Lang;
}

export function Story({ story, appLang, foreignLang }: StoryProps) {
  if (isShort(story))
    return (
      <ShortStory story={story} appLang={appLang} foreignLang={foreignLang} />
    );

  return (
    <LongStory story={story} appLang={appLang} foreignLang={foreignLang} />
  );
}

const gradients = [
  "linear-gradient(97.94deg, #DEF6A8 0%, #FFC7EE 100%)",
  "linear-gradient(97.94deg, #FFC7EE 0%, #68D4F9 100%)",
  "linear-gradient(97.94deg, #8FEFFC 0%, #DEF6A8 100%)",
];

const storyIdToGradient = (id: string) => {
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[sum % gradients.length];
};

export function ShortStory({ story, appLang, foreignLang }: StoryProps) {
  const storyInAppLang = story.translations[appLang];
  const storyInForeignLang = story.translations[foreignLang];

  if (!storyInAppLang || !storyInForeignLang) {
    return (
      <Alert
        severity="error"
        action={
          <Button
            component={Link}
            to={`/admin/stories/${story.id}`}
            variant="outlined"
            color="inherit"
            sx={{ my: "auto" }}
          >
            Edit
          </Button>
        }
      >
        This story is missing a translation for {appLang} or {foreignLang}
        <br />
        Story id: <code>{story.id}</code>
      </Alert>
    );
  }

  const gradient = storyIdToGradient(story.id);

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
          <Typography variant="h4">{storyInAppLang}</Typography>
          <Typography variant="body1">{storyInForeignLang}</Typography>
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
              <SquarishIconButton title="Listen to story" color="primary">
                <VolumeUp />
              </SquarishIconButton>
              <SquarishSwitch
                title="Toggle story translation"
                icon={<TranslateOutlined />}
                checkedIcon={<TranslateOutlined />}
              />
            </Stack>
            <SquarishIconButton title="Share story">
              <Share />
            </SquarishIconButton>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}

export function LongStory({ story, appLang, foreignLang }: StoryProps) {
  const storyInAppLang = story.translations[appLang];
  const storyInForeignLang = story.translations[foreignLang];
  const titleInAppLang = story.title[appLang];
  const titleInForeignLang = story.title[foreignLang];

  const difficulty =
    story.terms && story.terms.length > 0
      ? story.terms.reduce(
          (max, term) =>
            (term.difficulty || "A0") < max ? max : term.difficulty,
          "A1"
        )
      : null;

  if (
    !storyInAppLang ||
    !storyInForeignLang ||
    !titleInAppLang ||
    !titleInForeignLang
  ) {
    return (
      <Alert severity="error">
        This story is missing translations for {appLang} or {foreignLang}.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      {story.image && (
        <Box
          component="img"
          src={story.image}
          alt={titleInAppLang}
          sx={{
            width: "100%",
            height: 256,
            borderRadius: 10,
            boxShadow: "3px 3px 50px 8px rgba(255,198,0,0.15)",
            position: "relative",
            objectFit: "cover",
          }}
        ></Box>
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
            title="Toggle story translation"
            icon={<TranslateOutlined />}
            checkedIcon={<TranslateOutlined />}
          />
        </Stack>
        <SquarishIconButton title='Share story"'>
          <Share />
        </SquarishIconButton>
      </Stack>

      <div>
        <StoryBody
          inAppLang={storyInAppLang}
          inForeignLang={storyInForeignLang}
        />
      </div>

      <Divider>🤣</Divider>

      <Typography color="text.secondary" fontStyle="italic" pb={1}>
        {story.explanations?.[appLang]}
      </Typography>

      <Divider />

      <List component="dl" sx={{ py: 0 }}>
        {story.terms?.map((term, i, all) => (
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

interface StoryBodyProps {
  inAppLang: string;
  inForeignLang: string;
}

function StoryBody({ inAppLang, inForeignLang }: StoryBodyProps) {
  return (
    <StoryParagraph inAppLang={[inAppLang]} inForeignLang={[inForeignLang]} />
  );
}

interface StoryParagraphProps {
  inAppLang: string[];
  inForeignLang: string[];
}

function StoryParagraph({ inAppLang, inForeignLang }: StoryParagraphProps) {
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
