"use client";

import { IJoke, tags } from "@/jokes";
import { Lang } from "@/lang";
import { Joke } from "@/reading/Joke";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
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
      // translation.split(/(?<=[\.:!?])\s/),
      translation
        .split(/(?<=[\.:!?])\n\n/)
        .flatMap((p) => [...p.split(/(?<=[\.:!?])\s/), "PARAGRAPH_END"]),
    ])
  ),
});

export const EditJoke = ({ originalJoke }: EditJokeProps) => {
  const form = useForm({ defaultValues: toFormValues(originalJoke) });
  return (
    <Stack direction="row" spacing={8}>
      <Stack spacing={2} flex={1}>
        <Typography variant="h5">Title</Typography>
        <Stack spacing={2} pb={4}>
          {(Object.keys(originalJoke.title) as Lang[]).map((lang) => (
            <TextField
              key={lang}
              label={lang}
              {...form.register(`title.${lang}`)}
              fullWidth
            />
          ))}
        </Stack>

        <Stack spacing={2} pb={4}>
          <Stack>
            <Typography variant="h5">Translations</Typography>
            <Typography variant="body2" color="text.secondary">
              Jokes are written in markdown. In this editor, each sentence will
              be considered a fragment. Sentences are terminated by a period,
              exclamation mark, question mark, ellipsis, colon, semicolon or
              em-dash. Newlines are ignored, but double-newlines will start a
              new paragraph.
            </Typography>
          </Stack>

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
        <Stack spacing={2} pb={4}>
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
        <Stack spacing={2} pb={4}>
          <TextField label="Image URL" {...form.register("image")} fullWidth />
          <Autocomplete
            multiple
            options={tags}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Tags"
                fullWidth
              />
            )}
          />
        </Stack>
      </Stack>
      <Box flex={1}>
        <Joke joke={fromFormValues(form.watch())} />
      </Box>
    </Stack>
  );
};
