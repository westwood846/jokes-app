"use client";

import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
// import { ForeignLangChooser, AppLangChooser } from "@/settings/LangChooser";
import Link from "next/link";
import { useAppwrite } from "@/appwrite";

export default function Settings() {
  const { logout } = useAppwrite();

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

        {/* <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            I speak...
          </Typography>
          <AppLangChooser />
        </Stack> */}

        {/* <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            I want to learn...
          </Typography>
          <ForeignLangChooser />
        </Stack> */}

        {/* <form action={randomizeAppLang}>
          <Button type="submit" variant="contained">
            Randomize app lang
          </Button>
        </form> */}

        {/* <form action={signOut}>
          <Button type="submit" variant="contained">
            Logout
          </Button>
        </form> */}

        <Button onClick={logout} variant="contained">
          Logout
        </Button>
      </Stack>
    </Container>
  );
}
