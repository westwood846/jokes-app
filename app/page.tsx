"use client";

import { Button, Stack } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Stack spacing={4} textAlign={"center"}>
      I am a placeholder
      <Button fullWidth variant="contained" component={Link} href="/onboarding">
        Get Started
      </Button>
    </Stack>
  );
}
