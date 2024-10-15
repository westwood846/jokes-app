"use client";

import { useJokes } from "@/jokes";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const JokesList = () => {
  const jokes = useJokes();
  return (
    <List>
      {jokes.map((joke) => (
        <ListItem key={joke.id} component={Link} href={`/admin/${joke.id}`}>
          <ListItemAvatar>
            <Avatar sx={{ position: "relative" }}>
              {joke.image && (
                <Image
                  src={joke.image}
                  alt={joke.title.en || "No image"}
                  fill
                />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={joke.title.en || "Unknown english title"}
            secondary={`${(
              joke.translations.en?.join(" ") || "Unknown english text"
            ).slice(0, 50)}...`}
          />
        </ListItem>
      ))}
    </List>
  );
};
