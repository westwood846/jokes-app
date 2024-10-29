import { Lang, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { Story } from "@models/stories";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

const prisma = new PrismaClient();

const getFullStories = () =>
  prisma.story.findMany({ include: { body: true, title: true, help: true } });

type StoryFromDB = Awaited<ReturnType<typeof getFullStories>>[0];

const toLangMap = (
  acc: Partial<Record<Lang, string>>,
  title: { lang: Lang; value: string }
) => ({ ...acc, [title.lang]: title.value });

const formatStory = (story: StoryFromDB): Story => ({
  id: story.id,
  tags: [],
  lang: story.mainLang,
  image: story.imageURL,
  title: story.title.reduce(toLangMap, {}),
  translations: story.body.reduce(toLangMap, {}),
  explanations: story.help.reduce(toLangMap, {}),
});

app.get("/stories", async (req, res, next) => {
  try {
    const storiesFromDB = await getFullStories();
    const stories = storiesFromDB.map(formatStory);
    res.json(stories);
  } catch (err) {
    next(err);
  }
});

app.post("/stories", async (req, res) => {
  const story: Story = req.body;
  const { lang, title, translations } = story;

  const titleRecords = Object.entries(title).map(([lang, value]) => ({
    lang: lang as Lang,
    value,
  }));

  const bodyRecords = Object.entries(translations).map(([lang, value]) => ({
    lang: lang as Lang,
    value,
  }));

  const helpRecords = Object.entries(translations).map(([lang, value]) => ({
    lang: lang as Lang,
    value,
  }));

  await prisma.story.create({
    data: {
      mainLang: lang,
      title: { create: titleRecords },
      body: { create: bodyRecords },
      help: { create: helpRecords },
    },
  });

  res.json(story);
});

app.put("/stories/:id", async (req, res) => {
  const story: Story = req.body;
  const { id } = req.params;
  const { lang, title, translations, explanations = {}, image } = story;

  const result = await prisma.story.update({
    where: { id },
    data: {
      mainLang: lang,
      imageURL: image,
      title: {
        updateMany: Object.entries(title).map(([lang, value]) => ({
          where: { lang: lang as Lang },
          data: { value },
        })),
      },
      body: {
        updateMany: Object.entries(translations).map(([lang, value]) => ({
          where: { lang: lang as Lang },
          data: { value },
        })),
      },
      help: {
        updateMany: Object.entries(explanations).map(([lang, value]) => ({
          where: { lang: lang as Lang },
          data: { value },
        })),
      },
    },
    include: { title: true, body: true, help: true },
  });

  res.json(result);
});

app.delete("/stories/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.story.delete({
    where: { id },
    include: { title: true, body: true, help: true },
  });
  res.json({ id });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
