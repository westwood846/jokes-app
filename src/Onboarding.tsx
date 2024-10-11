import { Button, Stack, Typography } from "@mui/material";
import { AppLangChooser } from "./settings/AppLangChooser";
import { ForeignLangChooser } from "./settings/ForeignLangChooser";
import { useCurrentPage } from "./core/routing";

export const Onboarding = () => {
  const { setPage } = useCurrentPage();

  return (
    <Stack spacing={4} textAlign={"center"}>
      <Typography variant="h1">LOGO</Typography>

      <Typography>{"Learn languages with fun :-)"}</Typography>

      <Stack spacing={2}>
        <Typography variant="h6">I speak...</Typography>
        <AppLangChooser />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">I want to learn...</Typography>
        <ForeignLangChooser />
      </Stack>

      <Button fullWidth variant="contained" onClick={() => setPage("stream")}>
        Get Started
      </Button>
    </Stack>
  );
};
