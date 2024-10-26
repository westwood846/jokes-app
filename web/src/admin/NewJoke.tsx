import { useMemo } from "react";
import { JokeEditor, JokeWithOptionalId } from "./JokeEditor";

const getNewJoke = () =>
  ({
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
  } as JokeWithOptionalId);

export const NewJoke = () => {
  const newJoke = useMemo(getNewJoke, []);
  return <JokeEditor originalJoke={newJoke} />;
};
