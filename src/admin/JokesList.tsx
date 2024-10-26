import { IJoke } from "@models/stories";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

interface JokesListProps {
  jokes: IJoke[];
}

export function JokesList({ jokes }: JokesListProps) {
  return (
    <List>
      {jokes.map((joke) => (
        <ListItem key={joke.id} component={Link} to={`/admin/jokes/${joke.id}`}>
          <ListItemAvatar>
            <Avatar sx={{ position: "relative" }}>
              {joke.image && (
                <img src={joke.image} alt={joke.title.en || "No image"} />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={joke.title.en || "Unknown english title"}
            secondary={`${(
              joke.translations.en || "Unknown english text"
            ).slice(0, 50)}...`}
          />
        </ListItem>
      ))}
    </List>
  );
}
