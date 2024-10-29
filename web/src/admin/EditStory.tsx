import { useStories } from "@/stories";
import { StoryEditor } from "./StoryEditor";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";

export const EditStory = () => {
  const { id } = useParams();

  if (!id) throw new Error("Joke ID is required");

  const {
    query: { data: stories = [] },
  } = useStories();
  const story = stories.find((j) => j.id === id); // Create endpoint for fetching joke by ID

  if (!story) return <Alert severity="error">Joke not found</Alert>;

  return <StoryEditor original={story} />;
};
