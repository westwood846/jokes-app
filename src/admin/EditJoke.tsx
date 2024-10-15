"use client";

import {
  IJoke,
  PARAGRAPH_DIVIDER,
  tags,
  useDeleteJoke,
  useSaveJoke,
} from "@/jokes";
import { Lang, langs } from "@/lang";
import { Joke } from "@/reading/Joke";
import { Clear } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface EditJokeProps {
  originalJoke: IJoke;
}

type FormValues = Omit<IJoke, "translations" | "lang"> & {
  translations: Record<string, string>;
  lang: Lang | "";
};

const paragraphSplitter = new RegExp(`\s*${PARAGRAPH_DIVIDER}\s*`, "g");

const toFormValues = (joke: IJoke): FormValues => ({
  ...joke,
  translations: Object.fromEntries(
    Object.entries(joke.translations).map(([lang, translation]) => [
      lang,
      translation.join(" ").replaceAll(paragraphSplitter, "\n\n"),
    ])
  ),
  lang: joke.lang || "",
});

const fromFormValues = (values: FormValues): IJoke => ({
  ...values,
  translations: Object.fromEntries(
    Object.entries(values.translations).map(([lang, translation]) => [
      lang as Lang,
      translation
        .trim()
        .split(/(?<=[\.:!?;\u2014])\n\n/)
        .flatMap((p) => [
          ...p.split(/(?<=[\.:!?;\u2014])\s/),
          PARAGRAPH_DIVIDER,
        ]),
    ])
  ),
  lang: values.lang || null,
});

export const EditJoke = ({ originalJoke }: EditJokeProps) => {
  const form = useForm({ defaultValues: toFormValues(originalJoke) });

  const saveJoke = useSaveJoke();
  const onSave = (values: FormValues) => {
    const joke = fromFormValues(values);
    saveJoke(joke);
  };

  const { push } = useRouter();
  const deleteJoke = useDeleteJoke();
  const onDelete = () => {
    deleteJoke(originalJoke.id);
    push("/admin");
  };

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
              exclamation mark, question mark, colon, semicolon or em-dash.
              Newlines are ignored, but double-newlines will start a new
              paragraph.
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
          <Select
            disabled // TODO
            {...form.register("lang")}
            label="Language"
            fullWidth
            endAdornment={
              form.watch("lang") && (
                <InputAdornment sx={{ mr: 3 }} position="end">
                  <IconButton onClick={() => form.setValue("lang", "")}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              )
            }
          >
            {(Object.keys(langs) as Lang[]).map((lang) => (
              <MenuItem key={lang} value={lang}>
                {langs[lang]}
              </MenuItem>
            ))}

            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          </Select>
          <TextField label="Image URL" {...form.register("image")} fullWidth />
          <Autocomplete
            disabled // TODO
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

      <Stack flex={1} spacing={2}>
        <Stack direction="row" spacing={2} justifyContent={"end"}>
          <Button variant="outlined" color="warning" onClick={onDelete}>
            Delete
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => onSave(form.getValues())}
          >
            Save
          </Button>
        </Stack>
        <Joke joke={fromFormValues(form.watch())} />
        <Box
          sx={{
            border: ({ palette }) => `1px solid ${palette.divider}`,
            borderRadius: 1,
            p: 2,
            fontSize: "0.8rem",
          }}
        >
          <pre>
            <code>{JSON.stringify(fromFormValues(form.watch()), null, 2)}</code>
          </pre>
        </Box>
      </Stack>
    </Stack>
  );
};
