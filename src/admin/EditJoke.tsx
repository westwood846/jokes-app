"use client";

import { IJoke } from "@/jokes";
import { Lang } from "@/lang";
import { Joke } from "@/reading/Joke";
import { Box, Select, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface EditJokeProps {
  originalJoke: IJoke;
}

type FormValues = Omit<IJoke, "translations"> & {
  translations: Record<string, string>;
};

const toFormValues = (joke: IJoke): FormValues => ({
  ...joke,
  translations: Object.fromEntries(
    Object.entries(joke.translations).map(([lang, translation]) => [
      lang,
      translation.join(" "),
    ])
  ),
});

const fromFormValues = (values: FormValues): IJoke => ({
  ...values,
  translations: Object.fromEntries(
    Object.entries(values.translations).map(([lang, translation]) => [
      lang as Lang,
      translation.split(/(?<=[\.:!?])\s/),
    ])
  ),
});

export const EditJoke = ({ originalJoke }: EditJokeProps) => {
  const form = useForm({ defaultValues: toFormValues(originalJoke) });
  return (
    <Stack direction="row" spacing={8}>
      <Stack spacing={4} flex={1}>
        <Typography variant="h5">Title</Typography>
        <Stack spacing={2}>
          {(Object.keys(originalJoke.title) as Lang[]).map((lang) => (
            <TextField
              key={lang}
              label={lang}
              {...form.register(`title.${lang}`)}
              fullWidth
            />
          ))}
        </Stack>
        <Typography variant="h5">Translations</Typography>
        <Stack spacing={2}>
          {(Object.keys(originalJoke.translations) as Lang[]).map((lang) => (
            <TextField
              key={lang}
              label={lang}
              {...form.register(`translations.${lang}`)}
              fullWidth
              multiline
              minRows={3}
            />
          ))}
        </Stack>
        <Typography variant="h5">Explanation</Typography>
        <Stack spacing={2}>
          {(Object.keys(originalJoke.explanations || []) as Lang[]).map(
            (lang) => (
              <TextField
                key={lang}
                label={lang}
                {...form.register(`explanations.${lang}`)}
                fullWidth
                multiline
                minRows={3}
              />
            )
          )}
        </Stack>
        <Typography variant="h5">Meta</Typography>
        <TextField label="Image URL" {...form.register("image")} fullWidth />
        {/* tags */}
        <Select
          label="Tags"
          // {...form.register("tags")}
          multiple
          native
          fullWidth
        >
          <option value="funny">Funny</option>
          <option value="joke">Joke</option>
          <option value="pun">Pun</option>
          <option value="dad-joke">Dad joke</option>
        </Select>
      </Stack>
      <Box flex={1}>
        <Joke joke={fromFormValues(form.watch())} />
      </Box>
    </Stack>
  );
};
