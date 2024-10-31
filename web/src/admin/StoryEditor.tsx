import {
  useCreateStory,
  useDeleteStory,
  useUpdateStory,
} from "@/admin/admin-stories";
import { Story } from "@/reading/Story";
import { Lang } from "@models/lang";
import { Story as IStory } from "@models/stories";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type StoryWithOptionalId = Omit<IStory, "id"> & { id?: string };

interface EditStoryProps {
  original: StoryWithOptionalId;
}

type FormValues = Omit<StoryWithOptionalId, "translations" | "lang"> & {
  translations: Record<string, string>;
  lang: Lang | "";
};

const toFormValues = (story: StoryWithOptionalId): FormValues => ({
  ...story,
  translations: story.translations,
  lang: story.lang || "",
});

const fromFormValues = (values: FormValues): IStory => ({
  id: "new-story",
  ...values,
  translations: values.translations,
  lang: values.lang || null,
});

export function StoryEditor({ original }: EditStoryProps) {
  const navigate = useNavigate();

  const { mutation: deleteMutation } = useDeleteStory();

  useEffect(() => {
    if (!deleteMutation.isSuccess) return;
    navigate("/admin");
  }, [deleteMutation.isSuccess, navigate]);

  const { mutation: createMutation } = useCreateStory();

  useEffect(() => {
    if (!createMutation.isSuccess) return;
    navigate("/admin");
  }, [createMutation.isSuccess, navigate]);

  const { mutation: updateMutation } = useUpdateStory();

  useEffect(() => {
    if (!updateMutation.isSuccess) return;
    navigate("/admin");
  }, [updateMutation.isSuccess, navigate]);

  const form = useForm({ defaultValues: toFormValues(original) });

  const handleSubmit = () => {
    const story = fromFormValues(form.getValues());
    if (original.id) updateMutation.mutate(story);
    else createMutation.mutate(story);
  };

  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 8 }}>
      <Stack direction="row" spacing={8}>
        <Stack spacing={2} flex={1}>
          <Typography variant="h5">Title</Typography>
          <Stack spacing={2} pb={4}>
            {(Object.keys(original.title) as Lang[]).map((lang) => (
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
                Storys are written in markdown. In this editor, each sentence
                will be considered a fragment. Sentences are terminated by a
                period, exclamation mark, question mark, colon, semicolon or
                em-dash. Newlines are ignored, but double-newlines will start a
                new paragraph.
              </Typography>
            </Stack>

            {(Object.keys(original.translations) as Lang[]).map((lang) => (
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
            {(Object.keys(original.explanations || []) as Lang[]).map(
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
            <TextField
              label="Image URL"
              {...form.register("image")}
              fullWidth
            />
          </Stack>
        </Stack>

        <Stack flex={1} spacing={2} maxWidth="50%">
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button
              variant="outlined"
              color="warning"
              onClick={() => deleteMutation.mutate(original.id!)}
              disabled={!Boolean(original.id)}
            >
              Delete
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Save
            </Button>
          </Stack>
          <Story
            story={fromFormValues(form.watch())}
            appLang="en"
            foreignLang="de"
          />
          <Box
            sx={{
              border: ({ palette }) => `1px solid ${palette.divider}`,
              borderRadius: 1,
              p: 2,
              fontSize: "0.8rem",
              overflow: "auto",
            }}
          >
            <pre>
              <code>
                {JSON.stringify(fromFormValues(form.watch()), null, 2)}
              </code>
            </pre>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
