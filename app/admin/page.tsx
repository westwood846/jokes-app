import { JokesList } from "@/admin/JokesList";
import { Container, Stack } from "@mui/material";

export default function Page() {
  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Stack spacing={4}>
        <JokesList />
      </Stack>
    </Container>
  );
}
