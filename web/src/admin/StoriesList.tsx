import { Story } from "@models/stories";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const byId = (a: Story, b: Story) => a.id.localeCompare(b.id);

interface StoriesListProps {
  stories: Story[];
}

export function StoriesList({ stories }: StoriesListProps) {
  return (
    <List>
      {stories.sort(byId).map((story) => (
        <ListItem
          key={story.id}
          component={Link}
          to={`/admin/stories/${story.id}`}
        >
          <ListItemAvatar>
            <Avatar sx={{ position: "relative" }}>
              {story.image && (
                <img src={story.image} alt={story.title.en || "No image"} />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={story.title.en || "Unknown english title"}
            secondary={`${(
              story.translations.en || "Unknown english text"
            ).slice(0, 50)}...`}
          />
        </ListItem>
      ))}
    </List>
  );
}
