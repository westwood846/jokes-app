import { Lang, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { IJoke as Joke } from "@models/stories";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

const prisma = new PrismaClient();

const getFullStories = () =>
  prisma.story.findMany({ include: { body: true, title: true } });

type StoryFromDB = Awaited<ReturnType<typeof getFullStories>>[0];

const toLangMap = (
  acc: Partial<Record<Lang, string>>,
  title: { lang: Lang; value: string }
) => ({ ...acc, [title.lang]: title.value });

const formatStory = (story: StoryFromDB): Joke => ({
  id: story.id,
  tags: [],
  lang: story.mainLang,
  title: story.title.reduce(toLangMap, {}),
  translations: story.body.reduce(toLangMap, {}),
});

app.get("/", async (req, res) => {
  const storiesFromDB = await getFullStories();
  const stories = storiesFromDB.map(formatStory);
  res.json(stories);
});

app.post("/jokes", async (req, res) => {
  const joke: Joke = req.body;
  const { lang, title, translations } = joke;

  const titleRecords = Object.entries(title).map(([lang, value]) => ({
    lang: lang as Lang,
    value,
  }));

  const bodyRecords = Object.entries(translations).map(([lang, value]) => ({
    lang: lang as Lang,
    value,
  }));

  await prisma.story.create({
    data: {
      mainLang: lang,
      title: { create: titleRecords },
      body: { create: bodyRecords },
    },
  });

  res.json(joke);
});

app.delete("/jokes/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.story.delete({ where: { id } });
  res.json({ id });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
