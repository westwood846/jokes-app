import { Story } from "@models/stories";
import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "@/core/api";

export const isShort = (story: Story) => {
  if (!story.translations.en) return false;
  return story.translations.en.length <= 100;
};

const fetchStories = () => fetchFromAPI<Story[]>("/stories");

export const useStories = () => {
  const query = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });
  return { query };
};
