"use client";

import { useLangsUnsafe } from "@/lang";
import { Button, Stack } from "@mui/material";
import { useIsClient } from "@uidotdev/usehooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  // TODO: This is horrible
  const isClient = useIsClient();
  if (isClient === false) return null;

  return <ActualPage />;
}

function ActualPage() {
  const { push } = useRouter();
  const { foreignLang, appLang } = useLangsUnsafe();

  useEffect(() => {
    if (appLang && foreignLang) push("/stream");
    else push("/onboarding");
  }, [push, appLang, foreignLang]);

  return (
    <Stack spacing={4} textAlign="center">
      I am a placeholder
      <Button fullWidth variant="contained" component={Link} href="/onboarding">
        Get Started
      </Button>
    </Stack>
  );
}
