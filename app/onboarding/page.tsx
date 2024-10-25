"use client";

import { Button, Container, Stack, Typography } from "@mui/material";
import { AppLangChooser } from "@/settings/LangChooser";
// import { ForeignLangChooser } from "@/settings/ForeignLangChooser";
import Link from "next/link";
import { useIsClient } from "@uidotdev/usehooks";

export default function Page() {
  // TODO: This is horrible
  const isClient = useIsClient();
  if (isClient === false) return null;

  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={4} textAlign="center">
        <Typography variant="h1">LOGO</Typography>

        <Typography>Learn languages with fun :-)</Typography>

        <Stack spacing={2}>
          <Typography variant="h6">I speak...</Typography>
          <AppLangChooser />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6">I want to learn...</Typography>
          {/* <ForeignLangChooser /> */}
        </Stack>

        <Button fullWidth variant="contained" component={Link} href="/stream">
          Get Started
        </Button>
      </Stack>
    </Container>
  );
}
