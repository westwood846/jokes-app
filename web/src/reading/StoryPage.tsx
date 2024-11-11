import { Container } from "@mui/material";
import { useStories } from "./display-stories";
import { FullscreenLayout } from "@/core/layout";
import { Story } from "./Story";
import { useLangs } from "@/lang";
import { useParams } from "react-router-dom";

export function StoryPage() {
  const { id } = useParams();

  if (!id) throw new Error("Joke ID is required");

  const {
    query: { data: stories = [] },
  } = useStories();
  const { appLang, foreignLang } = useLangs();

  const story = stories.find((j) => j.id === id);

  if (!story) throw new Error("Joke not found");

  return (
    <FullscreenLayout>
      <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
        <Story story={story} appLang={appLang} foreignLang={foreignLang} />
      </Container>
    </FullscreenLayout>
  );
}
