import { useJokes } from "@/jokes";
import { JokeEditor } from "./JokeEditor";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";

export const EditJoke = () => {
  const { id } = useParams();

  if (!id) throw new Error("Joke ID is required");

  const {
    query: { data: jokes = [] },
  } = useJokes();
  const joke = jokes.find((j) => j.id === id); // Create endpoint for fetching joke by ID

  if (!joke) return <Alert severity="error">Joke not found</Alert>;

  return <JokeEditor originalJoke={joke} />;
};
