import { List, Divider, Stack } from "@mui/material";
import { Fragment } from "react";
import { MoreHoriz } from "@mui/icons-material";
import { Story } from "./Story";
import { useLangs } from "@/lang";
import { Story as IStory } from "@models/stories";
import { Link } from "react-router-dom";

interface StoriesListProps {
  stories: IStory[];
}

export function StoriesList({ stories }: StoriesListProps) {
  const { appLang, foreignLang } = useLangs();

  return (
    <List>
      {stories.map((story) => (
        <Fragment key={story.id}>
          <Story story={story} appLang={appLang} foreignLang={foreignLang} />
          <Stack direction="row" justifyContent="end">
            <Link to={`/stories/${story.id}`}>Read</Link>
          </Stack>
          <Divider sx={{ my: 6 }}>
            <MoreHoriz fontSize="small" sx={{ mb: -0.6 }} />
          </Divider>
        </Fragment>
      ))}
    </List>
  );
}
