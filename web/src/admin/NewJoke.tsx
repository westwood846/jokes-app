import { IJoke } from "@models/stories";
import { useMemo } from "react";
import { JokeEditor } from "./JokeEditor";

const getNewJoke = () =>
  ({
    id: crypto.randomUUID(),
    title: { en: "English Title", de: "German Title", ru: "Russian Title" },
    translations: {
      en: "English text",
      de: "German text",
      ru: "Russian text",
    },
    explanations: {
      en: "English explanation",
      de: "German explanation",
      ru: "Russian explanation",
    },
    terms: [],
    tags: [],
    lang: null,
    image: "/penguins.png",
  } as IJoke);

export const NewJoke = () => {
  const newJoke = useMemo(getNewJoke, []);
  return <JokeEditor originalJoke={newJoke} />;
};
