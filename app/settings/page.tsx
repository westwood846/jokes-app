"use client";

import { IconButton, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { AppLangChooser } from "@/settings/AppLangChooser";
import { ForeignLangChooser } from "@/settings/ForeignLangChooser";
import Link from "next/link";
import { useIsClient } from "@uidotdev/usehooks";

export default function Settings() {
  // TODO: This is horrible
  const isClient = useIsClient();
  if (isClient === false) return null;

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
        <IconButton component={Link} href="/stream" title="Close settings">
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
}
