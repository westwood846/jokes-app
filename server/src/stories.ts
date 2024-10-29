import { Lang, PrismaClient } from "@prisma/client";
import { Story } from "@models/stories";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

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

router.get("/", async (req, res, next) => {
  try {
    const storiesFromDB = await getFullStories();
    const stories = storiesFromDB.map(formatStory);
    res.json(stories);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.story.delete({
      where: { id },
      include: { title: true, body: true, help: true },
    });
    res.json({ id });
  } catch (error) {
    next(error);
  }
});

export default router;
