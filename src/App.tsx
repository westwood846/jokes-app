import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles.css";
import { Router } from "./routing";
import { Container } from "@mui/material";

export default function App() {
  return (
    <Container maxWidth="xs" sx={{ pt: 2, pb: 8 }}>
      <Router />
    </Container>
  );
}
