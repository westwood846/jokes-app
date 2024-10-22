"use client";

import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { AppLangChooser } from "@/settings/AppLangChooser";
import { ForeignLangChooser } from "@/settings/ForeignLangChooser";
import Link from "next/link";
import { useIsClient } from "@uidotdev/usehooks";
import { useAppwrite } from "@/appwrite";
import { useRouter } from "next/navigation";

export default function Settings() {
  const { push } = useRouter();
  const { logout } = useAppwrite();

  // TODO: This is horrible
  const isClient = useIsClient();
  if (isClient === false) return null;

  const handleLogout = async () => {
    await logout();
    push("/login");
  };

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

        <Button onClick={handleLogout} variant="contained">
          Logout
        </Button>
      </Stack>
    </Container>
  );
}
