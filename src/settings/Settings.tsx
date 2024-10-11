import { IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useCurrentPage } from "../core/routing";
import { AppLangChooser } from "./AppLangChooser";
import { ForeignLangChooser } from "./ForeignLangChooser";

export const Settings = () => {
  const { setPage } = useCurrentPage();

  return (
    <Stack spacing={4}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" component="h1">
          Settings
        </Typography>
        <IconButton onClick={() => setPage("stream")} title="Close settings">
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
  );
};
