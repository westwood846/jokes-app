import { useMemo } from "react";
import { StoryEditor, StoryWithOptionalId } from "./StoryEditor";

const getNewStory = () =>
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
  } as StoryWithOptionalId);

export const NewStory = () => {
  const newStory = useMemo(getNewStory, []);
  return <StoryEditor original={newStory} />;
};
