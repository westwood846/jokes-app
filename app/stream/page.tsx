"use client";

import { Stream } from "@/reading/Stream";
import { Container } from "@mui/material";
import { useIsClient } from "@uidotdev/usehooks";

export default function Page() {
  // TODO: This is horrible
  const isClient = useIsClient();
  if (isClient === false) return null;

  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Stream />
    </Container>
  );
}
