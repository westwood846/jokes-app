import { Container, IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { AppLangChooser, ForeignLangChooser } from "./LangChooser";
import { Link } from "react-router-dom";

export function Settings() {
  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component="h1">
            Settings
          </Typography>
          <IconButton component={Link} to="/stories" title="Close settings">
            <Close />
          </IconButton>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            I speak...
          </Typography>
          <AppLangChooser />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            I want to learn...
          </Typography>
          <ForeignLangChooser />
        </Stack>
      </Stack>
    </Container>
  );
}
