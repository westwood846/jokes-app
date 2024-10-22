"use client";

import { useAppwrite } from "@/appwrite";
import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login, register, logout } = useAppwrite();

  if (user) {
    return (
      <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
        <Stack spacing={4}>
          <Typography variant="h4" component="h1">
            Login or register
          </Typography>

          <Alert severity="success">Logged in as {user.email}</Alert>

          <Button onClick={logout} variant="contained">
            Logout
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={4}>
        <Typography variant="h4" component="h1">
          Login or register
        </Typography>

        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => login(email, password)} variant="contained">
          Login
        </Button>
        <Button onClick={() => register(email, password)} variant="outlined">
          Register
        </Button>
      </Stack>
    </Container>
  );
}

export default LoginPage;
