import { Stack, Typography, List, Divider, Container } from "@mui/material";
import { Fragment } from "react";
import { MoreHoriz } from "@mui/icons-material";
import { Story } from "./Story";
import { useStories } from "./display-stories";

export function Stream() {
  const {
    query: { data: stories = [] },
  } = useStories();

  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component="h1">
            Stream
          </Typography>
        </Stack>

        <List>
          {stories.map((story) => (
            <Fragment key={story.id}>
              <Story story={story} />
              <Divider sx={{ my: 6 }}>
                <MoreHoriz fontSize="small" sx={{ mb: -0.6 }} />
              </Divider>
            </Fragment>
          ))}
        </List>
      </Stack>
    </Container>
  );
}
