import { Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ pt: 2, pb: 8 }}>
      <Typography>
        There is nothing here yet. Please{" "}
        <Link component={RouterLink} to="/stories">
          click here go to the stream :&#41;
        </Link>
      </Typography>
    </Container>
  );
};
