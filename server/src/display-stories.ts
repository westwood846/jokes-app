import { Lang, PrismaClient } from "@prisma/client";
import { Story } from "@models/stories";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

const toLangMap = (
  acc: Partial<Record<Lang, string>>,
  title: { lang: Lang; value: string }
) => ({ ...acc, [title.lang]: title.value });

const getDisplayStories = (appLang: Lang, foreignLang: Lang) =>
  prisma.story.findMany({
    include: {
      body: { where: { lang: { in: [appLang, foreignLang] } } },
      title: { where: { lang: { in: [appLang, foreignLang] } } },
      help: { where: { lang: appLang } },
    },
  });

type StoryFromDB = Awaited<ReturnType<typeof getDisplayStories>>[0];

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
    const appLang = (req.headers["x-app-lang"] as Lang) || "en";
    const foreignLang = (req.headers["x-foreign-lang"] as Lang) || "de";
    const storiesFromDB = await getDisplayStories(appLang, foreignLang);
    const stories = storiesFromDB.map(formatStory);
    res.json(stories);
  } catch (err) {
    next(err);
  }
});

export default router;
