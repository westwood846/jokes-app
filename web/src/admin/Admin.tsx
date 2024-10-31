import {
  Button,
  Container,
  Stack,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
} from "@mui/material";
import { useStories, useUpdateStory } from "@/admin/admin-stories";
import { Link } from "react-router-dom";

import { langs } from "@/lang";
import { Lang } from "@models/lang";
import { Story } from "@models/stories";

import { mapValues } from "lodash";
import { ReactNode, useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";
import { Story as StoryComponent } from "@/reading/Story";

const byId = (a: Story, b: Story) => a.id.localeCompare(b.id);

const defaultDisplayLangs = mapValues(langs, () => true) as Record<
  Lang,
  boolean
>;

export function Admin() {
  const {
    query: { data: stories = [], refetch },
  } = useStories();

  const { mutation: updateStoryMutation } = useUpdateStory();
  useEffect(() => {
    if (!updateStoryMutation.isSuccess) return;
    refetch();
  }, [updateStoryMutation.isSuccess, refetch]);

  const [displayLangs, setDisplayLangs] = useState(defaultDisplayLangs);

  return (
    <Container maxWidth={false} sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <FormGroup row>
            {Object.entries(langs).map(([langId, langName]) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={displayLangs[langId as Lang]}
                    onChange={(e) =>
                      setDisplayLangs({
                        ...displayLangs,
                        [langId]: e.target.checked,
                      })
                    }
                  />
                }
                label={langName}
                key={langId}
              />
            ))}
          </FormGroup>

          <Button
            component={Link}
            to="/admin/stories/new"
            variant="contained"
            color="primary"
            sx={{ flexGrow: 0 }}
          >
            New Story
          </Button>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <Edit sx={{ fontSize: 14, visibility: "hidden", mr: 1 }} />
                Image
              </TableCell>
              {Object.entries(displayLangs).map(
                ([lang, show]) =>
                  show && (
                    <TableCell key={lang}>
                      <Edit
                        sx={{ fontSize: 14, visibility: "hidden", mr: 1 }}
                      />
                      Title ({langs[lang as Lang]})
                    </TableCell>
                  )
              )}
              {Object.entries(displayLangs).map(
                ([lang, show]) =>
                  show && (
                    <TableCell key={lang}>
                      <Edit
                        sx={{ fontSize: 14, visibility: "hidden", mr: 1 }}
                      />
                      Body ({langs[lang as Lang]})
                    </TableCell>
                  )
              )}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stories.sort(byId).map((story) => (
              <TableRow key={story.id}>
                <TableCell>
                  <Link to={`/admin/stories/${story.id}`}>
                    <code>{story.id}</code>
                  </Link>
                </TableCell>
                <TableCell>
                  <InlineEditor
                    fieldName="Image URL"
                    value={story.image || ""}
                    onChange={(newValue) =>
                      updateStoryMutation.mutate({ ...story, image: newValue })
                    }
                    renderPreview={(newValue) =>
                      newValue && (
                        <img
                          src={newValue}
                          alt={story.title.en}
                          style={{ maxWidth: 300 }}
                        />
                      )
                    }
                  >
                    {story.image && (
                      <code>{story.image.split("/").slice(-2).join("/")}</code>
                    )}
                  </InlineEditor>
                </TableCell>
                {Object.entries(displayLangs).map(
                  ([langId, show]) =>
                    show && (
                      <TableCell key={langId}>
                        <InlineEditor
                          fieldName={`Title (${langs[langId as Lang]})`}
                          value={story.title[langId as Lang] || ""}
                          onChange={(newValue) =>
                            updateStoryMutation.mutate({
                              ...story,
                              title: {
                                ...story.title,
                                [langId]: newValue,
                              },
                            })
                          }
                          renderPreview={(newValue) => (
                            <StoryComponent
                              story={{
                                ...story,
                                title: {
                                  ...story.title,
                                  [langId]: newValue,
                                },
                              }}
                              appLang={"en"}
                              foreignLang={langId as Lang}
                            />
                          )}
                        >
                          {story.title[langId as Lang]}
                        </InlineEditor>
                      </TableCell>
                    )
                )}
                {Object.entries(displayLangs).map(
                  ([langId, show]) =>
                    show && (
                      <TableCell key={langId} sx={{ maxWidth: 300 }}>
                        <InlineEditor
                          fieldName={`Text (${langs[langId as Lang]})`}
                          value={story.translations[langId as Lang] || ""}
                          onChange={(newValue) =>
                            updateStoryMutation.mutate({
                              ...story,
                              translations: {
                                ...story.translations,
                                [langId]: newValue,
                              },
                            })
                          }
                          multiline
                          renderPreview={(newValue) => (
                            <StoryComponent
                              story={{
                                ...story,
                                translations: {
                                  ...story.translations,
                                  [langId]: newValue,
                                },
                              }}
                              appLang={"en"}
                              foreignLang={langId as Lang}
                            />
                          )}
                        >
                          {story.translations[langId as Lang]}
                        </InlineEditor>
                      </TableCell>
                    )
                )}
                <TableCell>
                  <Button
                    component={Link}
                    to={`/admin/stories/${story.id}`}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Open in Editor
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </Container>
  );
}

interface InlineEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  children: ReactNode;
  multiline?: boolean;
  renderPreview: (newValue: string) => ReactNode;
  fieldName: string;
}

const InlineEditor = ({
  value: originalValue,
  onChange,
  children,
  multiline,
  renderPreview,
  fieldName,
}: InlineEditorProps) => {
  const [open, isOpen] = useState(false);
  const [value, setValue] = useState(originalValue);
  return (
    <>
      <Stack direction="row" spacing={1}>
        <ButtonBase onClick={() => isOpen(true)}>
          <Edit sx={{ fontSize: 14 }} />
        </ButtonBase>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Stack>
      <Dialog open={open} onClose={() => isOpen(false)} maxWidth={false}>
        <DialogTitle>{fieldName}</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={4}>
            <Box>
              <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                multiline={multiline}
                sx={{ minWidth: 500, mt: 2 }}
                label={fieldName}
              />
            </Box>
            <Box minWidth={300} maxWidth={500}>
              {renderPreview(value)}
            </Box>
          </Stack>
          <DialogActions>
            <Button onClick={() => isOpen(false)}>Close</Button>
            <Button
              onClick={() => {
                onChange(value);
                isOpen(false);
              }}
              variant="contained"
              disabled={value === originalValue}
            >
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
